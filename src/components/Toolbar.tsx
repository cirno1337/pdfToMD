import type { Template, TemplateId } from '../types'

export type MobileTab = 'editor' | 'preview'

interface ToolbarProps {
  templates: Template[]
  activeTemplateId: TemplateId
  onTemplateChange: (id: TemplateId) => void
  activeTab: MobileTab
  onTabChange: (tab: MobileTab) => void
  onPrint: () => void
  onReset: () => void
}

export default function Toolbar({
  templates,
  activeTemplateId,
  onTemplateChange,
  activeTab,
  onTabChange,
  onPrint,
  onReset,
}: ToolbarProps) {
  return (
    <header className="toolbar no-print">
      <div className="toolbar-brand">
        <span className="toolbar-logo">📝</span>
        <span className="toolbar-title">Generator CV z Markdownu</span>
      </div>

      <div className="toolbar-tabs">
        <button
          type="button"
          className={`tab-button ${activeTab === 'editor' ? 'tab-button-active' : ''}`}
          onClick={() => onTabChange('editor')}
        >
          Edytor
        </button>
        <button
          type="button"
          className={`tab-button ${activeTab === 'preview' ? 'tab-button-active' : ''}`}
          onClick={() => onTabChange('preview')}
        >
          Podgląd
        </button>
      </div>

      <div className="toolbar-templates">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            title={template.description}
            className={`template-button ${activeTemplateId === template.id ? 'template-button-active' : ''}`}
            onClick={() => onTemplateChange(template.id)}
          >
            {template.name}
          </button>
        ))}
      </div>

      <div className="toolbar-actions">
        <button type="button" className="btn-secondary" onClick={onReset}>
          Przywróć przykład
        </button>
        <button type="button" className="btn-primary" onClick={onPrint}>
          Pobierz PDF / Drukuj
        </button>
      </div>
    </header>
  )
}
