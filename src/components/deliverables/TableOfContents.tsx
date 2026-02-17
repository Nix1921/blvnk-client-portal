import { useState, useEffect } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

function extractHeadings(markdown: string): TOCItem[] {
  const lines = markdown.split('\n')
  const headings: TOCItem[] = []

  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/\*\*/g, '').replace(/`/g, '')
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      headings.push({ id, text, level })
    }
  }

  return headings
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const headings = extractHeadings(markdown)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-1">
      <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
        On this page
      </h4>
      {headings.map(heading => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`block text-sm py-1 transition-colors ${
            heading.level === 3 ? 'pl-4' : heading.level === 4 ? 'pl-8' : ''
          } ${
            activeId === heading.id
              ? 'text-primary border-l-2 border-primary -ml-px pl-3'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
