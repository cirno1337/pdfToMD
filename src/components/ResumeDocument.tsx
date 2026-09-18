import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ResumeFrontmatter } from '../types'

interface ResumeDocumentProps {
  frontmatter: ResumeFrontmatter
  content: string
  templateClassName: string
}

function ContactLine({ frontmatter }: { frontmatter: ResumeFrontmatter }) {
  const items: { label: string; href?: string }[] = []

  if (frontmatter.email) {
    items.push({ label: frontmatter.email, href: `mailto:${frontmatter.email}` })
  }
  if (frontmatter.phone) {
    items.push({ label: frontmatter.phone })
  }
  if (frontmatter.location) {
    items.push({ label: frontmatter.location })
  }
  if (frontmatter.website) {
    items.push({ label: frontmatter.website.replace(/^https?:\/\//, ''), href: frontmatter.website })
  }
  if (frontmatter.github) {
    items.push({ label: `github.com/${frontmatter.github}`, href: `https://github.com/${frontmatter.github}` })
  }
  if (frontmatter.linkedin) {
    items.push({
      label: `linkedin.com/in/${frontmatter.linkedin}`,
      href: `https://linkedin.com/in/${frontmatter.linkedin}`,
    })
  }

  if (items.length === 0) return null

  return (
    <p className="resume-contact">
      {items.map((item, index) => (
        <span key={item.label}>
          {index > 0 && <span className="resume-contact-sep"> · </span>}
          {item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </span>
      ))}
    </p>
  )
}

export default function ResumeDocument({ frontmatter, content, templateClassName }: ResumeDocumentProps) {
  return (
    <div className={`resume-page ${templateClassName}`}>
      {(frontmatter.name || frontmatter.title || frontmatter.photo) && (
        <header className="resume-header">
          {frontmatter.photo && (
            <img className="resume-avatar" src={frontmatter.photo} alt={frontmatter.name ?? 'Zdjęcie profilowe'} />
          )}
          <div className="resume-header-text">
            {frontmatter.name && <h1 className="resume-name">{frontmatter.name}</h1>}
            {frontmatter.title && <p className="resume-title">{frontmatter.title}</p>}
            <ContactLine frontmatter={frontmatter} />
          </div>
        </header>
      )}
      <div className="resume-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
