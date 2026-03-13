import HomeHeader from '@/components/HomeHeader';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Resume from './Resume';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash !== '#aboutMe') {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <div className='layout-stack flex w-full flex-col'>
      <HomeHeader />
      <AboutMe />
      <Projects />
      <Resume />
    </div>
  );
};

export default Home;
