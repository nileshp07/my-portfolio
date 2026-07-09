import { useEffect } from 'react';

// Fades/slides in every [data-reveal] element as it scrolls into view,
// mirroring the scroll-reveal behaviour of the source design.
export function useReveal() {
  useEffect(() => {
    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let io;
    try {
      const els = Array.from(document.querySelectorAll('[data-reveal]'));
      const vh = window.innerHeight;
      const below = els.filter((el) => el.getBoundingClientRect().top > vh * 0.92);

      below.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition =
          'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      });

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.style.opacity = '1';
              en.target.style.transform = 'translateY(0)';
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      below.forEach((el) => io.observe(el));
    } catch (e) {
      /* ignore */
    }

    return () => {
      if (io) io.disconnect();
    };
  }, []);
}
