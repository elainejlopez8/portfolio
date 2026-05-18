import { fallbackAboutMe } from '@/lib/payload-content';
import type { AboutMeContent } from '@/payload/types';
import config from '@payload-config';
import { getPayload } from 'payload';
import AboutMeClient from './AboutMeClient';

export default async function AboutMePage() {
  let aboutMeContent: AboutMeContent = fallbackAboutMe;

  try {
    const payload = await getPayload({ config });
    const raw = await payload.findGlobal({ slug: 'about-me-content' });
    aboutMeContent = { ...fallbackAboutMe, ...(raw as unknown as Partial<AboutMeContent>) };
  } catch {
    /* fall through to default */
  }

  return <AboutMeClient aboutMeContent={aboutMeContent} />;
}
