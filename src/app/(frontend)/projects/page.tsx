import { fallbackProjectLabels } from '@/lib/payload-content';
import type { ProjectLabels } from '@/payload/types';
import config from '@payload-config';
import { getPayload } from 'payload';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
  let labels: ProjectLabels = fallbackProjectLabels;

  try {
    const payload = await getPayload({ config });
    const raw = await payload.findGlobal({ slug: 'project-labels' });
    labels = { ...fallbackProjectLabels, ...(raw as unknown as Partial<ProjectLabels>) };
  } catch {
    /* fall through to default */
  }

  return <ProjectsClient labels={labels} />;
}
