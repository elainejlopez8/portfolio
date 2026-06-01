import '@/index.css';

import { ContentProvider } from '@/contexts/ContentContext';
import type { GeneralContent } from '@/payload/types';
import config from '@payload-config';
import type { Metadata } from 'next';
import { getPayload } from 'payload';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Elaine Lopez',
  description: 'Portfolio site for Elaine Lopez — Front-end Engineer & UX/UI Designer',
};

const fallbackGeneral: GeneralContent = {
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
    web: { text: 'Web Development', icons: ['FaReact', 'TbBrandTypescript', 'FaNodeJs', 'FaNpm'] },
    design: { text: 'UX/UI Design', icons: ['FaFigma', 'TbUxCircle'] },
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

type PayloadIconEntry = { icon?: string };

function normalizeIcons(raw: unknown, fallback: string[]): string[] {
  if (!Array.isArray(raw)) return fallback;
  const items = raw as (string | PayloadIconEntry)[];
  if (items.length === 0) return fallback;
  if (typeof items[0] === 'string') return items as string[];
  return items.map((item) =>
    typeof item === 'object' && item !== null ? ((item as PayloadIconEntry).icon ?? '') : ''
  );
}

async function getGeneralContent(): Promise<GeneralContent> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: 'general-content' });
    const header = data.header as GeneralContent['header'] | undefined;
    const footer = data.footer as GeneralContent['footer'] | undefined;

    return {
      name: data.name ?? fallbackGeneral.name,
      helloWorld: data.helloWorld ?? fallbackGeneral.helloWorld,
      learnMore: data.learnMore ?? fallbackGeneral.learnMore,
      navLinks: (data.navLinks as GeneralContent['navLinks']) ?? fallbackGeneral.navLinks,
      header: {
        experience: header?.experience ?? '',
        web: {
          text: header?.web?.text ?? fallbackGeneral.header.web.text,
          icons: normalizeIcons(header?.web?.icons, fallbackGeneral.header.web.icons),
        },
        design: {
          text: header?.design?.text ?? fallbackGeneral.header.design.text,
          icons: normalizeIcons(header?.design?.icons, fallbackGeneral.header.design.icons),
        },
      },
      footer: {
        text: footer?.text ?? fallbackGeneral.footer.text,
        urls: (footer?.urls as GeneralContent['footer']['urls']) ?? fallbackGeneral.footer.urls,
      },
    };
  } catch {
    return fallbackGeneral;
  }
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const generalContent = await getGeneralContent();

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ContentProvider generalContent={generalContent}>{children}</ContentProvider>
      </body>
    </html>
  );
}
