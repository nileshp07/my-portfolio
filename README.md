# Nilesh Parmar — Portfolio

A terminal-themed developer portfolio built with React + Vite. Ported faithfully
from a Claude Design mockup (`Portfolio.dc.html`).

## Highlights

- **Interactive terminal** in the hero — type `help`, `projects`, `sudo hire-me`, etc.
  (command history via ↑/↓, boot-typing animation).
- **Live GitHub data** — public repos, contributions heatmap, follower count and
  top languages, fetched from the GitHub API at runtime (with graceful fallbacks).
- **Dark / light theme** toggle, persisted to `localStorage`.
- **Scroll-reveal** animations and a skills marquee.
- Fully responsive; respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  App.jsx              # composes the page
  index.css            # theme CSS variables + keyframes
  data/portfolio.js    # all content (experience, projects, skills, links)
  hooks/
    useTheme.js        # dark/light theme + persistence
    useReveal.js       # IntersectionObserver scroll reveals
    useGitHub.js       # live GitHub stats/contributions/languages
    useTerminal.js     # boot sequence + command interpreter
  components/          # Nav, Hero, Terminal, Marquee, About,
                       # Experience, Projects, GitHub, Certifications, Contact
public/
  Resume.pdf           # linked from the nav / contact section
```

Editing content: update `src/data/portfolio.js`. GitHub username, email and
social links live at the top of that file.
