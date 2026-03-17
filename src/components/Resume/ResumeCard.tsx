import { ResumeCategories } from '@/types';
import { camelCase, kebabCase } from 'lodash';
import { Container } from 'react-bootstrap';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import { useResumeContent } from './hooks';

function ResumeCard(): JSX.Element | null {
  const { resumeCategory, resumeItem } = useParams<{ resumeCategory?: string; resumeItem?: string }>();
  const category = camelCase(resumeCategory ?? '') as ResumeCategories;
  const itemKey = kebabCase(resumeItem ?? '');
  const content = useResumeContent(category, itemKey);

  if (!content) return null;

  const { title, subtitle, date, description, team } = content;

  return (
    <Container fluid='lg' className='flex flex-col gap-y-5'>
      <h1 className='text-6xl uppercase md:text-7xl'>
        <Link to={`/resume/${resumeCategory}`} className='no-underline'>
          <div className='flex items-center'>
            <span className='my-auto mr-8 hidden text-5xl lg:flex'>
              <MdArrowBackIosNew />
            </span>
            {title}
          </div>
        </Link>
      </h1>
      <h2 className='text-center text-3xl uppercase sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl'>{subtitle}</h2>
      <div className='relative flex w-full'>
        {team && <span className='absolute left-0'>{team}</span>}
        <span className='absolute right-0'>{date}</span>
      </div>
      <p className='relative top-6'>{description}</p>
      <div className='mx-auto flex items-center justify-center p-5 md:p-8 xl:px-40 portrait:flex-col landscape:flex-row-reverse' />
    </Container>
  );
}

export default ResumeCard;
