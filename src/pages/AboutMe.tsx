import aboutImg from '@/assets/about.jpg';
import Markdown from '@/components/Markdown';
import { usePageLayout } from '@/components/PageLayout';
import { useContent } from '@/hooks/useContent';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AboutMe = () => {
  const { setLoaded } = usePageLayout();
  const { t } = useContent('aboutMe');
  const { t: tg } = useContent('general');
  const pathName = useLocation().pathname;
  const navLinks = tg('navLinks', { returnObjects: true });
  const title = Object.entries(navLinks).find(([, link]) => link.href === pathName)?.[1].label;

  useEffect(() => setLoaded(true), [setLoaded]);

  return (
    <Container
      fluid='lg'
      className='flex flex-col gap-y-4 bg-gradient-to-b from-transparent via-purple-100 to-transparent p-5 *:text-center'
      id='about-me'>
      <h1 className='text-6xl uppercase md:text-7xl'>{title}</h1>
      <h2 className='text-3xl md:text-4xl'>{t('tagline')}</h2>

      <div className='flex flex-col gap-y-4 md:px-2 lg:px-5 landscape:flex-row-reverse landscape:gap-x-4'>
        <img
          src={aboutImg}
          alt={t('title')}
          className='pointer-events-none mx-auto my-auto w-11/12 rotate-2 border-8 border-white object-contain !p-3 md:w-1/2 landscape:w-2/5 lg:landscape:w-1/3'
        />
        <Markdown source={t('blurb')} />
      </div>
    </Container>
  );
};

export default AboutMe;
