import { useTheme } from './hooks/useTheme.js';
import { useGitHub } from './hooks/useGitHub.js';
import { useTerminal } from './hooks/useTerminal.js';

import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { StackTicker } from './components/StackTicker.jsx';
import { About } from './components/About.jsx';
import { Experience } from './components/Experience.jsx';
import { Projects } from './components/Projects.jsx';
import { GitHub } from './components/GitHub.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const github = useGitHub();
  const terminal = useTerminal({ theme, setTheme });

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero terminal={terminal} />
        <StackTicker />
        <About />
        <Experience />
        <Projects />
        <GitHub github={github} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
