import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import type { Components } from 'react-markdown'

const components: Components = {
  h1: ({ children, id, ...props }) => (
    <h1 id={id} className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0 border-b border-white/10 pb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="text-2xl font-bold text-white mb-4 mt-10" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="text-xl font-semibold text-white mb-3 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }) => (
    <h4 id={id} className="text-lg font-semibold text-text-primary mb-2 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-text-secondary text-base leading-relaxed mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-text-secondary italic">{children}</em>
  ),
  blockquote: ({ children }) => (
    <blockquote className="glass-panel rounded-lg border-l-4 border-primary pl-6 pr-4 py-4 my-6">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-6 space-y-1.5 mb-4 text-text-secondary">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-6 space-y-1.5 mb-4 text-text-secondary">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-text-secondary leading-relaxed">{children}</li>
  ),
  hr: () => <hr className="border-white/10 my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <div className="glass-panel rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/5 border-b border-white/10">{children}</thead>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-white/5">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-text-secondary">{children}</td>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <div className="glass-panel rounded-lg p-4 my-6 overflow-x-auto">
          <pre className="font-mono text-sm text-primary/90 whitespace-pre">
            <code>{children}</code>
          </pre>
        </div>
      )
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-white/5 text-primary text-sm font-mono">
        {children}
      </code>
    )
  },
  pre: ({ children }) => <>{children}</>,
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose-dark">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
