// Minimal stroke icon set (24×24 grid, currentColor) for UI chrome.
// Brand marks live in TechIcon.jsx.

function Icon({ name, children, size, ...props }) {
  return (
    <svg
      className={`icon icon-${name}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p) => (
  <Icon name="arrow-right" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowUpRight = (p) => (
  <Icon name="arrow-up-right" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);

export const ArrowUp = (p) => (
  <Icon name="arrow-up" {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Icon>
);

export const Download = (p) => (
  <Icon name="download" {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Icon>
);

export const Copy = (p) => (
  <Icon name="copy" {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5" />
  </Icon>
);

export const Check = (p) => (
  <Icon name="check" {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const Sun = (p) => (
  <Icon name="sun" {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </Icon>
);

export const Moon = (p) => (
  <Icon name="moon" {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </Icon>
);

export const Menu = (p) => (
  <Icon name="menu" {...p}>
    <path d="M4 8h16M4 16h16" />
  </Icon>
);

export const Close = (p) => (
  <Icon name="close" {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const Mail = (p) => (
  <Icon name="mail" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Icon>
);

export const Lock = (p) => (
  <Icon name="lock" {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2.5" />
    <path d="M8 11V7.5a4 4 0 0 1 8 0V11" />
  </Icon>
);

export const Sparkle = (p) => (
  <Icon name="sparkle" {...p}>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9Z" />
  </Icon>
);

export const Clock = (p) => (
  <Icon name="clock" {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const GraduationCap = (p) => (
  <Icon name="graduation" {...p}>
    <path d="M2.5 9.5 12 5l9.5 4.5L12 14Z" />
    <path d="M6.5 11.6V16c1.6 1.6 3.4 2.4 5.5 2.4s3.9-.8 5.5-2.4v-4.4M21.5 9.5V15" />
  </Icon>
);

export const Award = (p) => (
  <Icon name="award" {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.3-1.3 7.2L12 18l4.8 2.5-1.3-7.2" />
  </Icon>
);

export const Layers = (p) => (
  <Icon name="layers" {...p}>
    <path d="m12 3 9 5-9 5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </Icon>
);

export const Shield = (p) => (
  <Icon name="shield" {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
