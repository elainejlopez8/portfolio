import { fallbackAboutMe, fallbackProjectLabels, fallbackResumeContent } from '@/lib/payload-content';
import type { AboutMeContent, GeneralContent, ProjectLabels, ResumeContentData } from '@/payload/types';
import config from '@payload-config';
import { Analytics } from '@vercel/analytics/react';
import { getPayload } from 'payload';
import HomeClient from './HomeClient';

async function getAllContent() {
  try {
    const payload = await getPayload({ config });
    const [generalRaw, aboutMeRaw, resumeRaw, labelsRaw] = await Promise.all([
      payload.findGlobal({ slug: 'general-content' }).catch(() => null),
      payload.findGlobal({ slug: 'about-me-content' }).catch(() => null),
      payload.findGlobal({ slug: 'resume-content' }).catch(() => null),
      payload.findGlobal({ slug: 'project-labels' }).catch(() => null),
    ]);

    const aboutMeContent: AboutMeContent = aboutMeRaw
      ? { ...fallbackAboutMe, ...(aboutMeRaw as unknown as Partial<AboutMeContent>) }
      : fallbackAboutMe;

    const resumeContent: ResumeContentData = resumeRaw
      ? { ...fallbackResumeContent, ...(resumeRaw as unknown as Partial<ResumeContentData>) }
      : fallbackResumeContent;

    const projectLabels: ProjectLabels = labelsRaw
      ? { ...fallbackProjectLabels, ...(labelsRaw as unknown as Partial<ProjectLabels>) }
      : fallbackProjectLabels;

    return {
      generalContent: generalRaw as GeneralContent | null,
      aboutMeContent,
      resumeContent,
      projectLabels,
    };
  } catch {
    return {
      generalContent: null,
      aboutMeContent: fallbackAboutMe,
      resumeContent: fallbackResumeContent,
      projectLabels: fallbackProjectLabels,
    };
  }
}

export default async function HomePage() {
  const { aboutMeContent, resumeContent, projectLabels } = await getAllContent();

  return (
    <>
      <HomeClient aboutMeContent={aboutMeContent} resumeContent={resumeContent} projectLabels={projectLabels} />
      <Analytics />
    </>
  );
}
