import { usePageLayout } from '@/components/PageLayout';
import { ResumeSection } from '@/components/Resume/ResumeSection';
import { useContent } from '@/hooks/useContent';
import type { CONTENT_KEYS } from '@/services/content/i18n';
import { ResumeCategories, type PageProps } from '@/types';
import { camelCase, kebabCase } from 'lodash';
import { JSX, useEffect, useMemo } from 'react';
import { Button, Container, Tab, Tabs } from 'react-bootstrap';
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
          <Tabs id='resume-tabs' defaultActiveKey={ResumeCategories.employmentHistory} className='mb-3' variant='pills'>
            <Tab eventKey={ResumeCategories.employmentHistory} title='Employment'>
              <ResumeSection category={ResumeCategories.employmentHistory} />
            </Tab>
            <Tab eventKey={ResumeCategories.certifications} title='Certifications'>
              <ResumeSection category={ResumeCategories.certifications} />
            </Tab>
            <Tab eventKey={ResumeCategories.education} title='Education'>
              <ResumeSection category={ResumeCategories.education} />
            </Tab>
          </Tabs>
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
            size='sm'
            className='mx-auto mt-2 px-4 py-2 text-sm'>
            <span className='flex flex-row items-center gap-2 text-sm md:text-base'>
              {downloadResume.text} {iconMap[downloadResume.icon]}
            </span>
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Resume;
