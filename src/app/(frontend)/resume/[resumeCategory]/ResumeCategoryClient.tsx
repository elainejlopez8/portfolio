'use client';

import PageLayout from '@/components/PageLayout';
import Resume from '@/pages/Resume';
import type { ResumeContentData } from '@/payload/types';

export default function ResumeCategoryClient({ resumeContent }: { resumeContent: ResumeContentData }) {
  return (
    <PageLayout showHeaderFooter={false}>
      <Resume resumeContent={resumeContent} />
    </PageLayout>
  );
}
