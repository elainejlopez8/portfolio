import loadingImg from '@/assets/loading.gif';
import { PageLayoutContextProps } from '@/types';
import { createContext, FC, lazy, ReactNode, Suspense, useContext, useEffect, useMemo, useState } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

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
  onlyShowChildren?: boolean;
};

const PageLayout: FC<PageLayoutProps> = ({ children, showHeaderFooter = true, onlyShowChildren = false }) => {
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
    if (onlyShowChildren) {
      setLoading(false);
      setPageLayoutLoaded(false);
      return;
    }
    const t = setTimeout(() => setLoading(false), 6800);
    return () => clearTimeout(t);
  }, [onlyShowChildren]);

  if (onlyShowChildren) {
    return (
      <PageLayoutContext.Provider value={value}>
        <div className='flex min-h-screen w-full flex-col overflow-hidden transition-all'>
          <main className='flex w-full flex-1 overflow-hidden'>{children}</main>
        </div>
      </PageLayoutContext.Provider>
    );
  }

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
          {pageLayoutLoaded && showHeaderFooter && (
            <Suspense fallback={null}>
              <Header />
            </Suspense>
          )}
          <main className='flex flex-1'>{children}</main>
          {pageLayoutLoaded && showHeaderFooter && (
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          )}
        </div>
      )}
    </PageLayoutContext.Provider>
  );
};

export default PageLayout;
