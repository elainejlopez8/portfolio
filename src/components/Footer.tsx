import useContent from '@/hooks/useContent';
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
  const { t } = useContent();
  const footerLinks = t('footer.urls', { returnObjects: true }) as Record<
    string,
    { url: string; icon?: string; alt?: string }
  >;

  return (
    <footer className='py-4 rounded-md w-full bg-gradient-to-b from-transparent via-purple-100 to-purple-200'>
      <div className='gap-2 mb-2 flex justify-center'>
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
      <p className='text-sm text-center'>{t('footer.text', { year: new Date().getFullYear(), name: t('name') })}</p>
    </footer>
  );
};

export default Footer;
