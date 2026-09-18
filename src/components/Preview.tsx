import ResumeDocument from './ResumeDocument'
import type { ResumeFrontmatter } from '../types'

interface PreviewProps {
  frontmatter: ResumeFrontmatter
  content: string
  templateClassName: string
}

export default function Preview({ frontmatter, content, templateClassName }: PreviewProps) {
  return (
    <div className="preview-scroll-area">
      <div id="print-root">
        <ResumeDocument frontmatter={frontmatter} content={content} templateClassName={templateClassName} />
      </div>
    </div>
  )
}
