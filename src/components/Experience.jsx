import { CAREER_START, experience } from '../data/portfolio.js';
import { experienceYears, formatDuration, formatYM, monthsBetween } from '../lib/dates.js';
import { Reveal } from './ui/Reveal.jsx';
import { Rich, SectionHeader } from './ui/SectionHeader.jsx';
import { Chip } from './ui/TechIcon.jsx';
import './Experience.css';

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          kicker="Experience"
          title="Where I've shipped."
          subtitle={`${experienceYears(CAREER_START)}+ years in production.`}
        />

        <ol className="timeline">
          {experience.map((job, i) => {
            const current = !job.end;
            return (
              <Reveal
                as="li"
                key={`${job.org}-${job.start}`}
                delay={i * 80}
                className={`role${current ? ' role--current' : ''}`}
              >
                <div className="role__meta">
                  <p className="role__period tnum">
                    <time dateTime={job.start}>{formatYM(job.start)}</time>
                    {' — '}
                    {current ? 'Present' : <time dateTime={job.end}>{formatYM(job.end)}</time>}
                  </p>
                  <p className="role__duration">{formatDuration(monthsBetween(job.start, job.end))}</p>
                  <p className="role__where">
                    {job.type} · {job.location}
                  </p>
                </div>

                <div className="role__body">
                  <div className="role__head">
                    <h3 className="role__title">
                      {job.role} <span className="role__org">@ {job.org}</span>
                    </h3>
                    {current && (
                      <span className="badge badge--accent">
                        <span className="live-dot" aria-hidden="true" />
                        Current
                      </span>
                    )}
                  </div>
                  <ul className="role__bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>
                        <Rich text={b} />
                      </li>
                    ))}
                  </ul>
                  <ul className="chips role__stack" aria-label="Tech used">
                    {job.stack.map((s) => (
                      <Chip key={s} label={s} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
