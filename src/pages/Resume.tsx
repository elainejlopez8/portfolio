import error from '@/assets/error.png';
import { usePageLayout } from '@/components/PageLayout';
import ResumeTimeline from '@/components/Resume/ResumeTimeline';
import { useContent } from '@/hooks/useContent';
import type { CONTENT_KEYS } from '@/services/content/i18n';
import { ResumeCategories, type PageProps, type ResumeSectionProps } from '@/types';
import { camelCase, kebabCase } from 'lodash';
import { JSX, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { useParams } from 'react-router-dom';

const DEFAULT_SECTION_ID = 'resume';
const DEFAULT_TITLE = 'Resume';
const iconMap: Record<string, JSX.Element> = {
  PiDownloadSimpleBold: <PiDownloadSimpleBold />,
};

const hasResumeSectionContent = (category: ResumeCategories, content: unknown) => {
  if (category === ResumeCategories.employmentHistory) {
    return Boolean(
      content &&
      typeof content === 'object' &&
      'companies' in content &&
      Array.isArray((content as { companies?: unknown[] }).companies) &&
      (content as { companies?: unknown[] }).companies!.length > 0
    );
  }

  if (category === ResumeCategories.education) {
    return Array.isArray(content) && content.length > 0;
  }

  if (category === ResumeCategories.certifications) {
    return Boolean(
      content &&
      typeof content === 'object' &&
      'certs' in content &&
      Array.isArray((content as { certs?: unknown[] }).certs) &&
      (content as { certs?: unknown[] }).certs!.length > 0
    );
  }

  return false;
};

function ResumeSection({ category }: ResumeSectionProps) {
  const { t } = useContent('resume');
  const sectionContent = t(category, { returnObjects: true });
  const resumeError = t('resumeError');

  if (!hasResumeSectionContent(category, sectionContent)) {
    return typeof resumeError === 'string' && resumeError ? (
      <div className='flex flex-col items-center justify-center'>
        <img src={error} alt='Error' className='mt-6' />
        <p className='mt-4 text-center text-pink-400'>{resumeError}</p>
      </div>
    ) : null;
  }

  const details = JSON.stringify(sectionContent);

  return (
    <>
      <div className='resume-section my-4'>
        <div className='resume-section-content'>
          <ResumeTimeline details={details} category={category} />
        </div>
      </div>
    </>
  );
}

const Resume = ({ sectionId = DEFAULT_SECTION_ID, title = DEFAULT_TITLE }: PageProps) => {
  const { setLoaded } = usePageLayout();
  const { t } = useContent(sectionId as CONTENT_KEYS);
  const { resumeCategory } = useParams();
  const [activeTab, setActiveTab] = useState<ResumeCategories>(ResumeCategories.employmentHistory);
  const downloadResume = t('downloadResume', { returnObjects: true }) as { text: string; icon: string; url: string };
  const resumeTabs = [
    { key: ResumeCategories.employmentHistory, label: t('tabs.employmentHistory') },
    { key: ResumeCategories.certifications, label: t('tabs.certifications') },
    { key: ResumeCategories.education, label: t('tabs.education') },
  ];

  useEffect(() => setLoaded(true), [setLoaded]);

  let resumeSection;

  switch (resumeCategory) {
    case ResumeCategories.certifications:
    case ResumeCategories.education:
    case kebabCase(ResumeCategories.employmentHistory):
      resumeSection = <ResumeSection category={camelCase(resumeCategory) as ResumeCategories} />;
      break;
    default:
      resumeSection = (
        <div className='w-full'>
          <div role='tablist' aria-label='Resume categories' className='mb-2 flex flex-wrap gap-2'>
            {resumeTabs.map((tab) => (
              <button
                key={tab.key}
                role='tab'
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex-1 border-b-4 border-b-blue-500 px-1.5 py-2 text-sm! font-bold text-blue-500 sm:min-w-40 md:w-auto md:text-base! lg:text-lg! ${activeTab === tab.key ? 'rounded-t-lg! bg-blue-300 text-white' : 'btn-outline-secondary'} hover:rounded-t-lg! hover:border-b-pink-500 hover:bg-pink-300 hover:text-white`}>
                {tab.label}
              </button>
            ))}
          </div>
          <ResumeSection category={activeTab} />
        </div>
      );
      break;
  }

  return (
    <Container fluid='lg' className='page-section flex-1' id={sectionId}>
      {!resumeCategory && <h1 className='type-display uppercase'>{title}</h1>}
      <div className='flex h-full flex-1 flex-col items-center gap-2'>
        {resumeSection}

        {downloadResume && (
          <Button
            href={downloadResume.url}
            target='_blank'
            rel='noreferrer noopener'
            size='sm'
            className='mx-auto mt-auto mb-2 px-4 py-2'>
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
