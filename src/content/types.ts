export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  availability: string;
  languages: string[];
}

export interface HeroCopy {
  eyebrow: string;
  /** Headline split around the one emphasized phrase. */
  before: string;
  emphasis: string;
  after: string;
  lede: string;
  primaryCta: string;
  secondaryCta: string;
  photoAlt: string;
  photoCaption: string;
}

/** A product or client site Francisco designed and built. */
export interface BuildEntry {
  id: string;
  name: string;
  kind: string;
  domain?: string;
  url?: string;
  description: string;
  stack: string[];
  /** File under public/images/work/, or undefined for a typographic card. */
  image?: string;
  imageAlt: string;
}

export interface ProjectEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  context: string;
  stack: string[];
  achievements: string[];
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  location: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface EducationBlock {
  degree: string;
  institution: string;
  location: string;
  certifications: string[];
}

export interface SectionLabels {
  builds: string;
  buildsNote: string;
  projects: string;
  projectsNote: string;
  experience: string;
  howIWork: string;
  skills: string;
  education: string;
  contact: string;
  contactHeading: string;
  contactEmphasis: string;
}

export interface SiteContent {
  locale: "en" | "es";
  sections: SectionLabels;
  profile: Profile;
  hero: HeroCopy;
  about: string;
  workNotes: string[];
  builds: BuildEntry[];
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  education: EducationBlock;
}
