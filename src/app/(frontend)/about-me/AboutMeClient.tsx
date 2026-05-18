'use client';

import PageLayout from '@/components/PageLayout';
import AboutMe from '@/pages/AboutMe';
import type { AboutMeContent } from '@/payload/types';

export default function AboutMeClient({ aboutMeContent }: { aboutMeContent: AboutMeContent }) {
  return (
    <PageLayout>
      <AboutMe aboutMeContent={aboutMeContent} />
    </PageLayout>
  );
}
