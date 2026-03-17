import { kebabCase } from 'lodash';
import { ResumeCategories } from '../../types';
import { useCreateResumeTimeline } from './hooks';

interface ResumeSectionProps {
  category: ResumeCategories;
  useH1?: boolean;
}

export function ResumeSection({ category, useH1 = false }: ResumeSectionProps) {
  const resumeCategorySection = useCreateResumeTimeline(category);

  return (
    <>
      {useH1 ? (
        <h1 className='text-6xl uppercase md:text-7xl'>
          <a href={`/resume`} target='_self' rel='noreferrer noopener'>
            {resumeCategorySection.title}
          </a>
        </h1>
      ) : (
        <h2 className='text-3xl uppercase md:text-4xl'>
          <a href={`/resume/${kebabCase(category)}`} target='_self' rel='noreferrer noopener'>
            {resumeCategorySection.title}
          </a>
        </h2>
      )}
      {resumeCategorySection.categoryItems}
    </>
  );
}
