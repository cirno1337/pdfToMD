import { useMemo, useState } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar, { type MobileTab } from './components/Toolbar'
import { useLocalStorage } from './hooks/useLocalStorage'
import { parseResume } from './lib/markdown'
import { sampleResume } from './data/sampleResume'
import { defaultTemplateId, templates } from './templates'
import type { TemplateId } from './types'

const STORAGE_KEY = 'markdown-resume:content'

export default function App() {
  const [markdown, setMarkdown] = useLocalStorage(STORAGE_KEY, sampleResume)
  const [templateId, setTemplateId] = useState<TemplateId>(defaultTemplateId)
  const [activeTab, setActiveTab] = useState<MobileTab>('editor')

  const { frontmatter, content } = useMemo(() => parseResume(markdown), [markdown])
  const activeTemplate = templates.find((template) => template.id === templateId) ?? templates[0]

  function handlePrint() {
    setActiveTab('preview')
    window.requestAnimationFrame(() => window.print())
  }

  function handleReset() {
    const confirmed = window.confirm('Zastąpić bieżącą treść przykładowym CV? Tej operacji nie można cofnąć.')
    if (confirmed) {
      setMarkdown(sampleResume)
    }
  }

  return (
    <div className="app-shell">
      <Toolbar
        templates={templates}
        activeTemplateId={templateId}
        onTemplateChange={setTemplateId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPrint={handlePrint}
        onReset={handleReset}
      />

      <main className="main-split">
        <section
          className={`editor-pane no-print ${activeTab === 'preview' ? 'pane-hidden-mobile' : ''}`}
        >
          <Editor value={markdown} onChange={setMarkdown} />
        </section>

        <section
          className={`preview-pane ${activeTab === 'editor' ? 'pane-hidden-mobile' : ''}`}
        >
          <Preview frontmatter={frontmatter} content={content} templateClassName={activeTemplate.className} />
        </section>
      </main>
    </div>
  )
}
