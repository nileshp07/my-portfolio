import { useEffect, useRef, useState } from 'react';
import {
  EMAIL,
  RESUME_URL,
  WHATSAPP_MESSAGE,
  WHATSAPP_NUMBER,
  profile,
  socials,
} from '../data/portfolio.js';
import { useLocalTime } from '../hooks/useLocalTime.js';
import { ArrowUpRight, Check, Clock, Copy, Download, Mail } from './ui/Icons.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { TechIcon } from './ui/TechIcon.jsx';
import './Contact.css';

const waDigits = WHATSAPP_NUMBER.replace(/\D/g, '');
const waHref = waDigits
  ? `https://wa.me/${waDigits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : null;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const time = useLocalTime(profile.timezone);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard blocked — the mailto link is still right there */
    }
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__card">
          <div className="contact__glow" aria-hidden="true" />

          <p className="section-head__kicker">Contact</p>

          <h2 id="contact-title" className="contact__title">
            Let&apos;s build something <span className="muted">that ships.</span>
          </h2>
          <p className="contact__intro">
            I&apos;m looking for full-stack and frontend-leaning roles, remote or in Pune. Hiring, or
            just want to talk shop? My inbox is open.
          </p>

          <div className="contact__email">
            <a href={`mailto:${EMAIL}`} className="contact__email-link">
              <Mail />
              <span>{EMAIL}</span>
            </a>
            <button type="button" className="contact__copy" onClick={copyEmail} aria-label="Copy email address">
              {copied ? <Check /> : <Copy />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <span className="sr-only" role="status">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>

          <div className="contact__actions">
            {waHref && (
              <a className="btn btn--primary" href={waHref} target="_blank" rel="noreferrer">
                <TechIcon slug="whatsapp" size={16} mono />
                Message on WhatsApp
              </a>
            )}
            <a className="btn btn--ghost" href={socials.linkedin} target="_blank" rel="noreferrer">
              <TechIcon slug="linkedin" size={15} mono />
              Connect on LinkedIn
              <ArrowUpRight />
            </a>
            <a className="btn btn--ghost" href={RESUME_URL} target="_blank" rel="noreferrer">
              Resume
              <Download />
            </a>
          </div>

          <p className="contact__meta">
            <Clock />
            It&apos;s <strong className="tnum">{time}</strong> in Pune right now. I usually reply
            within a day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
