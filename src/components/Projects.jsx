import { featuredProject, projects, socials } from '../data/portfolio.js';
import { ArrowUpRight, Layers, Lock, Shield, Sparkle } from './ui/Icons.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { SectionHeader } from './ui/SectionHeader.jsx';
import { Spotlight } from './ui/Spotlight.jsx';
import { Chip, TechIcon } from './ui/TechIcon.jsx';
import './Projects.css';

const HIGHLIGHT_ICONS = [Layers, Shield, Sparkle];

// A project screenshot in a light browser frame. Renders nothing until the
// project has an `image` (see src/data/portfolio.js).
function Screenshot({ project, eager = false }) {
  if (!project.image) return null;
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
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
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

function FeaturedProject({ project }) {
  return (
    <Reveal>
      <Spotlight as="article" className="feature" aria-labelledby="feature-title">
        <Screenshot project={project} eager />

        <div className="feature__grid">
          <div className="feature__intro">
            <div className="feature__badges">
              <span className="badge badge--accent">Featured</span>
              <span className="badge badge--outline">{project.kicker}</span>
            </div>
            <h3 id="feature-title" className="feature__title">
              {project.name}
            </h3>
            <p className="feature__role">{project.role}</p>
            <p className="feature__summary">{project.summary}</p>
            <ul className="chips feature__stack" aria-label="Tech used">
              {project.stack.map((s) => (
                <Chip key={s} label={s} />
              ))}
            </ul>
            <ProjectLinks project={project} />
          </div>

          <ul className="feature__points">
            {project.highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
              return (
                <li key={h.title}>
                  <span className="feature__icon">
                    <Icon />
                  </span>
                  <div>
                    <p className="feature__point-title">{h.title}</p>
                    <p className="feature__point-body">{h.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Spotlight>
    </Reveal>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 100} className="card-wrap">
      <Spotlight as="article" className="card" aria-labelledby={`project-${project.name}`}>
        <Screenshot project={project} />

        <div className="card__body">
          <div className="card__top">
            <span className="card__kicker">{project.kicker}</span>
            {project.status && <span className="badge badge--amber">{project.status}</span>}
          </div>

          <h3 id={`project-${project.name}`} className="card__title">
            {project.name}
          </h3>
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

        <FeaturedProject project={featuredProject} />

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
