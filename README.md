# Nilesh Parmar — Portfolio

Personal portfolio built with React + Vite, with no UI or animation libraries.
The styling is plain CSS on top of a small design-token system.

## Highlights

- **Recruiter-first hero**: name, role, availability, years of experience (computed from
  `CAREER_START`, so it never goes stale), location and resume, all visible without scrolling.
- **Interactive terminal**: type `help`, `skills`, `sudo hire-me`… Tab autocompletes,
  ↑/↓ recalls history, and there are clickable suggestions for people who'd rather not type.
- **Project case studies**: a featured project plus cards, each showing a framed screenshot
  once you add one (see below).
- **Bento-style About** with story, live Pune clock, current focus, toolbox, education and
  certifications.
- **Live GitHub data**: contribution heatmap with month labels, busiest day and top languages,
  plus loading skeletons and a fallback image.
- **Dark / light theme**: defaults to the OS preference, persists the user's choice, applies it
  before first paint (no flash) and cross-fades via the View Transitions API.
- Scroll-spy nav, reading-progress bar, scroll reveals, cursor-following card glow, and a live
  "local time in Pune" readout for recruiters in other time zones.
- Accessibility: semantic landmarks, skip link, visible focus states, labelled icon buttons,
  and full `prefers-reduced-motion` support.
- SEO: descriptive meta, Open Graph tags and `Person` JSON-LD.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

All content lives in `src/data/portfolio.js`: profile, experience, projects, skills,
education, certifications and links. Wrap text in `**double asterisks**` inside experience
bullets to emphasize it. To add a live demo to a project, set `liveUrl` (and `githubUrl` for
source), and a button appears automatically.

**Project screenshots:** put an image in `public/projects/` and set the project's `image`
field, e.g. `image: '/projects/dexerp.png'`. A 16:9 capture works best (it's cropped from the
top). Projects without an image render as text-only cards.

## Structure

```
src/
  main.jsx               # entry; global styles load before components
  App.jsx                # page composition
  styles/
    tokens.css           # colour, type, radius, motion tokens (dark + light)
    base.css             # reset, atmosphere, buttons, chips, reveal motion
  data/portfolio.js      # all site content
  lib/dates.js           # durations + "X+ years" maths
  hooks/                 # useTheme, useTerminal, useGitHub, useScrollSpy, useLocalTime
  components/
    ui/                  # Icons, Reveal, Spotlight, SectionHeader, TechIcon, SocialLinks
    Nav, Hero, Terminal, StackTicker, About, Experience,
    Projects, GitHub, Contact, Footer
    (each with a co-located .css file)
public/
  Resume.pdf, favicon.svg
  projects/              # project screenshots
```
