import React, { JSX } from 'react';

export type PageElementProps = JSX.Element | null | undefined;

export interface PageLayoutProviderProps {
  children: React.ReactNode;
}

export interface PageLayoutProviderWrapperProps {
  children: React.ReactNode;
}

export interface PageLayoutContextProps {
  setHeader: (element: PageElementProps) => void;
  setFooter: (element: PageElementProps) => void;
  setLoaded: (loaded: boolean) => void;
  HeaderComponent?: PageElementProps;
  FooterComponent?: PageElementProps;
  loaded: boolean;
  initialised: boolean;
}
