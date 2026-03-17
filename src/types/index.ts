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
