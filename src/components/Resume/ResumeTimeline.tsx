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
import { MdWork } from 'react-icons/md';
import { JSX } from 'react/jsx-runtime';

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
              <TimelineDot className='bg-purple-400! text-xl text-white md:text-3xl'>
                <MdWork />
              </TimelineDot>
              <TimelineConnector className='bg-purple-200!' />
            </TimelineSeparator>

            <TimelineContent className='px-4 py-2'>
              {j === 0 && <div className='text-lg font-bold! text-purple-400'>{content?.companies[i]?.company}</div>}

              <div className='flex w-full items-start justify-between gap-3 text-lg font-semibold! text-purple-300'>
                <span>{prefix?.title}</span>
                <span className='ml-auto text-right'>{prefix?.team}</span>
              </div>

              <div className='text-base text-pink-400'>
                {prefix?.start_date} - {prefix?.end_date}
              </div>
              {prefix?.description && <p className='text-muted mt-2'>{prefix?.description}</p>}
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
        <article key={key} className='rounded-lg bg-pink-100 p-4 shadow dark:bg-purple-700'>
          <h3 className='font-subheading text-xl! font-bold! text-pink-400!'>{item?.qualification}</h3>
          <div className='text-lg font-semibold text-pink-300'>{item?.name}</div>
          <time className='mb-2 block text-base text-blue-300' dateTime={`${item?.start_date || ''}`}>
            {item?.start_date} {item?.end_date ? ' - ' + item?.end_date : ''}
          </time>
          {item?.description && item.description.length > 1 ? (
            <ul className='text-muted list-disc text-left text-base'>
              {item.description.map((i: string, idx: number) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          ) : (
            <p className='text-muted text-base'>{item.description[0]}</p>
          )}
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
          <h3 className='font-subheading text-xl! font-bold! text-blue-400!'>{cert?.name}</h3>
          <p className='text-lg font-semibold text-purple-300'>{cert?.certifier}</p>
          <time className='text-muted mt-2 block text-base' dateTime={`${cert?.date || ''}`}>
            {cert?.date}
          </time>
          {cert?.url && (
            <div className='mt-3'>
              <a
                href={cert?.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block w-full rounded border-2 border-pink-500 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-pink-500! hover:transform-none! hover:bg-pink-500! hover:text-white! sm:w-fit'>
                {t('certifications.viewCert')}
              </a>
            </div>
          )}
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
