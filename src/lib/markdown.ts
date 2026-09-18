import type { ParsedResume, ResumeFrontmatter } from '../types'

const FRONTMATTER_DELIMITER = '---'

function unquote(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseFrontmatterBlock(block: string): ResumeFrontmatter {
  const data: Record<string, string> = {}

  for (const line of block.split('\n')) {
    if (!line.trim()) continue
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) continue

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)
    if (key) data[key] = unquote(value)
  }

  return data as ResumeFrontmatter
}

function splitFrontmatter(source: string): { block: string | null; content: string } {
  const normalized = source.replace(/\r\n/g, '\n')

  if (normalized.startsWith(`${FRONTMATTER_DELIMITER}\n`)) {
    const closingIndex = normalized.indexOf(`\n${FRONTMATTER_DELIMITER}`, FRONTMATTER_DELIMITER.length)

    if (closingIndex !== -1) {
      const block = normalized.slice(FRONTMATTER_DELIMITER.length + 1, closingIndex)
      const content = normalized.slice(closingIndex + FRONTMATTER_DELIMITER.length + 1)
      return { block, content }
    }
  }

  return { block: null, content: normalized }
}

export function parseResume(source: string): ParsedResume {
  const { block, content } = splitFrontmatter(source)
  return {
    frontmatter: block ? parseFrontmatterBlock(block) : {},
    content: content.trim(),
  }
}

/** Adds, replaces (value set) or removes (value `null`) a single frontmatter field, creating the block if needed. */
export function upsertFrontmatterField(source: string, key: string, value: string | null): string {
  const { block, content } = splitFrontmatter(source)
  const trimmedContent = content.trim()

  const existingLines = (block ?? '').split('\n').filter((line) => line.trim().length > 0)
  const otherLines = existingLines.filter((line) => line.slice(0, line.indexOf(':')).trim() !== key)
  const nextLines = value === null ? otherLines : [...otherLines, `${key}: "${value}"`]

  if (nextLines.length === 0) {
    return trimmedContent ? `${trimmedContent}\n` : ''
  }

  return `---\n${nextLines.join('\n')}\n---\n\n${trimmedContent}\n`
}
