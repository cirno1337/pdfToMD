interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      className="editor-textarea"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      spellCheck={false}
      placeholder="Wpisz swoje CV w Markdown..."
      aria-label="Edytor Markdown"
    />
  )
}
