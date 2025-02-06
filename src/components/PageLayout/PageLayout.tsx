import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LoadingPage } from '../../pages/LoadingScreen';
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
    <div className='flex min-h-screen flex-col transition-all'>
      {memoisedHeader}
      <div className='flex flex-1'>
        <main className='flex w-full flex-col [&>*]:w-full'>{children}</main>
      </div>
      {memoisedFooter}
    </div>
  );
};

export default PageLayout;
