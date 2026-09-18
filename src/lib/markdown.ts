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

export function parseResume(source: string): ParsedResume {
  const normalized = source.replace(/\r\n/g, '\n')

  if (normalized.startsWith(`${FRONTMATTER_DELIMITER}\n`)) {
    const closingIndex = normalized.indexOf(`\n${FRONTMATTER_DELIMITER}`, FRONTMATTER_DELIMITER.length)

    if (closingIndex !== -1) {
      const block = normalized.slice(FRONTMATTER_DELIMITER.length + 1, closingIndex)
      const content = normalized.slice(closingIndex + FRONTMATTER_DELIMITER.length + 1)
      return {
        frontmatter: parseFrontmatterBlock(block),
        content: content.trim(),
      }
    }
  }

  return { frontmatter: {}, content: normalized.trim() }
}
