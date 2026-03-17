import { usePageLayout } from '@/components/PageLayout';
import { ResumeSection } from '@/components/Resume/ResumeSection';
import { useContent } from '@/hooks/useContent';
import type { CONTENT_KEYS } from '@/services/content/i18n';
import { ResumeCategories, type PageProps } from '@/types';
import { camelCase, kebabCase } from 'lodash';
import { JSX, useEffect, useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

const DEFAULT_SECTION_ID = 'resume';
const DEFAULT_TITLE = 'Resume';
const iconMap: Record<string, JSX.Element> = {
  PiDownloadSimpleBold: <PiDownloadSimpleBold />,
};

const Resume = ({ sectionId = DEFAULT_SECTION_ID, title = DEFAULT_TITLE }: PageProps) => {
  const { setLoaded } = usePageLayout();
  const { t } = useContent(sectionId as CONTENT_KEYS);
  const { resumeCategory } = useParams();
  const downloadResume = t('downloadResume', { returnObjects: true }) as { text: string; icon: string; url: string };

  useEffect(() => setLoaded(true), [setLoaded]);

  const resumeSection = useMemo(() => {
    switch (resumeCategory) {
      case ResumeCategories.certifications:
      case ResumeCategories.education:
      case kebabCase(ResumeCategories.employmentHistory):
        return <ResumeSection category={camelCase(resumeCategory) as ResumeCategories} useH1={true} />;

      default:
        return (
          <>
            <ResumeSection category={ResumeCategories.employmentHistory} />
            <ResumeSection category={ResumeCategories.certifications} />
            <ResumeSection category={ResumeCategories.education} />
          </>
        );
    }
  }, [resumeCategory]);

  return (
    <Container fluid='lg' className='page-section' id={sectionId}>
      {!resumeCategory && <h1 className='type-display uppercase'>{title}</h1>}
      <div className='flex flex-col items-center gap-2'>
        {resumeSection}

        {downloadResume && (
          <Button
            href={downloadResume.url}
            target='_blank'
            rel='noreferrer noopener'
            className='mx-auto mt-5! px-4 py-2 uppercase'>
            <p className='flex flex-row gap-2 *:my-auto *:text-base md:*:text-lg'>
              {downloadResume.text} {iconMap[downloadResume.icon]}
            </p>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Resume;
