export interface ResumeFrontmatter {
  name?: string
  title?: string
  email?: string
  phone?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
}

export interface ParsedResume {
  frontmatter: ResumeFrontmatter
  content: string
}

export type TemplateId = 'modern' | 'terminal' | 'classic'

export interface Template {
  id: TemplateId
  name: string
  description: string
  className: string
}
