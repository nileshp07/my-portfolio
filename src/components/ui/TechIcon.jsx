// Brand marks from the Simple Icons CDN, which serves each logo in its official
// brand colour. Brands whose official mark is black (Next.js, Express…) would
// vanish on the dark theme, so those render as a mask tinted with the theme's
// foreground colour — black in light mode, white in dark, as the brands intend.

// Official marks that are black / near-black.
const MONO_BRANDS = new Set([
  'nextdotjs',
  'express',
  'shadcnui',
  'prisma',
  'expo',
  'jsonwebtokens',
  'cursor',
  'github',
  'x',
]);

// Ordered so the more specific keys win ("react native" before "react").
const SLUG_RULES = [
  ['react native', 'react'],
  ['nativewind', 'tailwindcss'],
  ['tailwind', 'tailwindcss'],
  ['next', 'nextdotjs'],
  ['node', 'nodedotjs'],
  ['express', 'express'],
  ['typescript', 'typescript'],
  ['javascript', 'javascript'],
  ['python', 'python'],
  ['react', 'react'],
  ['shadcn', 'shadcnui'],
  ['material ui', 'mui'],
  ['firestore', 'firebase'],
  ['cloud function', 'firebase'],
  ['firebase', 'firebase'],
  ['postgres', 'postgresql'],
  ['mongo', 'mongodb'],
  ['supabase', 'supabase'],
  ['prisma', 'prisma'],
  ['docker', 'docker'],
  ['figma', 'figma'],
  ['expo', 'expo'],
  ['redux', 'redux'],
  ['jwt', 'jsonwebtokens'],
  ['openrouter', 'openrouter'],
  ['claude', 'claude'],
  ['cursor', 'cursor'],
  ['git', 'git'],
];

// Simple Icons dropped some marks for trademark reasons (e.g. LinkedIn), so the
// CDN 404s for them. Ship those glyphs inline.
const INLINE_PATHS = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
};

export function slugFor(label = '') {
  const l = label.toLowerCase();
  for (const [key, slug] of SLUG_RULES) {
    if (l.includes(key)) return slug;
  }
  return null;
}

// Pass `slug` directly, or `label` to auto-resolve one. Renders nothing when
// no brand mark maps to the label (e.g. "REST API design").
// `mono` tints any mark with currentColor — used for UI icons like social links
// and icons sitting on coloured buttons.
export function TechIcon({ label, slug: slugProp, size = 14, mono = false, className = '' }) {
  const slug = slugProp ?? slugFor(label);
  if (!slug) return null;

  const box = { width: size, height: size, flex: 'none', display: 'inline-block' };
  const url = `https://cdn.simpleicons.org/${slug}`;

  if (!mono && !MONO_BRANDS.has(slug) && !INLINE_PATHS[slug]) {
    return (
      <img
        className={`tech-icon ${className}`}
        src={url}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        style={{ ...box, objectFit: 'contain' }}
      />
    );
  }

  if (INLINE_PATHS[slug]) {
    return (
      <svg
        className={className}
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        style={box}
      >
        <path d={INLINE_PATHS[slug]} />
      </svg>
    );
  }

  const mask = `url(${url}) center / contain no-repeat`;
  return (
    <span
      className={`tech-icon${mono ? '' : ' tech-icon--brand-mono'} ${className}`}
      aria-hidden="true"
      style={{ ...box, background: 'currentColor', WebkitMask: mask, mask }}
    />
  );
}

export function Chip({ label, as: Tag = 'li' }) {
  return (
    <Tag className="chip">
      <TechIcon label={label} size={15} />
      {label}
    </Tag>
  );
}
