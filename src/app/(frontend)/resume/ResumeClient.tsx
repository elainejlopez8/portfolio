'use client';

import PageLayout from '@/components/PageLayout';
import Resume from '@/pages/Resume';
import type { ResumeContentData } from '@/payload/types';

export default function ResumeClient({ resumeContent }: { resumeContent: ResumeContentData }) {
  return (
    <PageLayout>
      <Resume resumeContent={resumeContent} />
    </PageLayout>
  );
}
