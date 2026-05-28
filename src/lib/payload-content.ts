import type { AboutMeContent, ProjectLabels, ResumeContentData } from '@/payload/types';

export const fallbackAboutMe: AboutMeContent = {
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

export const fallbackResumeContent: ResumeContentData = {
  resumeError: 'Failed to load resume content. Please try again later.',
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

export function mergeResumeContent(raw: unknown): ResumeContentData {
  const r = raw as Partial<ResumeContentData> | null | undefined;
  if (!r) return fallbackResumeContent;
  return {
    resumeError: r.resumeError ?? fallbackResumeContent.resumeError,
    tabs: r.tabs
      ? {
          employmentHistory: r.tabs.employmentHistory ?? fallbackResumeContent.tabs.employmentHistory,
          education: r.tabs.education ?? fallbackResumeContent.tabs.education,
          certifications: r.tabs.certifications ?? fallbackResumeContent.tabs.certifications,
        }
      : fallbackResumeContent.tabs,
    downloadResume: r.downloadResume
      ? {
          text: r.downloadResume.text ?? fallbackResumeContent.downloadResume.text,
          icon: r.downloadResume.icon ?? fallbackResumeContent.downloadResume.icon,
          url: r.downloadResume.url ?? fallbackResumeContent.downloadResume.url,
        }
      : fallbackResumeContent.downloadResume,
    employmentHistory: r.employmentHistory ?? fallbackResumeContent.employmentHistory,
    education: r.education ?? fallbackResumeContent.education,
    certifications: r.certifications ?? fallbackResumeContent.certifications,
  };
}

export const fallbackProjectLabels: ProjectLabels = {
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
