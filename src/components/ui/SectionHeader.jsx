import { Reveal } from './Reveal.jsx';

// `title` is the statement; `subtitle` continues it in a muted tone.
export function SectionHeader({ kicker, title, subtitle, intro, id }) {
  return (
    <Reveal className="section-head">
      <p className="section-head__kicker">{kicker}</p>
      <h2 className="section-head__title" id={id}>
        {title}
        {subtitle && (
          <>
            {' '}
            <span className="muted">{subtitle}</span>
          </>
        )}
      </h2>
      {intro && <p className="section-head__intro">{intro}</p>}
    </Reveal>
  );
}

// Renders **bold** segments from content strings as <strong>.
export function Rich({ text }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </>
  );
}
