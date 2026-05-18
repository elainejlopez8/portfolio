export type NavLink = {
  href: string;
  label: string;
};

export type FooterUrl = {
  href: string;
  icon?: string;
  alt?: string;
};

export type GeneralContent = {
  id?: string;
  name: string;
  helloWorld: string;
  learnMore: string;
  navLinks: NavLink[];
  header: {
    experience: string;
    web: { text: string; icons: string[] };
    design: { text: string; icons: string[] };
  };
  footer: {
    text: string;
    urls: FooterUrl[];
  };
};

export type BlurbEntry = {
  command: string;
  output: string;
};

export type AboutMeContent = {
  id?: string;
  name: string;
  subtitle: string;
  viewPortfolio: string;
  profession: string;
  tagline: string;
  terminalTab: string;
  terminalPrefix: string;
  terminalCommand1: string;
  terminalCommand2: string;
  blurb: BlurbEntry[];
  short_blurb: string;
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

export type ResumeContentData = {
  id?: string;
  resumeError: string;
  tabs: {
    employmentHistory: string;
    education: string;
    certifications: string;
  };
  downloadResume: {
    text: string;
    icon: string;
    url: string;
  };
  employmentHistory: {
    companies: Company[];
  };
  education: Education[];
  certifications: {
    viewCert?: string;
    certs: Certification[];
  };
};

export type ProjectLabels = {
  id?: string;
  title: string;
  wip: string;
  noCompleted: string;
  completed: string;
  viewProduct: string;
  loading: string;
  noProjects: string;
  noWip: string;
  goToRepo: string;
  error: string;
  all: string;
  liveSite: string;
};
