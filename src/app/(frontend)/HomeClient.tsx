'use client';

import { useGeneralContent } from '@/contexts/ContentContext';
import Home from '@/pages/Home';
import type { AboutMeContent, ProjectLabels, ResumeContentData } from '@/payload/types';

type Props = {
  aboutMeContent: AboutMeContent;
  resumeContent: ResumeContentData;
  projectLabels: ProjectLabels;
};

export default function HomeClient({ aboutMeContent, resumeContent, projectLabels }: Props) {
  const generalContent = useGeneralContent();
  return (
    <Home
      generalContent={generalContent}
      aboutMeContent={aboutMeContent}
      resumeContent={resumeContent}
      projectLabels={projectLabels}
    />
  );
}
