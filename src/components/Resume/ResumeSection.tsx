import { ResumeCategories } from '@/types';
import { kebabCase } from 'lodash';
import { Link } from 'react-router-dom';
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
          <Link to='/resume'>{resumeCategorySection.title}</Link>
        </h1>
      ) : (
        <h2 className='text-3xl uppercase md:text-4xl'>
          <Link to={`/resume/${kebabCase(category)}`}>{resumeCategorySection.title}</Link>
        </h2>
      )}
      <div className='resume-section mt-4'>
        <div className='resume-section-content'>{resumeCategorySection.categoryItems}</div>
      </div>
    </>
  );
}
