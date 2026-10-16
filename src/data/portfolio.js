// All site content lives here. Edit this file to update the portfolio.
// Text wrapped in **double asterisks** renders as emphasis in bullet lists.

export const GITHUB_USERNAME = 'nileshp07';
export const EMAIL = 'nileshp19423@gmail.com';
export const RESUME_URL = '/Resume.pdf';

// First full-time role (YYYY-MM) — drives every "X+ years" figure on the site,
// so it stays accurate without manual edits.
export const CAREER_START = '2025-03';

// Country code + number, digits only. Leave empty to hide the WhatsApp button.
export const WHATSAPP_NUMBER = '917057695603';
export const WHATSAPP_MESSAGE =
  'Hi Nilesh, I saw your portfolio and would like to connect about an opportunity.';

export const profile = {
  name: 'Nilesh Parmar',
  role: 'Full-stack developer',
  company: 'Innover Labs',
  location: 'Pune, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'UTC+5:30',
  availability: 'Open to full-stack & frontend roles',
  workPreference: 'Remote or Pune',
};

export const socials = {
  github: 'https://github.com/nileshp07',
  linkedin: 'https://linkedin.com/in/nilesh-parmar07',
  twitter: 'https://x.com/nileshParmar_7',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export const tickerItems = [
  'React',
  'TypeScript',
  'Next.js',
  'React Native',
  'Node.js',
  'Express',
  'Firebase',
  'PostgreSQL',
  'MongoDB',
  'Supabase',
  'Tailwind CSS',
  'Prisma',
  'Docker',
  'LLM APIs',
];

export const skillGroups = [
  {
    label: 'Frontend',
    items: [
      'React.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Next.js',
      'React Native',
      'Tailwind CSS',
      'Material UI',
      'shadcn/ui',
    ],
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Firebase Cloud Functions',
      'JWT authentication',
      'RBAC',
      'Scheduled jobs',
    ],
  },
  { label: 'Data', items: ['Firebase / Firestore', 'MongoDB', 'PostgreSQL', 'Supabase', 'Prisma ORM'] },
  {
    label: 'AI / LLM',
    items: ['OpenRouter APIs', 'LLM integration', 'Prompt engineering', 'Structured JSON generation'],
  },
  { label: 'Tooling', items: ['Git', 'Docker', 'Figma'] },
];

export const experience = [
  {
    role: 'Full Stack Developer',
    org: 'Innover Labs',
    start: '2025-03',
    end: null, // null = present
    type: 'Full-time',
    location: 'Pune · On-site',
    bullets: [
      'Built a **configurable form builder** for a multi-tenant ERP — organizations define their own data schemas, workflows and UIs without code changes.',
      'Designed and implemented **role-based access control** for users and user groups, scoping permissions at form and form-group level across tenant boundaries.',
      'Shipped **AI-powered form generation** on Firebase Cloud Functions and OpenRouter LLM APIs, engineering prompts that return reliable, structured JSON.',
      'Modeled **tenant-scoped Firestore queries** so every read and write stays isolated to its organization.',
    ],
    stack: ['React', 'TypeScript', 'Firebase', 'Cloud Functions', 'Node.js', 'OpenRouter'],
  },
  {
    role: 'Frontend Development Intern',
    org: 'InternPixel',
    start: '2024-03',
    end: '2024-04',
    type: 'Internship',
    location: 'Bengaluru · Remote',
    bullets: [
      'Built **responsive React UI components** for client projects alongside the frontend team.',
      'Prototyped interfaces in **Figma** and translated designs into production-ready code.',
    ],
    stack: ['React', 'JavaScript', 'Figma'],
  },
];

// Card images: drop a file in public/projects/ and point a project at it.
// - `image`: a 16:9 screenshot (cropped from the top).
// - `logo`: a brand logo, shown centred instead of cropped. `logoDark` swaps
//   in on the dark theme; `logoInvert` handles a black-on-white raster logo.
// Projects with neither get a panel showing their name.

export const projects = [
  {
    name: 'DexERP',
    featured: true,
    kicker: 'Multi-tenant ERP',
    logo: '/projects/dexerp-logo.jpeg',
    logoInvert: true,
    imageAlt: 'DexERP logo',
    role: 'Core contributor · full stack',
    summary:
      'A multi-tenant ERP platform where every organization shapes its own forms, workflows and permissions — no deploy required.',
    points: [
      'Configurable form builder — orgs define custom forms, data structures and workflows without code changes',
      'Tenant-scoped Firestore access patterns with granular RBAC',
      'AI-generated form configurations via server-side LLM integrations',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Firebase', 'OpenRouter'],
    note: 'Proprietary product — happy to walk through it on a call.',
  },
  {
    name: 'ClockIn HR',
    kicker: 'Multi-tenant attendance & HRMS',
    logo: '/projects/clockinhr-logo-light.png',
    logoDark: '/projects/clockinhr-logo-dark.png',
    imageAlt: 'ClockIn HR logo',
    role: 'Contributor · part of the Innover Labs product team',
    summary:
      'A multi-tenant attendance and HR platform for multi-site teams — face-recognition clock-in, shifts, leave and payroll on web, Android and iOS.',
    points: [
      'Login-free kiosk flow: detects a nearby Bluetooth beacon, resolves the org and site, then triggers face scanning for attendance',
      'Shift-aware scheduled jobs that message employees based on their assigned shifts',
      'Platform covers attendance, organization and site management, shifts and HR operations',
    ],
    stack: ['React', 'Capacitor', 'Node.js', 'Express', 'PostgreSQL', 'AWS'],
    liveUrl: 'https://www.clockinhr.com',
  },
  {
    name: 'HPX Fitness Centre',
    kicker: 'Booking platform',
    logo: '/projects/hpx-logo.png',
    imageAlt: 'HPX Hybrid Performance Studio logo',
    summary:
      'A class-booking platform for a fitness studio — members self-book trainer-led sessions while admins run the schedule.',
    points: [
      'Capacity-safe bookings and waitlists inside Firestore transactions',
      'Recurring schedules with trainer conflict prevention',
      'Automated reminders and waitlist promotion via Cloud Functions',
      'Admin reports on utilization, popular activities and no-shows',
    ],
    stack: ['Next.js', 'TypeScript', 'Firebase', 'Cloud Functions', 'Tailwind CSS'],
    liveUrl: 'https://hpxstudio.com/',
  },
  {
    name: 'KhataBuddy',
    kicker: 'Mobile app',
    status: 'In progress',
    image: null,
    summary:
      'A cross-platform app for splitting group expenses, with real-time sync and per-user debt settlement.',
    points: [
      'Real-time Firestore sync across every group member',
      'Normalized debt graph minimizes settlement transactions',
      'Offline-first state reconciliation',
    ],
    stack: ['React Native', 'Expo', 'Firebase', 'NativeWind', 'TypeScript'],
    note: 'Private repo · in active development',
  },
  {
    name: 'Natours',
    kicker: 'Backend REST API',
    image: null,
    summary:
      'A RESTful tour-booking API built on an MVC architecture, with auth, authorization and a flexible query layer.',
    points: [
      'JWT authentication with role-based authorization',
      'Filtering, sorting and pagination through query params',
      'Rate limiting and input sanitization',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/nileshp07/natours',
  },
];

export const education = {
  degree: 'Bachelor of Computer Applications',
  school: 'Ness Wadia College of Commerce, Pune',
  period: '2021 — 2024',
  grade: '8.5',
};

export const certifications = [
  {
    title: 'The Ultimate React Course 2024: React, Next.js, Redux & More',
    issuer: 'Udemy',
    link: 'https://www.udemy.com/certificate/UC-a0460a4b-912b-4b8c-aca3-f950b88854fc/',
  },
  {
    title: 'Node.js, Express, MongoDB — The Complete Bootcamp',
    issuer: 'Udemy',
    link: 'https://www.udemy.com/certificate/UC-9680c0e0-5f6f-4a31-8872-2b91e1981f76/',
  },
];
