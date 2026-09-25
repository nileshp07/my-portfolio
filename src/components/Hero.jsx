import { CAREER_START, RESUME_URL, profile } from '../data/portfolio.js';
import { experienceYears } from '../lib/dates.js';
import { ArrowRight, Download } from './ui/Icons.jsx';
import { SocialLinks } from './ui/SocialLinks.jsx';
import { Terminal } from './Terminal.jsx';
import './Hero.css';

const stagger = (i) => ({ '--d': `${100 + i * 80}ms` });

export function Hero({ terminal }) {
  const years = experienceYears(CAREER_START);

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__status anim-in" style={stagger(0)}>
            <span className="live-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className="hero__name anim-in" style={stagger(1)}>
            Nilesh Parmar
          </h1>

          <p className="hero__tagline anim-in" style={stagger(2)}>
            Full-stack developer building multi-tenant SaaS,{' '}
            <span className="muted">from schema to screen.</span>
          </p>

          <p className="hero__lede anim-in" style={stagger(3)}>
            {years}+ years shipping production features at <strong>{profile.company}</strong>: a
            no-code form builder, tenant-scoped access control and LLM-powered form generation. I
            care about clean data models and interfaces nobody has to think twice about.
          </p>

          <div className="hero__ctas anim-in" style={stagger(4)}>
            <a className="btn btn--primary" href="#projects">
              View my work
              <ArrowRight />
            </a>
            <a className="btn btn--ghost" href={RESUME_URL} target="_blank" rel="noreferrer">
              Resume
              <Download />
            </a>
            <SocialLinks className="hero__socials" />
          </div>

          <dl className="hero__facts anim-in" style={stagger(5)}>
            <div>
              <dt className="label">Experience</dt>
              <dd>{years}+ years in production</dd>
            </div>
            <div>
              <dt className="label">Currently</dt>
              <dd>{profile.company}</dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd>Pune, {profile.timezoneLabel}</dd>
            </div>
          </dl>
        </div>

        <div className="hero__terminal anim-in" style={{ '--d': '380ms' }}>
          <Terminal terminal={terminal} />
        </div>
      </div>
    </section>
  );
}
