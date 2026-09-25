import { useEffect, useRef, useState } from 'react';

// One shared observer for every <Reveal>, instead of one per element.
let observer;
const callbacks = new WeakMap();

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          observer.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );
  }
  return observer;
}

// Fades and lifts its children in the first time they scroll into view.
// Each instance observes itself, so it also works for late-mounted content.
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }
    const io = getObserver();
    callbacks.set(el, () => setVisible(true));
    io.observe(el);
    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { '--reveal-delay': `${delay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
