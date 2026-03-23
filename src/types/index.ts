import type { ReactNode } from 'react';

export type PageLayoutContextProps = {
  setLoaded: (loaded: boolean) => void;
  loaded: boolean;
  initialised: boolean;
};

export type MarkdownProps = {
  source: string | null | undefined;
};

export type PageProps = {
  sectionId?: string;
  title?: string;
};

export enum ResumeCategories {
  employmentHistory = 'employmentHistory',
  education = 'education',
  certifications = 'certifications',
}

export type Repo = {
  completed?: boolean;
  description?: string | null;
  id: number | string;
  language?: string | null;
  name: string;
  prod_url?: string | null;
  repo_url?: string | null;
  topics?: string[];
  updated_at?: string;
};

export type CodePenProject = {
  url: string;
  title: string;
  description: string;
};

export type CodePenApiItem = {
  link?: string;
  pen_link?: string;
  url?: string;
  title?: string;
  slug?: string;
  name?: string;
  description?: string;
};

export type ProjectCardVariant = 'archived' | 'wip' | 'completed';

export type ProjectCardProps = {
  r: Repo;
  variant?: ProjectCardVariant;
};

export type PageLayoutProps = {
  children: ReactNode;
  showHeaderFooter?: boolean;
  onlyShowChildren?: boolean;
};

export type ResumeSectionProps = {
  category: ResumeCategories;
  useH1?: boolean;
};

export type ResumeTimelineProps = {
  details: string;
  category?: ResumeCategories;
};

export type Role = {
  title: string;
  team?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

export type Company = {
  company: string;
  roles: Role[];
};

export type EmploymentContent = {
  companies: Company[];
};

export type Education = {
  name: string;
  qualification?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

export type Certification = {
  name: string;
  certifier?: string;
  date?: string;
  url?: string;
  description?: string;
};

export type Certifications = {
  viewCert?: string;
  certs: Certification[];
};
