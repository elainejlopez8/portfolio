import { useContent } from '@/hooks/useContent';
import { ResumeCategories, type ResumeTimelineProps } from '@/types';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';
import kebabCase from 'lodash/kebabCase';
import { Button } from 'react-bootstrap';
import { MdWork } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';
import Markdown from '../Markdown';

export default function ResumeTimeline({ details, category }: ResumeTimelineProps) {
  const { t } = useContent('resume');
  const content = JSON.parse(details);
  const items = [];
  const isWork = category === ResumeCategories.employmentHistory;
  const isEducation = category === ResumeCategories.education;
  const isCertification = category === ResumeCategories.certifications;
  if (isWork) {
    for (let i = 0; i < content?.companies?.length; i++)
      for (let j = 0; j < content?.companies[i]?.roles?.length; j++) {
        const prefix = content?.companies[i]?.roles[j];
        items.push(
          <TimelineItem
            key={`${content?.companies[i]?.company ?? 'company'}-${prefix?.title ?? 'role'}-${prefix?.start_date ?? ''}-${prefix?.end_date ?? ''}-${i}-${j}`}>
            <TimelineSeparator>
              <TimelineDot className='bg-blue-400 text-xl text-white md:text-2xl lg:text-3xl'>
                <MdWork />
              </TimelineDot>
              <TimelineConnector className='bg-blue-200' />
            </TimelineSeparator>

            <TimelineContent className='px-5 py-3'>
              <Link
                to={`/resume/${kebabCase(ResumeCategories.employmentHistory)}/${kebabCase(prefix?.title)}`}
                className='text-inherit no-underline'>
                <span className='text-blue-400'>
                  {prefix?.title} <span className='text-right'>{prefix?.team}</span>
                </span>

                <div className='font-semibold text-blue-300'>{content?.companies[i]?.company}</div>
                <div className='text-base text-pink-300 md:text-lg lg:text-xl'>
                  {prefix?.start_date} - {prefix?.end_date}
                </div>
              </Link>
              {prefix?.description && (
                <div className='mt-2 hidden text-base whitespace-pre-line sm:flex md:text-lg lg:text-xl'>
                  <Markdown source={prefix?.description} />
                </div>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      }
  }
  // For education and certifications, render a responsive card grid
  if (isEducation) {
    const cards: JSX.Element[] = [];
    for (let i = 0; i < content?.length; i++) {
      const item = content[i];
      const key = `${item?.qualification}-${item?.start_date}-${item?.end_date}-${i}`;
      cards.push(
        <article key={key} className='rounded-lg bg-blue-100 p-4 shadow transition hover:shadow-md dark:bg-purple-700'>
          <Link
            to={`/resume/${ResumeCategories.education}/${kebabCase(item?.qualification)}`}
            className='text-inherit no-underline'>
            <h3 className='text-xl font-bold text-blue-400'>{item?.qualification}</h3>
            <div className='text-sm font-semibold text-pink-300'>{item?.name}</div>
            <time className='mt-2 block text-xs text-blue-300' dateTime={`${item?.start_date || ''}`}>
              {item?.start_date} {item?.end_date ? ' - ' + item?.end_date : ''}
            </time>
            {item?.description && <Markdown source={item?.description} />}
          </Link>
        </article>
      );
    }
    return <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>{cards}</div>;
  }

  if (isCertification) {
    const cards: JSX.Element[] = [];
    for (let i = 0; i < content?.certs?.length; i++) {
      const cert = content?.certs[i];
      const key = `${cert?.name}-${cert?.certifier}-${cert?.date}-${i}`;
      cards.push(
        <article key={key} className='rounded-lg bg-blue-100 p-4 shadow transition hover:shadow-md dark:bg-purple-700'>
          <Link
            to={`/resume/${ResumeCategories.certifications}/${kebabCase(cert?.name)}`}
            className='text-inherit no-underline'>
            <h3 className='text-lg font-bold text-blue-400'>{cert?.name}</h3>
            <div className='text-sm font-semibold text-pink-300'>{cert?.certifier}</div>
            <time className='mt-2 block text-xs text-blue-300' dateTime={`${cert?.date || ''}`}>
              {cert?.date}
            </time>
            {cert?.description && <Markdown source={cert.description} />}
            {cert?.url && (
              <div className='mt-3'>
                <Button href={cert?.url} target='_blank' rel='noopener noreferrer' className='py-2 text-base'>
                  {t('certifications.viewCert')}
                </Button>
              </div>
            )}
          </Link>
        </article>
      );
    }
    return <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>{cards}</div>;
  }

  // Default: render work timeline using MUI
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
      className='md:mx-auto md:w-4/5'>
      {items}
    </Timeline>
  );
}
