# Shoshiy вЂ” React (Vite)

Premium corporate site for Shoshiy, ported to React. Single-component architecture, zero CSS frameworks, all animations are vanilla canvas + CSS. Dark/light theme, custom cursor, preloader, 3D icosahedron hero, rotating point-cloud globe, live bento canvases.

## Quick start

   
```bash
# 1. scaffold a Vite React app (skip if you already have one)
npm create vite@latest shoshiy -- --template react
cd shoshiy

# 2. install the only runtime dependency (icons)
npm i lucide-react

# 3. drop in the files
#    src/App.jsx     <- App.jsx
#    src/styles.css  <- styles.css

# 4. run
npm run dev
```

## File map

```
src/
  main.jsx       # default Vite entry, renders <App/> (see below)
  App.jsx        # entire site (provided)
  styles.css     # all styles + design tokens (provided)
```

### src/main.jsx

If your Vite template's `main.jsx` differs, this is all it needs:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Notes

- **Fonts** load via `@import` at the top of `styles.css` (Inter + Inter Tight). For best performance, move them to `<link rel="preconnect">` tags in `index.html`.
- **Theme** toggles by setting `data-theme` on `<html>`. Default is dark. Persist it with `localStorage` if you want it to stick across reloads.
- **Reduced motion** is respected everywhere: canvases freeze, reveals show instantly.
- **Strict Mode** runs effects twice in dev. Canvas cleanups handle this; production builds run once.
- Replace placeholder copy, case studies, contact details, and the corporate-presentation download with real assets before launch.

## Suggested next steps

- Split `App.jsx` into `components/` (Hero, Services, Solutions, Work, Globe, Stack, Testimonials, Contact) once you start iterating per-section.
- Swap the form's `onSubmit` for a real endpoint (Formspree, your API, etc.).
- Add `framer-motion` if you want spring-based page transitions on top of the existing CSS reveals.
