'use client';

import type { GeneralContent } from '@/payload/types';
import { createContext, useContext, type ReactNode } from 'react';

const ContentContext = createContext<GeneralContent | null>(null);

export function ContentProvider({ children, generalContent }: { children: ReactNode; generalContent: GeneralContent }) {
  return <ContentContext.Provider value={generalContent}>{children}</ContentContext.Provider>;
}

export function useGeneralContent(): GeneralContent {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useGeneralContent must be used within ContentProvider');
  return ctx;
}
