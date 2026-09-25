import { TechIcon } from './TechIcon.jsx';
import { socials } from '../../data/portfolio.js';

const ITEMS = [
  { label: 'GitHub', href: socials.github, slug: 'github' },
  { label: 'LinkedIn', href: socials.linkedin, slug: 'linkedin' },
  { label: 'X (Twitter)', href: socials.twitter, slug: 'x' },
];

export function SocialLinks({ className = '' }) {
  return (
    <ul className={`socials ${className}`}>
      {ITEMS.map((item) => (
        <li key={item.label}>
          <a
            className="icon-btn"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.label} (opens in a new tab)`}
            title={item.label}
          >
            <TechIcon slug={item.slug} size={16} mono />
          </a>
        </li>
      ))}
    </ul>
  );
}
