import type { Template } from '../types'

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Czysty, minimalistyczny układ z akcentem koloru.',
    className: 'template-modern',
  },
  {
    id: 'terminal',
    name: 'Developer',
    description: 'Ciemny motyw inspirowany terminalem, monospace.',
    className: 'template-terminal',
  },
  {
    id: 'classic',
    name: 'Klasyczny',
    description: 'Tradycyjny, formalny układ CV do druku.',
    className: 'template-classic',
  },
]

export const defaultTemplateId = templates[0].id
