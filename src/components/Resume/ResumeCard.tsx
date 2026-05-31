'use client';

import type { ResumeContentData } from '@/payload/types';
import {
  ResumeCategories,
  type Certification,
  type Certifications,
  type Education,
  type EmploymentContent,
  type Role,
} from '@/types';
import { camelCase, kebabCase } from 'lodash';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { MdArrowBackIosNew } from 'react-icons/md';
import { JSX } from 'react/jsx-runtime';

type Props = { resumeContent: ResumeContentData };

function ResumeCard({ resumeContent }: Props): JSX.Element | null {
  const params = useParams<{ resumeCategory?: string; resumeItem?: string }>();
  const resumeCategory = params?.resumeCategory;
  const resumeItem = params?.resumeItem;
  const category = camelCase(resumeCategory ?? '') as ResumeCategories;
  const itemKey = kebabCase(resumeItem ?? '');

  const sectionContent =
    category === ResumeCategories.employmentHistory
      ? resumeContent.employmentHistory
      : category === ResumeCategories.education
        ? resumeContent.education
        : category === ResumeCategories.certifications
          ? resumeContent.certifications
          : null;

  type Item = Role & { company?: string } & Partial<Education> & Partial<Certification> & Record<string, unknown>;

  let item: Item = {} as Item;

  if (category === ResumeCategories.employmentHistory) {
    const companies = (sectionContent as EmploymentContent)?.companies ?? [];
    for (const company of companies) {
      const match = (company.roles ?? []).find((r) => r.title === itemKey || kebabCase(r.title) === kebabCase(itemKey));
      if (match) {
        item = { ...match, company: company.company } as Item;
        break;
      }
    }
  } else if (category === ResumeCategories.education) {
    const education = sectionContent as Education[];
    item = (education ?? []).find((e) => e.name === itemKey || kebabCase(e.name) === kebabCase(itemKey)) as Item;
    if (!item) item = {} as Item;
  } else if (category === ResumeCategories.certifications) {
    const certs = (sectionContent as Certifications)?.certs ?? [];
    item = (certs.find((c) => c.name === itemKey || kebabCase(c.name) === kebabCase(itemKey)) as Item) || ({} as Item);
  }

  const title = (item.title as string) || (item.name as string) || (item.school as string) || '';
  const subtitle = (item.company as string) || (item.certifier as string) || (item.qualification as string) || '';
  const start = (item.start_date as string) || '';
  const end = (item.end_date as string) || '';
  const date = start || end ? start + (end ? ' - ' + end : '') : (item.date as string) || '';
  const description = (item.description as string) || '';
  const team = (item.team as string) || '';

  if (!title && !subtitle && !date && !description && !team) return null;

  return (
    <Container fluid='lg' className='flex flex-col gap-y-5'>
      <h1 className='text-6xl uppercase md:text-7xl'>
        <Link href={`/resume/${resumeCategory}`} className='no-underline'>
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
