export const general = {
  name: 'Elaine Lopez',
  helloWorld: 'Hello World! 👋 My name is',
  learnMore: 'Learn more',
  navLinks: [
    {
      href: '/#aboutMe',
      label: 'About Me',
    },
    {
      href: '/projects',
      label: 'Projects',
    },
    {
      href: '/resume',
      label: 'Resume',
    },
  ],
  header: {
    experience: `<p className='home-header-stat-value'>{{ numberOfYears }}+<span className='home-header-stat-unit'>Years</span></p>`,
    web: {
      text: 'Web Development',
      icons: ['FaReact', 'TbBrandTypescript', 'FaNodeJs', 'FaNpm'],
    },
    design: {
      text: 'UX/UI Design',
      icons: ['FaFigma', 'TbUxCircle'],
    },
  },
  footer: {
    text: '© {{ year }} {{ name }}',
    urls: [
      {
        href: 'mailto:elainejlopez870@gmail.com',
        icon: 'MdAlternateEmail',
        alt: 'Email',
      },
      {
        href: 'https://www.linkedin.com/in/elainejlopez/',
        icon: 'TfiLinkedin',
        alt: 'LinkedIn',
      },
      {
        href: 'https://www.github.com/elainejlopez8',
        icon: 'PiGithubLogoBold',
        alt: 'GitHub',
      },
      {
        href: 'https://codepen.io/elainejlopez8',
        icon: 'PiCodepenLogoBold',
        alt: 'CodePen',
      },
    ],
  },
};
