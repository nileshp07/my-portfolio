// Brand marks from the Simple Icons CDN.
//
// Colorful brands render as a plain <img> in their real brand color
// (cdn.simpleicons.org/<slug> defaults to the official color).
//
// Brands whose official color is black/near-black/white (GitHub, X, Next.js,
// Express, Rust, Prisma, Expo, JWT, shadcn, Cursor) would vanish on the dark
// terminal background, so those render as a CSS mask tinted with currentColor —
// staying visible and theme-aware, which is exactly how those monochrome marks
// are shown on dark UIs.

// Ordered longest-key-first so "react native" resolves before bare "react", etc.
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
  ['rust', 'rust'],
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
  ['json web token', 'jsonwebtokens'],
  ['claude', 'claude'],
  ['cursor', 'cursor'],
  ['git', 'git'],
];

// Brands whose official color is black/near-black/white → tint to theme instead.
// whatsapp: brand green vanishes on the green accent button, so tint it to the
// button's ink color (currentColor) to stay visible in both themes.
const MONO = new Set([
  'rust',
  'shadcnui',
  'nextdotjs',
  'express',
  'prisma',
  'expo',
  'jsonwebtokens',
  'cursor',
  'github',
  'x',
  'whatsapp',
]);

// Simple Icons dropped some marks for trademark reasons (e.g. LinkedIn), so the
// CDN 404s for them. Ship those glyphs inline, tinted with currentColor.
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

// Renders a brand glyph. Pass `slug` directly, or `label` to auto-resolve one.
// Returns null when no brand mark maps to the label (e.g. "REST API design").
export function TechIcon({ label, slug: slugProp, size = 14, style }) {
  const slug = slugProp ?? slugFor(label);
  if (!slug) return null;

  if (INLINE_PATHS[slug]) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        style={{ width: size, height: size, flex: 'none', display: 'inline-block', ...style }}
      >
        <path d={INLINE_PATHS[slug]} />
      </svg>
    );
  }

  const url = `https://cdn.simpleicons.org/${slug}`;

  if (MONO.has(slug)) {
    return (
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          flex: 'none',
          display: 'inline-block',
          background: 'currentColor',
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          ...style,
        }}
      />
    );
  }

  return (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      style={{
        width: size,
        height: size,
        flex: 'none',
        display: 'inline-block',
        objectFit: 'contain',
        ...style,
      }}
    />
  );
}
