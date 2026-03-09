import loadingImg from '@/assets/loading.gif';
import { PageLayoutContextProps } from '@/types';
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Footer from './Footer';
import Header from './Header';

const defaultCtx: PageLayoutContextProps = {
  setLoaded: () => {},
  loaded: false,
  initialised: false,
};

const PageLayoutContext = createContext<PageLayoutContextProps>(defaultCtx);
export const usePageLayout = () => useContext(PageLayoutContext);

type PageLayoutProps = {
  children: ReactNode;
  showHeaderFooter?: boolean;
};

const PageLayout: FC<PageLayoutProps> = ({ children, showHeaderFooter = true }) => {
  const [pageLayoutLoaded, setPageLayoutLoaded] = useState(false);

  const value = useMemo(
    () => ({
      setLoaded: setPageLayoutLoaded,
      loaded: pageLayoutLoaded,
      initialised: true,
    }),
    [pageLayoutLoaded]
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 6800);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageLayoutContext.Provider value={value}>
      {loading ? (
        <div className='flex min-h-screen w-full items-center justify-center overflow-hidden'>
          <img
            src={loadingImg}
            alt='Loading'
            className='h-auto w-fit object-contain p-5 sm:w-1/2 md:w-2/3 md:p-2.5 lg:w-3/4 md:landscape:w-2/5'
          />
        </div>
      ) : (
        <div className='flex min-h-screen w-full flex-col transition-all'>
          {pageLayoutLoaded && showHeaderFooter && <Header />}
          <main className='container mx-auto flex flex-1 px-4 py-6'>{children}</main>
          {pageLayoutLoaded && showHeaderFooter && <Footer />}
        </div>
      )}
    </PageLayoutContext.Provider>
  );
};

export default PageLayout;
