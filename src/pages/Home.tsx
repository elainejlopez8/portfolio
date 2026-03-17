import PageLayout, { usePageLayout } from '@/components/PageLayout';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const HomeHeader = lazy(() => import('@/components/HomeHeader'));
const AboutMe = lazy(() => import('./AboutMe'));
const Projects = lazy(() => import('./Projects'));
const Resume = lazy(() => import('./Resume'));

const Home = () => {
  const location = useLocation();
  const [showMainContent, setShowMainContent] = useState(location.hash === '#aboutMe');
  const { setLoaded } = usePageLayout();

  useEffect(() => {
    if (location.hash === '#aboutMe') {
      setShowMainContent(true);
    }
  }, [location.hash]);

  useEffect(() => setLoaded(true), [setLoaded]);

  useEffect(() => {
    if (!showMainContent || location.hash !== '#aboutMe') {
      return;
    }

    const t = window.setTimeout(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => window.clearTimeout(t);
  }, [location.hash, showMainContent]);

  const handleLearnMore = () => {
    setShowMainContent(true);

    if (window.location.hash !== '#aboutMe') {
      window.history.replaceState(null, '', `${window.location.pathname}#aboutMe`);
    }
  };

  if (!showMainContent) {
    return (
      <PageLayout onlyShowChildren>
        <Suspense fallback={null}>
          <HomeHeader onLearnMore={handleLearnMore} showMainContent={showMainContent} />
        </Suspense>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='layout-stack flex w-full flex-col'>
        <Suspense fallback={null}>
          <HomeHeader showMainContent={showMainContent} />
          <AboutMe />
          <Projects />
          <Resume />
        </Suspense>
      </div>
    </PageLayout>
  );
};

export default Home;
