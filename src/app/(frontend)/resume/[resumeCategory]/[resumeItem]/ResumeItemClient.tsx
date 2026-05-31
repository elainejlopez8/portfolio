'use client';

import PageLayout from '@/components/PageLayout';
import ResumeCard from '@/components/Resume/ResumeCard';
import type { ResumeContentData } from '@/payload/types';

export default function ResumeItemClient({ resumeContent }: { resumeContent: ResumeContentData }) {
  return (
    <PageLayout showHeaderFooter={false}>
      <ResumeCard resumeContent={resumeContent} />
    </PageLayout>
  );
}
