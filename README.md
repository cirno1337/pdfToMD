# Generator CV / Portfolio z Markdownu

Aplikacja webowa (open-source) do tworzenia CV lub strony portfolio na podstawie
pliku Markdown. Piszesz treść w edytorze z podglądem na żywo, wybierasz jeden z
gotowych szablonów graficznych i eksportujesz efekt do PDF-a lub drukujesz.

## ✨ Funkcje

- **Edytor Markdown z podglądem na żywo** — edytor i podgląd obok siebie na
  desktopie, zakładki "Edytor" / "Podgląd" na urządzeniach mobilnych.
- **Metadane z frontmatter** — imię, stanowisko, e-mail, telefon, lokalizacja,
  strona WWW, GitHub i LinkedIn wyciągane z bloku `---` na górze pliku i
  wyświetlane jako nagłówek dokumentu.
- **3 szablony graficzne** — *Modern* (minimalistyczny), *Developer*
  (motyw terminala) i *Klasyczny* (formalny układ do druku).
- **Eksport do PDF / druk** — przycisk "Pobierz PDF / Drukuj" uruchamia
  natywny `window.print()` z dedykowanymi stylami `@media print`, które
  ukrywają interfejs i dopasowują dokument do formatu A4. Dzięki temu tekst w
  PDF-ie pozostaje w pełni zaznaczalny i ostry (bez rasteryzacji).
- **Automatyczny zapis lokalny** — treść Markdown jest zapisywana w
  `localStorage`, więc odświeżenie karty nie kasuje wpisanych danych.
- **Zdjęcie profilowe** — przycisk "Dodaj zdjęcie" wgrywa plik graficzny,
  przycina go do kwadratu i skaluje w przeglądarce, po czym zapisuje jako
  `data:` URI w polu `photo` frontmattera. Bez backendu i uploadu na serwer —
  Markdown przechowuje zdjęcie bezpośrednio jako tekst.

## 🛠️ Stack technologiczny

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (plugin Vite)
- `react-markdown` + `remark-gfm` do renderowania Markdown
- Własny, lekki parser frontmatter (bez zależności działających na `Buffer`,
  dzięki czemu wszystko działa w 100% w przeglądarce)

## 🚀 Uruchomienie lokalne

Wymagany Node.js 18+.

```bash
npm install
npm run dev
```

Aplikacja wystartuje pod adresem podanym w konsoli (domyślnie
`http://localhost:5173`).

Inne przydatne komendy:

```bash
npm run build    # build produkcyjny do folderu dist/
npm run preview  # podgląd builda produkcyjnego
npm run lint     # lintowanie kodu (oxlint)
```

## 📂 Struktura projektu

```
src/
├─ components/
│  ├─ Editor.tsx           # pole edycji Markdown
│  ├─ Preview.tsx          # kontener podglądu / obszaru do druku
│  ├─ ResumeDocument.tsx   # renderowanie nagłówka (frontmatter) + treści MD
│  └─ Toolbar.tsx          # pasek: zakładki, przełącznik szablonów, akcje
├─ data/
│  └─ sampleResume.ts      # domyślne, przykładowe CV
├─ hooks/
│  └─ useLocalStorage.ts   # trwały stan zsynchronizowany z localStorage
├─ lib/
│  ├─ markdown.ts          # parser frontmatter + treści Markdown
│  └─ image.ts             # przycinanie/skalowanie zdjęcia do awatara (canvas)
├─ templates/
│  └─ index.ts             # rejestr dostępnych szablonów
├─ App.tsx
├─ index.css               # style layoutu, szablonów i wydruku (@media print)
└─ main.tsx
```

## 📝 Format pliku Markdown

Plik może zaczynać się od opcjonalnego frontmatter z danymi kontaktowymi:

```markdown
---
name: "Jan Kowalski"
title: "Frontend Developer"
email: "jan@example.com"
phone: "+48 600 000 000"
location: "Warszawa, Polska"
website: "https://jankowalski.dev"
github: "jankowalski"
linkedin: "jan-kowalski"
photo: "data:image/jpeg;base64,..." # dodawane automatycznie przez przycisk "Dodaj zdjęcie"
---

## O mnie
...
```

Reszta pliku to zwykły Markdown (nagłówki, listy, pogrubienia, linki), który
trafia do sekcji treściowej dokumentu.

## 🤝 Współpraca

Pull requesty i zgłoszenia (issues) są mile widziane — projekt jest
open-source i służy m.in. jako element portfolio.
