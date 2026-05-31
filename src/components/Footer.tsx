'use client';

import { useGeneralContent } from '@/contexts/ContentContext';
import type { JSX } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { PiCodepenLogoBold, PiGithubLogoBold } from 'react-icons/pi';
import { TfiLinkedin } from 'react-icons/tfi';

const iconMap: Record<string, JSX.Element> = {
  MdAlternateEmail: <MdAlternateEmail />,
  TfiLinkedin: <TfiLinkedin />,
  PiGithubLogoBold: <PiGithubLogoBold />,
  PiCodepenLogoBold: <PiCodepenLogoBold />,
};

const Footer = () => {
  const { footer, name } = useGeneralContent();
  const footerText = footer.text.replace('{year}', String(new Date().getFullYear())).replace('{name}', name);

  return (
    <footer className='layout-section w-full rounded-md bg-linear-to-b from-transparent via-purple-100 to-purple-200'>
      <div className='layout-cluster-tight layout-offset-tight flex justify-center gap-x-5!'>
        {footer.urls.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={link.alt}
            className='type-nav hover:scale-200!'>
            {iconMap[link.icon || '']}
          </a>
        ))}
      </div>
      <p className='text-center text-sm'>{footerText}</p>
    </footer>
  );
};

export default Footer;
