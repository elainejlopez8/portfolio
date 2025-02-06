import { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import {
  PageElementProps,
  PageLayoutContextProps,
  PageLayoutProviderProps,
  PageLayoutProviderWrapperProps,
} from './types';

export const PageLayoutContext = createContext<PageLayoutContextProps>({
  setHeader: () => {},
  setFooter: () => {},
  setLoaded: () => {},
  HeaderComponent: null,
  FooterComponent: null,
  loaded: false,
  initialised: false,
});

export const usePageLayout = () => useContext(PageLayoutContext);

export const PageLayoutProvider: FC<PageLayoutProviderProps> = ({ children }) => {
  const [HeaderComponent, setHeaderComponent] = useState<PageElementProps>();
  const [FooterComponent, setFooterComponent] = useState<PageElementProps>();
  const [loaded, setLoaded] = useState(false);

  const handleSetHeader = useCallback((element: PageElementProps) => {
    setHeaderComponent(element);
  }, []);

  const handleSetFooter = useCallback((element: PageElementProps) => {
    setFooterComponent(element);
  }, []);

  const handleSetLoaded = useCallback((loaded: boolean) => {
    setLoaded(loaded);
  }, []);

  const value = useMemo(
    () => ({
      setHeader: handleSetHeader,
      setFooter: handleSetFooter,
      resetHeader: () => handleSetHeader(null),
      resetFooter: () => handleSetFooter(null),
      setLoaded: handleSetLoaded,
      HeaderComponent,
      FooterComponent,
      loaded,
      initialised: true,
    }),
    [handleSetHeader, handleSetFooter, handleSetLoaded, HeaderComponent, FooterComponent, loaded]
  );

  return (
    <PageLayoutContext.Provider value={value}>
      <div className='min-h-screen max-w-screen'>{children}</div>
    </PageLayoutContext.Provider>
  );
};

export const PageLayoutProviderWrapper: FC<PageLayoutProviderWrapperProps> = ({ children }) => {
  const { initialised } = usePageLayout();
  return !initialised ? <PageLayoutProvider>{children}</PageLayoutProvider> : <>{children}</>;
};
