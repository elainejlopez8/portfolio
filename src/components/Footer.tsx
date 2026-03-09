import { useContent } from '@/hooks/useContent';
import { JSX } from 'react';
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
  const { t } = useContent('general');
  const footerLinks = t('footer.urls', { returnObjects: true }) as Record<
    string,
    { url: string; icon?: string; alt?: string }
  >;

  return (
    <footer className='w-full rounded-md bg-gradient-to-b from-transparent via-purple-100 to-purple-200 py-4'>
      <div className='mb-2 flex justify-center gap-2'>
        {Object.entries(footerLinks).map(([key, link]) => (
          <a
            key={key}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={link.alt}
            className='*:text-xl'>
            {iconMap[link.icon || '']}
          </a>
        ))}
      </div>
      <p className='text-center text-sm'>{t('footer.text', { year: new Date().getFullYear(), name: t('name') })}</p>
    </footer>
  );
};

export default Footer;
