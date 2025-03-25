import { LoadingPage } from '@/pages/LoadingScreen';
import { ReactNode, useEffect, useMemo, useState } from 'react';
// import Footer from '../Footer';
// import { NavBar } from '../NavBar';
import { usePageLayout } from './PageLayoutProvider';

const PageLayout = ({ children: children }: { children: ReactNode }) => {
  const { FooterComponent, HeaderComponent, loaded: pageLayoutLoaded } = usePageLayout();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 6800);
  }, [loading]);

  const memoisedHeader = useMemo(() => {
    if (!pageLayoutLoaded) return null;
    if (HeaderComponent) return HeaderComponent;

    // return <Header />;
  }, [pageLayoutLoaded, HeaderComponent]);

  const memoisedFooter = useMemo(() => {
    if (!pageLayoutLoaded) return null;
    // return FooterComponent ?? <Footer />;
  }, [pageLayoutLoaded, FooterComponent]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className='min-h-screen max-w-screen transition-all'>
      {memoisedHeader}
      <div className=''>
        <main className=''>{children}</main>
      </div>
      {memoisedFooter}
    </div>
  );
};

export default PageLayout;
