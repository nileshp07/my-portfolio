export const GITHUB_USERNAME = 'nileshp07';
export const EMAIL = 'nileshp19423@gmail.com';
export const RESUME_URL = '/Resume.pdf';

export const socials = {
  github: 'https://github.com/nileshp07',
  linkedin: 'https://linkedin.com/in/nilesh-parmar07',
  twitter: 'https://x.com/nileshParmar_7',
};

export const marqueeItems = [
  'REACT',
  'TYPESCRIPT',
  'NEXT.JS',
  'REACT NATIVE',
  'NODE.JS',
  'EXPRESS',
  'FIREBASE',
  'FIRESTORE',
  'POSTGRESQL',
  'MONGODB',
  'SUPABASE',
  'TAILWIND',
  'PRISMA',
  'DOCKER',
  'LLM APIS',
];

export const skillGroups = [
  { label: 'LANGUAGES', items: ['JavaScript (ES2022+)', 'TypeScript', 'SQL', 'Python', 'Rust (learning)'] },
  { label: 'FRONTEND', items: ['React', 'Next.js', 'React Native (Expo)', 'Tailwind CSS', 'shadcn/ui', 'Material UI'] },
  { label: 'BACKEND', items: ['Node.js', 'Express.js', 'Cloud Functions', 'REST API design'] },
  { label: 'DATABASES & BAAS', items: ['Firestore', 'PostgreSQL', 'MongoDB', 'Supabase'] },
  { label: 'AI / LLM', items: ['OpenRouter', 'LLM integration', 'Prompt engineering', 'Structured JSON output'] },
  {
    label: 'TOOLS & PRACTICES',
    items: ['Git', 'Docker', 'Prisma ORM', 'Figma', 'Claude Code', 'Cursor', 'RBAC', 'Multi-tenant architecture'],
  },
];

export const experience = [
  {
    hash: 'a3f9c21',
    head: true,
    date: 'Mar 2025 — Present',
    role: 'Full Stack Developer',
    org: 'Innover Labs · Pune (on-site)',
    bullets: [
      'Built a configurable form builder for a multi-tenant ERP — orgs define custom data schemas, workflows and UIs without code changes (React, TypeScript, Firestore).',
      'Designed and implemented RBAC for users and user groups, scoping access at form and form-group level across tenant boundaries.',
      'Integrated AI-powered form generation via Firebase Cloud Functions + OpenRouter LLM APIs; engineered prompts for reliable structured JSON output at scale.',
    ],
  },
  {
    hash: '7be02d4',
    date: 'Mar 2024 — Apr 2024',
    role: 'Frontend Development Intern',
    org: 'InternPixel · Bengaluru (remote)',
    bullets: [
      'Built responsive React UI components for client projects; created Figma prototypes and translated designs into production-ready code with the frontend team.',
    ],
  },
  {
    hash: '19d84f0',
    date: '2021 — 2024 · init',
    role: 'BCA — Bachelor of Computer Applications',
    org: 'Ness Wadia College · CGPA 8.5',
    bullets: [],
  },
];

export const featuredProject = {
  name: 'DexERP',
  badges: ['FEATURED', 'PRODUCTION · INNOVER LABS'],
  description:
    'Production multi-tenant ERP platform with a no-code form builder, RBAC, and AI-assisted form generation — core contributor across the full stack, from schema design to UI. Tenant-scoped Firestore query patterns; structured LLM prompt pipelines via Cloud Functions generate form configs from natural language.',
  tags: ['React', 'TypeScript', 'Firebase', 'Node.js', 'OpenRouter LLM'],
  shipped: [
    '→ no-code schema & workflow builder',
    '→ tenant-scoped RBAC (form + group level)',
    '→ NL → form config, via LLM pipeline',
  ],
  stackDepth: 'react ▓▓▓▓▓  firestore ▓▓▓▓░  llm ▓▓▓▓░',
};

export const projects = [
  {
    name: 'KhataBuddy',
    status: 'IN PROGRESS',
    description:
      'Cross-platform group expense splitting app with real-time Firestore sync and per-user debt settlement. Normalized debt graph minimizes settlement transactions; offline-first state reconciliation.',
    tags: ['React Native', 'Expo', 'Firebase', 'NativeWind', 'TypeScript'],
  },
  {
    name: 'Natours',
    link: 'https://github.com/nileshp07/natours',
    description:
      'RESTful tour booking API with MVC architecture — JWT auth, role-based authorization, advanced querying (filtering, sorting, pagination), rate limiting and input sanitization.',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API', 'JWT'],
  },
];

export const certifications = [
  {
    title: 'The Ultimate React Course — React, Next.js, Redux',
    issuer: 'Udemy · verified',
    link: 'https://www.udemy.com/certificate/UC-a0460a4b-912b-4b8c-aca3-f950b88854fc/',
  },
  {
    title: 'Node.js, Express, MongoDB — The Complete Bootcamp',
    issuer: 'Udemy · verified',
    link: 'https://www.udemy.com/certificate/UC-9680c0e0-5f6f-4a31-8872-2b91e1981f76/',
  },
];
