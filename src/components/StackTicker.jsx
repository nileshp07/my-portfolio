import { tickerItems } from '../data/portfolio.js';
import { TechIcon } from './ui/TechIcon.jsx';
import './StackTicker.css';

function Group({ hidden }) {
  return (
    <ul className="ticker__group" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <li key={item} className="ticker__item">
          <TechIcon label={item} size={17} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// Two identical groups translate by -50% for a seamless loop.
export function StackTicker() {
  return (
    <div className="ticker" role="region" aria-label="Technologies I work with">
      <div className="ticker__track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
