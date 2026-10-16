import { projects, socials } from '../data/portfolio.js';
import { ArrowUpRight, Lock } from './ui/Icons.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { SectionHeader } from './ui/SectionHeader.jsx';
import { Spotlight } from './ui/Spotlight.jsx';
import { Chip, TechIcon } from './ui/TechIcon.jsx';
import './Projects.css';

// A project screenshot in a light browser frame, or its logo when it has one
// instead (see src/data/portfolio.js). Projects with neither get a wordmark
// panel so every card in the grid keeps the same shape.
function Screenshot({ project }) {
  if (project.logo) return <Logo project={project} />;
  if (!project.image) {
    return (
      <div className="logo-stage" aria-hidden="true">
        <span className="logo-stage__wordmark">{project.name}</span>
      </div>
    );
  }
  return (
    <div className="shot">
      <div className="shot__frame">
        <div className="shot__bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <img
          src={project.image}
          alt={project.imageAlt || `Screenshot of ${project.name}`}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

// A brand logo centred on the card's header panel. `logoDark` (optional)
// replaces it on the dark theme for marks that need a light variant;
// `logoInvert` handles a black-on-white raster logo instead.
function Logo({ project }) {
  const alt = project.imageAlt || `${project.name} logo`;
  const variant = project.logoDark
    ? 'logo-stage__img--light'
    : project.logoInvert
      ? 'logo-stage__img--invert'
      : undefined;
  return (
    <div className="logo-stage">
      <img className={variant} src={project.logo} alt={alt} loading="lazy" decoding="async" />
      {project.logoDark && (
        <img
          className="logo-stage__img--dark"
          src={project.logoDark}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

function ProjectLinks({ project }) {
  if (!project.liveUrl && !project.githubUrl) {
    return project.note ? (
      <p className="project-note">
        <Lock />
        {project.note}
      </p>
    ) : null;
  }
  return (
    <div className="project-links">
      {project.liveUrl && (
        <a className="btn btn--primary btn--sm" href={project.liveUrl} target="_blank" rel="noreferrer">
          Live demo
          <ArrowUpRight />
        </a>
      )}
      {project.githubUrl && (
        <a className="btn btn--ghost btn--sm" href={project.githubUrl} target="_blank" rel="noreferrer">
          <TechIcon slug="github" size={14} mono />
          Source code
          <ArrowUpRight />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={(index % 2) * 100} className="card-wrap">
      <Spotlight as="article" className="card" aria-labelledby={`project-${project.name}`}>
        <Screenshot project={project} />

        <div className="card__body">
          <div className="card__top">
            <span className="card__kicker">{project.kicker}</span>
            {project.featured && <span className="badge badge--accent">Featured</span>}
            {project.status && <span className="badge badge--amber">{project.status}</span>}
          </div>

          <h3 id={`project-${project.name}`} className="card__title">
            {project.name}
          </h3>
          {project.role && <p className="card__role">{project.role}</p>}
          <p className="card__summary">{project.summary}</p>

          <ul className="card__points">
            {project.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <ul className="chips card__stack" aria-label="Tech used">
            {project.stack.map((s) => (
              <Chip key={s} label={s} />
            ))}
          </ul>

          <div className="card__foot">
            <ProjectLinks project={project} />
          </div>
        </div>
      </Spotlight>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          kicker="Projects"
          title="Selected work."
          subtitle="Shipped and in progress."
        />

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <Reveal className="projects__more">
          <a
            className="btn btn--ghost"
            href={`${socials.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
          >
            <TechIcon slug="github" size={16} mono />
            More experiments on GitHub
            <ArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
