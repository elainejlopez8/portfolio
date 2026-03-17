import { useContent } from '@/hooks/useContent';
import { kebabCase, startCase } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { ResumeCategories } from '@/types';
import ResumeTimeline from './ResumeTimeline';

type Role = {
  title: string;
  team?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

type Company = {
  company: string;
  roles: Role[];
};

type EmploymentContent = {
  companies: Company[];
};

type Education = {
  name: string;
  qualification?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

type Certification = {
  name: string;
  certifier?: string;
  date?: string;
  url?: string;
  description?: string;
};

type Certifications = {
  viewCert?: string;
  certs: Certification[];
};

export const useCreateResumeTimeline = (category: ResumeCategories) => {
  const { t } = useContent('resume');
  const [title, setTitle] = useState('');
  const [categoryItems, setCategoryItems] = useState(<></>);

  useEffect(() => {}, []);

  const createTimelineSection = useCallback(() => {
    return <ResumeTimeline details={JSON.stringify(t(category, { returnObjects: true }))} category={category} />;
  }, [category, t]);

  useEffect(() => {
    setTitle(startCase(category));
    setCategoryItems(createTimelineSection());
  }, [category, createTimelineSection]);

  return { title, categoryItems };
};

export const useResumeContent = (category: ResumeCategories, resumeItem: string) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [team, setTeam] = useState('');
  const [url, setUrl] = useState('');
  const { t } = useContent('resume');

  useEffect(() => {
    const resumeContent = t(category, { returnObjects: true }) as
      | EmploymentContent
      | Education[]
      | Certifications
      | Record<string, unknown>;

    type Item = Role & { company?: string } & Partial<Education> & Partial<Certification> & Record<string, unknown>;

    let item: Item = {} as Item;

    if (category === ResumeCategories.employmentHistory) {
      const companies = (resumeContent as EmploymentContent)?.companies ?? [];
      for (const company of companies) {
        const match = (company.roles ?? []).find(
          (r) => r.title === resumeItem || kebabCase(r.title) === kebabCase(resumeItem)
        );
        if (match) {
          item = { ...match, company: company.company } as Item;
          break;
        }
      }
    } else if (category === ResumeCategories.education) {
      const education = resumeContent as Education[];
      item = (education ?? []).find(
        (e) => e.name === resumeItem || kebabCase(e.name) === kebabCase(resumeItem)
      ) as Item;
      if (!item) item = {} as Item;
    } else if (category === ResumeCategories.certifications) {
      const certs = (resumeContent as Certifications)?.certs ?? [];
      item =
        (certs.find((c) => c.name === resumeItem || kebabCase(c.name) === kebabCase(resumeItem)) as Item) ||
        ({} as Item);
    } else {
      const rc = resumeContent as Record<string, unknown>;
      const direct = rc[resumeItem] ?? rc[kebabCase(resumeItem)];
      item = (direct as Item) || ({} as Item);
    }

    setTitle((item.title as string) || (item.name as string) || (item.school as string) || '');
    setSubtitle((item.company as string) || (item.certifier as string) || (item.qualification as string) || '');
    const start = (item.start_date as string) || '';
    const end = (item.end_date as string) || '';
    if (start || end) {
      setDate(start + (end ? ' - ' + end : ''));
    } else {
      setDate((item.date as string) || '');
    }
    setDescription((item.description as string) || '');
    setTeam((item.team as string) || '');
    setUrl((item.url as string) || '');
  }, [category, resumeItem, t]);

  return { title, subtitle, description, date, team, url };
};
