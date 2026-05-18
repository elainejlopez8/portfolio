'use client';

import error from '@/assets/error.png';
import { usePageLayout } from '@/components/PageLayout';
import ResumeTimeline from '@/components/Resume/ResumeTimeline';
import type { ResumeContentData } from '@/payload/types';
import { ResumeCategories } from '@/types';
import { camelCase, kebabCase } from 'lodash';
import { useParams } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { PiDownloadSimpleBold } from 'react-icons/pi';

const DEFAULT_SECTION_ID = 'resume';
const DEFAULT_TITLE = 'Resume';
const iconMap: Record<string, JSX.Element> = {
  PiDownloadSimpleBold: <PiDownloadSimpleBold />,
};

const hasResumeSectionContent = (category: ResumeCategories, resumeContent: ResumeContentData) => {
  if (category === ResumeCategories.employmentHistory) {
    return (
      Array.isArray(resumeContent.employmentHistory?.companies) && resumeContent.employmentHistory.companies.length > 0
    );
  }

  if (category === ResumeCategories.education) {
    return Array.isArray(resumeContent.education) && resumeContent.education.length > 0;
  }

  if (category === ResumeCategories.certifications) {
    return Array.isArray(resumeContent.certifications?.certs) && resumeContent.certifications.certs.length > 0;
  }

  return false;
};

type ResumeSectionProps = {
  category: ResumeCategories;
  resumeContent: ResumeContentData;
};

function ResumeSection({ category, resumeContent }: ResumeSectionProps) {
  if (!hasResumeSectionContent(category, resumeContent)) {
    const resumeError = resumeContent.resumeError;
    return resumeError ? (
      <div className='flex flex-col items-center justify-center'>
        <img src={error.src} alt='Error' className='mt-6' />
        <p className='mt-4 text-center text-pink-400'>{resumeError}</p>
      </div>
    ) : null;
  }

  const sectionData =
    category === ResumeCategories.employmentHistory
      ? resumeContent.employmentHistory
      : category === ResumeCategories.education
        ? resumeContent.education
        : resumeContent.certifications;

  const details = JSON.stringify(sectionData);

  return (
    <>
      <div className='resume-section my-4'>
        <div className='resume-section-content'>
          <ResumeTimeline details={details} category={category} viewCert={resumeContent.certifications?.viewCert} />
        </div>
      </div>
    </>
  );
}

type Props = {
  sectionId?: string;
  title?: string;
  resumeContent: ResumeContentData;
};

const Resume = ({ sectionId = DEFAULT_SECTION_ID, title = DEFAULT_TITLE, resumeContent }: Props) => {
  const { setLoaded } = usePageLayout();
  const params = useParams<{ resumeCategory?: string }>();
  const resumeCategory = params?.resumeCategory;
  const [activeTab, setActiveTab] = useState<ResumeCategories>(ResumeCategories.employmentHistory);
  const { downloadResume, tabs } = resumeContent;

  const resumeTabs = [
    { key: ResumeCategories.employmentHistory, label: tabs?.employmentHistory ?? 'Employment History' },
    { key: ResumeCategories.certifications, label: tabs?.certifications ?? 'Certifications' },
    { key: ResumeCategories.education, label: tabs?.education ?? 'Education' },
  ];

  useEffect(() => setLoaded(true), [setLoaded]);

  let resumeSection;

  switch (resumeCategory) {
    case ResumeCategories.certifications:
    case ResumeCategories.education:
    case kebabCase(ResumeCategories.employmentHistory):
      resumeSection = (
        <ResumeSection category={camelCase(resumeCategory) as ResumeCategories} resumeContent={resumeContent} />
      );
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
          <ResumeSection category={activeTab} resumeContent={resumeContent} />
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
