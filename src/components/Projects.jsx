import { Hover } from './Hover.jsx';
import { TechIcon, slugFor } from './TechIcon.jsx';
import { featuredProject, projects, socials } from '../data/portfolio.js';

function Tag({ children }) {
  const hasIcon = Boolean(slugFor(children));
  return (
    <span className="np-project-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: hasIcon ? 6 : 0, font: "500 11.5px 'IBM Plex Mono', monospace", color: 'var(--accent)', background: 'var(--accent-12)', borderRadius: 6, padding: '5px 10px' }}>
      <TechIcon label={children} size={12} />{children}
    </span>
  );
}

function ProjectLinks({ project }) {
  const links = [
    project.liveUrl && { href: project.liveUrl, label: 'live site ↗', primary: true },
    project.githubUrl && { href: project.githubUrl, label: 'github ↗' },
  ].filter(Boolean);
  if (!links.length) return null;
  return (
    <div className="np-project-links" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
      {links.map((link) => (
        <Hover key={link.href} as="a" href={link.href} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', minHeight: 40, alignItems: 'center', border: '1px solid var(--line2)', borderRadius: 8, padding: '0 13px', color: link.primary ? 'var(--accent-ink)' : 'var(--fg2)', background: link.primary ? 'var(--accent)' : 'transparent', font: "500 11.5px 'IBM Plex Mono', monospace", transition: 'transform .2s, border-color .2s, color .2s' }} hoverStyle={{ transform: 'translateY(-2px)', borderColor: 'var(--accent)', color: link.primary ? 'var(--accent-ink)' : 'var(--accent)' }}>
          {link.label}
        </Hover>
      ))}
    </div>
  );
}

function ProjectMedia({ project, featured = false }) {
  if (project.image) {
    return <img src={project.image} alt={project.imageAlt || `${project.title} preview`} loading={featured ? 'eager' : 'lazy'} style={{ display: 'block', width: '100%', height: '100%', minHeight: featured ? 220 : 170, objectFit: 'cover' }} />;
  }
  return (
    <div className="np-project-media-placeholder" aria-hidden="true" style={{ minHeight: featured ? 220 : 170, height: '100%', padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, var(--t-bg), var(--panel))', color: 'var(--t-green)', font: "500 12px 'IBM Plex Mono', monospace" }}>
      <span>project / preview</span>
      <span style={{ fontSize: featured ? 46 : 32, letterSpacing: '-.08em', opacity: .9 }}>{project.title.slice(0, 2).toUpperCase()}</span>
      
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Hover data-reveal style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--panel)', overflow: 'hidden', transition: 'border-color .25s, transform .25s' }} hoverStyle={{ borderColor: 'var(--accent-40)', transform: 'translateY(-3px)' }}>
      <div className="np-project-card-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, .72fr) 1.28fr' }}>
        <ProjectMedia project={project} />
        <div style={{ padding: '26px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ font: "500 11px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>{project.eyebrow}</span>
            {project.status && <span style={{ font: "500 10px 'IBM Plex Mono', monospace", color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: 99, padding: '3px 9px', letterSpacing: '.08em' }}>{project.status}</span>}
          </div>
          <h3 style={{ font: "700 26px/1.1 'Space Grotesk', sans-serif", margin: '10px 0 0' }}>{project.title}</h3>
          <p style={{ font: "400 14px/1.68 'Space Grotesk', sans-serif", color: 'var(--fg2)', margin: '12px 0 0', textWrap: 'pretty' }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 18 }}>{project.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
          {project.highlights?.length > 0 && <div className="np-project-highlights" style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 5, color: 'var(--fg3)', font: "400 11.5px/1.5 'IBM Plex Mono', monospace" }}>{project.highlights.map((item) => <span key={item}>↳ {item}</span>)}</div>}
          <ProjectLinks project={project} />
        </div>
      </div>
    </Hover>
  );
}

export function Projects() {
  return (
    <div id="projects" style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 28px 0', scrollMarginTop: 70 }}>
      <div data-reveal style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>$ ls ./projects --sort=impact</div>
      <h2 data-reveal style={{ font: "700 clamp(30px, 3.4vw, 42px)/1.15 'Space Grotesk', sans-serif", letterSpacing: '-.02em', margin: '14px 0 0' }}>Selected work</h2>

      <Hover data-reveal style={{ marginTop: 38, border: '1px solid var(--line)', borderRadius: 16, background: 'var(--panel)', overflow: 'hidden', transition: 'border-color .25s, transform .25s' }} hoverStyle={{ borderColor: 'var(--accent-40)', transform: 'translateY(-3px)' }}>
        <div className="np-featured-project-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, .9fr) 1.1fr' }}>
          <ProjectMedia project={featuredProject} featured />
          <div style={{ padding: '32px 36px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>{featuredProject.badges?.map((badge) => <span key={badge} style={{ font: "600 10.5px 'IBM Plex Mono', monospace", color: badge === featuredProject.badges[0] ? 'var(--accent-ink)' : 'var(--fg2)', background: badge === featuredProject.badges[0] ? 'var(--accent)' : 'transparent', border: badge === featuredProject.badges[0] ? 0 : '1px solid var(--line2)', borderRadius: 99, padding: '4px 11px', letterSpacing: '.08em' }}>{badge}</span>)}</div>
            <div style={{ font: "700 32px 'Space Grotesk', sans-serif", marginTop: 16 }}>{featuredProject.title}</div>
            <p style={{ font: "400 14.5px/1.7 'Space Grotesk', sans-serif", color: 'var(--fg2)', margin: '10px 0 0', textWrap: 'pretty' }}>{featuredProject.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 18 }}>{featuredProject.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
            <ProjectLinks project={featuredProject} />
          </div>
        </div>
      </Hover>

      <div className="np-project-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
      <div data-reveal style={{ marginTop: 22, font: "400 13px 'IBM Plex Mono', monospace", color: 'var(--fg3)' }}>more experiments → <a href={`${socials.github}?tab=repositories`} target="_blank" rel="noreferrer">github.com/nileshp07</a></div>
    </div>
  );
}
