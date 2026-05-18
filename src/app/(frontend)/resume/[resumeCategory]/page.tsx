import { fallbackResumeContent } from '@/lib/payload-content';
import type { ResumeContentData } from '@/payload/types';
import config from '@payload-config';
import { getPayload } from 'payload';
import ResumeCategoryClient from './ResumeCategoryClient';

export default async function ResumeCategoryPage() {
  let resumeContent: ResumeContentData = fallbackResumeContent;

  try {
    const payload = await getPayload({ config });
    const raw = await payload.findGlobal({ slug: 'resume-content' });
    resumeContent = { ...fallbackResumeContent, ...(raw as unknown as Partial<ResumeContentData>) };
  } catch {
    /* fall through to default */
  }

  return <ResumeCategoryClient resumeContent={resumeContent} />;
}
