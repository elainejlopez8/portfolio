'use client';

import PageLayout from '@/components/PageLayout';
import AboutMe from '@/pages/AboutMe';
import Projects from '@/pages/Projects';
import Resume from '@/pages/Resume';
import type { AboutMeContent, GeneralContent, ProjectLabels, ResumeContentData } from '@/payload/types';
import { usePathname } from 'next/navigation';
import { Suspense, lazy, useEffect, useState } from 'react';

const HomeHeader = lazy(() => import('@/components/HomeHeader'));

type Props = {
  generalContent: GeneralContent;
  aboutMeContent: AboutMeContent;
  resumeContent: ResumeContentData;
  projectLabels: ProjectLabels;
};

function HomeInner({ generalContent, aboutMeContent, resumeContent, projectLabels }: Props) {
  const pathname = usePathname();
  const [showMainContent, setShowMainContent] = useState(
    typeof window !== 'undefined' && window.location.hash === '#aboutMe'
  );

  useEffect(() => {
    if (window.location.hash === '#aboutMe') {
      setShowMainContent(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!showMainContent || window.location.hash !== '#aboutMe') {
      return;
    }

    const t = window.setTimeout(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => window.clearTimeout(t);
  }, [showMainContent]);

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
          <HomeHeader
            generalContent={generalContent}
            aboutMeContent={aboutMeContent}
            onLearnMore={handleLearnMore}
            showContent={showMainContent}
          />
        </Suspense>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className='layout-stack flex w-full flex-col'>
        <Suspense fallback={null}>
          <HomeHeader generalContent={generalContent} aboutMeContent={aboutMeContent} showContent={showMainContent} />
        </Suspense>
        <AboutMe aboutMeContent={aboutMeContent} />
        <Projects labels={projectLabels} />
        <Resume resumeContent={resumeContent} />
      </div>
    </PageLayout>
  );
}

const Home = (props: Props) => <HomeInner {...props} />;

export default Home;
