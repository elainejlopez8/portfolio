export const dynamic = 'force-dynamic';

import { fallbackResumeContent, mergeResumeContent } from '@/lib/payload-content';
import type { ResumeContentData } from '@/payload/types';
import config from '@payload-config';
import { getPayload } from 'payload';
import ResumeClient from './ResumeClient';

export default async function ResumePage() {
  let resumeContent: ResumeContentData = fallbackResumeContent;

  try {
    const payload = await getPayload({ config });
    const raw = await payload.findGlobal({ slug: 'resume-content' });
    resumeContent = mergeResumeContent(raw);
  } catch {
    /* fall through to default */
  }

  return <ResumeClient resumeContent={resumeContent} />;
}
