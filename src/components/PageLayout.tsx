import loadingImg from '@/assets/loading.gif';
import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import Footer from './Footer';
import Header from './Header';

type PageLayoutContextProps = {
  setLoaded: (v: boolean) => void;
  loaded: boolean;
  initialised: boolean;
};

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
        <div className='p-6 flex min-h-screen w-full items-center justify-center'>
          <img src={loadingImg} alt='Loading' className='p-5 sm:w-3/4 md:w-1/2 h-auto w-fit object-contain' />
        </div>
      ) : (
        <div className='flex min-h-screen w-full flex-col transition-all'>
          {pageLayoutLoaded && showHeaderFooter && <Header />}
          <main className='px-4 py-6 container mx-auto flex-1'>{children}</main>
          {pageLayoutLoaded && showHeaderFooter && <Footer />}zz
        </div>
      )}
    </PageLayoutContext.Provider>
  );
};

export default PageLayout;
