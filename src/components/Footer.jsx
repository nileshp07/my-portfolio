import { profile } from '../data/portfolio.js';
import { ArrowUp } from './ui/Icons.jsx';
import { SocialLinks } from './ui/SocialLinks.jsx';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{profile.name}</p>
          <p className="footer__line">
            © {new Date().getFullYear()}. Designed and built with React and Vite.
          </p>
        </div>
        <SocialLinks className="footer__socials" />
        <a href="#top" className="footer__top">
          Back to top
          <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
