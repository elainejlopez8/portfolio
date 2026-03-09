import aboutImg from '@/assets/about.jpg';
import Markdown from '@/components/Markdown';
import { usePageLayout } from '@/components/PageLayout';
import useContent from '@/hooks/useContent';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AboutMe = () => {
  const { setLoaded } = usePageLayout();
  const { t } = useContent({ ns: 'aboutme' });
  const { t: tg } = useContent();
  const pathName = useLocation().pathname;
  const navLinks = tg('navLinks', { returnObjects: true });
  const title = Object.entries(navLinks).find(([_key, link]) => link.href === pathName)?.[1].label;

  useEffect(() => setLoaded(true), [setLoaded]);

  return (
    <Container
      fluid='lg'
      className='gap-y-4 p-5 flex flex-col bg-gradient-to-b from-transparent via-purple-100 to-transparent *:text-center'
      id='about-me'>
      <h1 className='text-6xl md:text-7xl uppercase'>{title}</h1>
      <h2 className='text-3xl md:text-4xl'>{t('tagline')}</h2>

      <div className='gap-y-4 landscape:gap-x-4 md:px-2 lg:px-5 flex flex-col landscape:flex-row-reverse'>
        <img
          src={aboutImg}
          alt={t('title')}
          className='!p-3 border-white md:w-1/2 lg:landscape:w-1/3 pointer-events-none mx-auto my-auto w-11/12 rotate-2 border-8 object-contain landscape:w-2/5'
        />
        <Markdown source={t('blurb')} />
      </div>
    </Container>
  );
};

export default AboutMe;
