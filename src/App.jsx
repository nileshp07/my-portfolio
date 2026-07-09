import { useTheme } from './hooks/useTheme.js';
import { useReveal } from './hooks/useReveal.js';
import { useGitHub } from './hooks/useGitHub.js';
import { useTerminal } from './hooks/useTerminal.js';

import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { Marquee } from './components/Marquee.jsx';
import { About } from './components/About.jsx';
import { Experience } from './components/Experience.jsx';
import { Projects } from './components/Projects.jsx';
import { GitHub } from './components/GitHub.jsx';
import { Certifications } from './components/Certifications.jsx';
import { Contact } from './components/Contact.jsx';

export default function App() {
  const { theme, setTheme, toggleTheme } = useTheme('dark');
  const github = useGitHub();
  const terminal = useTerminal({ theme, setTheme });

  useReveal();

  return (
    <div
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: '100vh',
        transition: 'background 0.35s, color 0.35s',
      }}
    >
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero terminal={terminal} />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <GitHub github={github} />
      <Certifications />
      <Contact />
    </div>
  );
}
