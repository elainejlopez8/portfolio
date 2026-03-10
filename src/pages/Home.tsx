import HomeHeader from '@/components/HomeHeader';
import AboutMe from '@/pages/AboutMe';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    </div>
  );
};

export default Home;
