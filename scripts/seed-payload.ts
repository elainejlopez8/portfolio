/**
 * One-time seed script — populates Payload Globals with the existing default content.
 *
 * Usage (after first deploy or locally with TURSO_DATABASE_URL + TURSO_AUTH_TOKEN set):
 *   yarn tsx scripts/seed-payload.ts
 */
import path from 'path';
import { getPayload } from 'payload';
import { fileURLToPath } from 'url';
import config from '../payload.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generalData = {
  name: 'Elaine Lopez',
  helloWorld: 'Hello World! 👋 My name is',
  learnMore: 'Learn more',
  navLinks: [
    { href: '/about-me', label: 'About Me' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
  ],
  header: {
    experience: '',
    web: {
      text: 'Web Development',
      icons: [{ icon: 'FaReact' }, { icon: 'TbBrandTypescript' }, { icon: 'FaNodeJs' }, { icon: 'FaNpm' }],
    },
    design: { text: 'UX/UI Design', icons: [{ icon: 'FaFigma' }, { icon: 'TbUxCircle' }] },
  },
  footer: {
    text: '© {year} {name}',
    urls: [
      { href: 'mailto:elainejlopez870@gmail.com', icon: 'MdAlternateEmail', alt: 'Email' },
      { href: 'https://www.linkedin.com/in/elainejlopez/', icon: 'TfiLinkedin', alt: 'LinkedIn' },
      { href: 'https://www.github.com/elainejlopez8', icon: 'PiGithubLogoBold', alt: 'GitHub' },
      { href: 'https://codepen.io/elainejlopez8', icon: 'PiCodepenLogoBold', alt: 'CodePen' },
    ],
  },
};

const aboutMeData = {
  name: 'Elaine Lopez',
  subtitle: "I'm Elaine",
  viewPortfolio: 'View Portfolio',
  profession: 'Web Developer & UX/UI Designer',
  tagline: 'Tech Enthusiast, Music Lover & Problem Solver',
  terminalTab: 'elaine@portfolio: ~/about',
  terminalPrefix: 'elaine@portfolio:~$',
  terminalCommand1: 'cat about-me.md',
  terminalCommand2: 'render --format markdown',
  blurb: [
    { command: 'whoami', output: 'Elaine 👋' },
    {
      command: 'education',
      output: 'BSc Computing Science (Honours) - University of Technology Sydney (UTS) 🎓',
    },
    { command: 'current_position', output: 'Front-end Engineer at Insurance Australia Group (IAG) 🚀' },
    {
      command: 'about',
      output:
        'Passionate about building clean, user-friendly interfaces and exploring all things tech. Always learning, always iterating.',
    },
    {
      command: 'experience --previous',
      output:
        'Head Teacher @ Code Camp\n\n- Taught kids web + game development\n\n- Designed engaging coding projects\n\n- Helped spark curiosity in tech',
    },
    {
      command: 'skills',
      output: 'React, TypeScript, HTML/CSS, Figma, UX/UI Design, Problem Solving, Leadership',
    },
    { command: 'interests', output: 'UI/UX design, problem solving, creative coding' },
    {
      command: 'funfact',
      output: 'I can binge-watch an entire TV series in one weekend and still have energy to code! 📺💻',
    },
    { command: 'hobbies', output: 'TV shows 📺 | Guitar 🎸 | Ukulele 🎶 | Gym 🏋️‍♀️ | Photography 📸' },
    {
      command: 'philosophy',
      output: 'Thriving at the intersection of logic and creativity — from debugging complex code to creating music.',
    },
    { command: 'status', output: 'Building. Learning. Growing. 🚀' },
  ],
  short_blurb:
    "Based in Sydney, Australia, I'm a dedicated web developer specialising in React and TypeScript. I'm passionate about building intuitive digital experiences and thrive on tackling complex challenges while constantly expanding my skill set.",
};

const resumeData = {
  resumeError: 'Failezd to load resume content. Please try again later.',
  tabs: {
    employmentHistory: 'Employment History',
    education: 'Education',
    certifications: 'Certifications',
  },
  downloadResume: {
    text: 'Download Resume',
    icon: 'PiDownloadSimpleBold',
    url: 'https://drive.google.com/file/d/1iK5DpeiDncvuJY0zgr-JeDefC9le09WR/view?usp=sharing',
  },
  employmentHistory: { companies: [] },
  education: [],
  certifications: { viewCert: 'View Certificate', certs: [] },
};

const projectLabelsData = {
  title: 'Projects',
  wip: 'Work In Progress',
  noCompleted: 'No completed projects yet.',
  completed: 'Completed Projects',
  viewProduct: 'View Product',
  loading: 'Loading projects…',
  noProjects: 'Projects are in progress, check back soon!',
  noWip: 'Big plans coming soon!',
  goToRepo: 'Repository',
  error: 'Failed to load projects. Please try again later.',
  all: 'All',
  liveSite: 'Live Site',
};

async function seed() {
  const payload = await getPayload({ config });

  console.log('Seeding general-content...');
  await payload.updateGlobal({ slug: 'general-content', data: generalData });

  console.log('Seeding about-me-content...');
  await payload.updateGlobal({ slug: 'about-me-content', data: aboutMeData });

  console.log('Seeding resume-content...');
  await payload.updateGlobal({ slug: 'resume-content', data: resumeData });

  console.log('Seeding project-labels...');
  await payload.updateGlobal({ slug: 'project-labels', data: projectLabelsData });

  console.log('✅ Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
