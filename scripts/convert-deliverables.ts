import fs from 'fs/promises'
import path from 'path'

interface DeliverableMetadata {
  id: string
  type: 'department' | 'quality-gate' | 'final-summary'
  title: string
  departmentNumber?: number
  gateNumber?: number
  dateGenerated: string
  status: 'completed' | 'in-review' | 'pending'
  order: number
  estimatedReadTime: number
}

interface Deliverable {
  metadata: DeliverableMetadata
  rawMarkdown: string
}

interface ClientMetadata {
  clientId: string
  clientName: string
  packageType: string
  packagePrice: string
  dateCompleted: string
  password?: string
  deliverables: DeliverableMetadata[]
}

const packagePrices: Record<string, string> = {
  'brand-sprint': '$1,500',
  'market-recon': '$5,000',
  'launch-kit': '$12,000',
}

function parseArgs(): { client: string; package: string; inputDir: string; password?: string } {
  const args = process.argv.slice(2)
  const parsed: Record<string, string> = {}

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2)
      parsed[key] = args[i + 1] ?? ''
      i++
    }
  }

  if (!parsed.client || !parsed.package || !parsed.input) {
    console.error('Usage: npm run convert -- --client <slug> --package <type> --input <dir> [--password <pw>]')
    console.error('Example: npm run convert -- --client blvnk-canvas --package launch-kit --input ../blvnk-canvas/_legacy_v1/outputs')
    process.exit(1)
  }

  return {
    client: parsed.client,
    package: parsed.package,
    inputDir: parsed.input,
    password: parsed.password,
  }
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match ? match[1].replace(/\*\*/g, '').trim() : 'Untitled'
}

function inferType(filename: string): 'department' | 'quality-gate' | 'final-summary' {
  if (filename.includes('quality-gate')) return 'quality-gate'
  if (filename.includes('final') || filename.includes('launch-kit-final')) return 'final-summary'
  return 'department'
}

function inferOrder(filename: string, type: string): number {
  const numMatch = filename.match(/^(\d+)-/)
  if (numMatch) return parseInt(numMatch[1])

  if (type === 'quality-gate') {
    const gateMatch = filename.match(/gate-(\d+)/)
    return gateMatch ? 100 + parseInt(gateMatch[1]) : 100
  }

  if (type === 'final-summary') return 200

  return 50
}

function inferDepartmentNumber(filename: string): number | undefined {
  const match = filename.match(/^(\d+)-/)
  return match ? parseInt(match[1]) : undefined
}

function inferGateNumber(filename: string): number | undefined {
  const match = filename.match(/gate-(\d+)/)
  return match ? parseInt(match[1]) : undefined
}

function slugify(name: string): string {
  return name
    .replace(/\.md$/, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

async function main() {
  const config = parseArgs()
  const inputDir = path.resolve(config.inputDir)
  const outputDir = path.resolve('public/client-data', config.client)

  console.log(`Converting deliverables for "${config.client}"`)
  console.log(`  Input:  ${inputDir}`)
  console.log(`  Output: ${outputDir}`)
  console.log()

  // Read all markdown files
  const files = await fs.readdir(inputDir)
  const mdFiles = files.filter(f => f.endsWith('.md')).sort()

  if (mdFiles.length === 0) {
    console.error('No .md files found in input directory')
    process.exit(1)
  }

  // Create output directories
  await fs.mkdir(path.join(outputDir, 'deliverables'), { recursive: true })

  const deliverablesMeta: DeliverableMetadata[] = []

  for (const file of mdFiles) {
    const content = await fs.readFile(path.join(inputDir, file), 'utf-8')
    const id = slugify(file)
    const type = inferType(file)
    const title = extractTitle(content)
    const order = inferOrder(file, type)
    const wordCount = content.split(/\s+/).length
    const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 250))

    const metadata: DeliverableMetadata = {
      id,
      type,
      title,
      departmentNumber: type === 'department' ? inferDepartmentNumber(file) : undefined,
      gateNumber: type === 'quality-gate' ? inferGateNumber(file) : undefined,
      dateGenerated: new Date().toISOString().split('T')[0],
      status: 'completed',
      order,
      estimatedReadTime,
    }

    const deliverable: Deliverable = {
      metadata,
      rawMarkdown: content,
    }

    // Write deliverable JSON
    const outputPath = path.join(outputDir, 'deliverables', `${id}.json`)
    await fs.writeFile(outputPath, JSON.stringify(deliverable, null, 2))

    deliverablesMeta.push(metadata)
    console.log(`  [${type}] ${title} (${estimatedReadTime}m read) -> ${id}.json`)
  }

  // Sort by order
  deliverablesMeta.sort((a, b) => a.order - b.order)

  // Generate client name from slug
  const clientName = config.client
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  // Write metadata.json
  const clientMetadata: ClientMetadata = {
    clientId: config.client,
    clientName,
    packageType: config.package,
    packagePrice: packagePrices[config.package] ?? '',
    dateCompleted: new Date().toISOString().split('T')[0],
    password: config.password,
    deliverables: deliverablesMeta,
  }

  await fs.writeFile(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(clientMetadata, null, 2)
  )

  console.log()
  console.log(`Done! Converted ${deliverablesMeta.length} deliverables`)
  console.log(`  Metadata: ${path.join(outputDir, 'metadata.json')}`)
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
