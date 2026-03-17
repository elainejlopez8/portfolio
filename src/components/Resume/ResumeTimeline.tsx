import { ResumeCategories } from '@/types';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';
import { Typography } from '@mui/material';
import kebabCase from 'lodash/kebabCase';
import { Button } from 'react-bootstrap';
import { MdSchool, MdWork } from 'react-icons/md';
import { PiCertificateBold } from 'react-icons/pi';

interface ResumeTimelineProps {
  details: string;
  category?: ResumeCategories;
}

export default function ResumeTimeline({ details, category }: ResumeTimelineProps) {
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
            key={`${content?.companies[i]?.company ?? 'company'}-${prefix?.title ?? 'role'}-${prefix?.start_date ?? ''}-${prefix?.end_date ?? ''}-${i}-${j}`}
          >
            <TimelineSeparator>
              <TimelineDot color='primary' className='text-xl md:text-2xl lg:text-3xl'>
                <MdWork />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: '20px' }}>
              <a href={`/resume/${kebabCase(ResumeCategories.employmentHistory)}/${kebabCase(prefix?.title)}`}>
                <Typography component='span' className='text-blue-400'>
                  {prefix?.title} <span className='text-right'>{prefix?.team}</span>
                </Typography>

                <Typography className='font-bold text-blue-300'>{content?.companies[i]?.company}</Typography>
                <Typography className='text-base text-pink-300 md:text-lg lg:text-xl'>
                  {prefix?.start_date} - {prefix?.end_date}
                </Typography>
              </a>
              <Typography className='mt-2 hidden text-base whitespace-pre-line sm:flex md:text-lg lg:text-xl'>
                {prefix?.description}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      }
  }

  if (isEducation) {
    for (let i = 0; i < content?.length; i++)
      items.push(
        <TimelineItem
          key={`${content[i]?.qualification}-${content[i]?.start_date}-${content[i]?.end_date}-${i}`}
        >
          <TimelineSeparator>
            <TimelineDot color='secondary' className='text-xl md:text-2xl lg:text-3xl'>
              <MdSchool />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: '20px' }}>
            <a href={`/resume/${ResumeCategories.education}/${kebabCase(content[i]?.qualification)}`}>
              <Typography component='span' className='text-xl font-black text-blue-400 md:text-2xl lg:text-3xl'>
                {content[i]?.qualification}
              </Typography>
              <Typography className='text:lg font-bold text-blue-300 md:text-xl lg:text-2xl'>
                {content[i]?.name}
              </Typography>
              <Typography className='text-base text-pink-300 md:text-lg lg:text-xl'>
                {content[i]?.start_date} - {content[i]?.end_date}
              </Typography>
            </a>
            <Typography className='mt-2 hidden text-base whitespace-pre-line sm:flex md:text-lg lg:text-xl'>
              {content[i]?.description}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      );
  }

  if (isCertification) {
    for (let i = 0; i < content?.certs?.length; i++)
      items.push(
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color='grey' className='text-xl md:text-2xl lg:text-3xl'>
              <PiCertificateBold />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: '20px' }}>
            <a href={`/resume/${ResumeCategories.certifications}/${kebabCase(content?.certs[i]?.name)}`}>
              <Typography component='span' className='text-xl font-black text-blue-400 md:text-2xl lg:text-3xl'>
                {content?.certs[i]?.name}
              </Typography>
              <Typography className='text:lg font-bold text-blue-300 md:text-xl lg:text-2xl'>
                {content?.certs[i]?.certifier}
              </Typography>
              <Typography className='text-base text-pink-300 md:text-lg lg:text-xl'>
                {content?.certs[i]?.date}
              </Typography>
            </a>
            {content?.certs[i]?.description && (
              <Typography className='mt-2 hidden text-base whitespace-pre-line sm:flex md:text-lg lg:text-xl'>
                {content?.certs[i]?.description}
              </Typography>
            )}
            {content?.certs[i]?.url && (
              <Typography className='mt-2 whitespace-pre-line'>
                <Button
                  href={content?.certs[i]?.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn text-sm!'>
                  {content?.viewCert}
                </Button>
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      );
  }

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
      className='md:mx-auto md:w-4/5'>
      {...items}
    </Timeline>
  );
}
