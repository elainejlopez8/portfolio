'use client';

import PageLayout from '@/components/PageLayout';
import Projects from '@/pages/Projects';
import type { ProjectLabels } from '@/payload/types';

export default function ProjectsClient({ labels }: { labels: ProjectLabels }) {
  return (
    <PageLayout>
      <Projects labels={labels} />
    </PageLayout>
  );
}
