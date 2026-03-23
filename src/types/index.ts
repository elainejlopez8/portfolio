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
  description?: string;
  id: number | string;
  language?: string;
  name: string;
  prod_url?: string;
  repo_url?: string;
  topics?: string[];
  updated_at?: string;
};
