import {
  CAREER_START,
  GITHUB_USERNAME,
  certifications,
  education,
  profile,
  skillGroups,
} from '../data/portfolio.js';
import { experienceYears } from '../lib/dates.js';
import { useLocalTime } from '../hooks/useLocalTime.js';
import { ArrowRight, ArrowUpRight, Award, GraduationCap } from './ui/Icons.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { SectionHeader } from './ui/SectionHeader.jsx';
import { Chip } from './ui/TechIcon.jsx';
import './About.css';

export function About() {
  const years = experienceYears(CAREER_START);
  const time = useLocalTime(profile.timezone);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          kicker="About"
          title="Backend-minded."
          subtitle="Product-focused."
        />

        <div className="bento">
          <Reveal className="bento__card bento__story">
            <p className="bento__lead">
              I&apos;m a full-stack developer at <strong>{profile.company}</strong> in Pune, where
              I&apos;ve spent the last {years}+ years building DexERP, a multi-tenant ERP in which
              every organization shapes its own forms, workflows and permissions.
            </p>
            <p>
              I work across the stack, but I&apos;ve been gravitating toward{' '}
              <strong>backend architecture and system design</strong>: data models, access control,
              and getting LLMs to return something a program can actually trust. Day to day, that
              means forms, dashboards and data-heavy tools.
            </p>
            <p>
              Outside work I&apos;m picking up DevOps and Web3, with a long-term goal of taking a
              product from idea to production on my own.
            </p>
            <div className="bento__cta">
              <p>Looking for full-stack and frontend roles, remote or in Pune.</p>
              <a className="btn btn--ghost btn--sm" href="#contact">
                Get in touch
                <ArrowRight />
              </a>
            </div>
          </Reveal>

          <Reveal className="bento__card bento__profile" delay={80}>
            <div className="profile__id">
              <img
                className="profile__avatar"
                src={`https://github.com/${GITHUB_USERNAME}.png?size=112`}
                alt=""
                width="52"
                height="52"
                loading="lazy"
              />
              <div>
                <p className="profile__name">{profile.name}</p>
                <p className="profile__role">
                  {profile.role} · {profile.company}
                </p>
              </div>
            </div>
            <div className="profile__clock">
              <p className="profile__time tnum">{time}</p>
              <p className="profile__zone">
                Local time in {profile.location} ({profile.timezoneLabel})
              </p>
            </div>
          </Reveal>

          <Reveal className="bento__card bento__now" delay={140}>
            <h3 className="bento__title">Right now</h3>
            <dl className="now-list">
              <div>
                <dt className="label">Building</dt>
                <dd>DexERP at {profile.company}</dd>
              </div>
              <div>
                <dt className="label">Side project</dt>
                <dd>KhataBuddy, a React Native expense splitter</dd>
              </div>
              <div>
                <dt className="label">Learning</dt>
                <dd>DevOps and Web3</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="bento__card bento__tools">
            <h3 className="bento__title">
              Toolbox
              <span className="muted">
                {skillGroups.reduce((n, g) => n + g.items.length, 0)} tools
              </span>
            </h3>
            <div className="tools">
              {skillGroups.map((group) => (
                <div key={group.label} className="tools__row">
                  <p className="tools__label">{group.label}</p>
                  <ul className="chips">
                    {group.items.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="bento__card bento__edu" delay={80}>
            <span className="edu__icon" aria-hidden="true">
              <GraduationCap />
            </span>
            <h3 className="bento__title">Education</h3>
            <p className="edu__degree">{education.degree}</p>
            <p className="edu__school">
              {education.school} · {education.period}
            </p>
            <p className="edu__grade">
              <span className="tnum">{education.grade}</span> CGPA
            </p>

            <h3 className="bento__title edu__certs-title">Certifications</h3>
            <ul className="certs">
              {certifications.map((c) => (
                <li key={c.title}>
                  <a className="cert" href={c.link} target="_blank" rel="noreferrer">
                    <Award className="cert__icon" />
                    <span className="cert__text">
                      <span className="cert__title">{c.title}</span>
                      <span className="cert__issuer">{c.issuer} · Verified</span>
                    </span>
                    <ArrowUpRight className="cert__go" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
