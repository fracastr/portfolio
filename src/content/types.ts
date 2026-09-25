export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  availability: string;
  languages: string[];
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
  projects: string;
  experience: string;
  skills: string;
  education: string;
  contact: string;
}

export interface SiteContent {
  locale: "en" | "es";
  sections: SectionLabels;
  profile: Profile;
  about: string;
  projects: ProjectEntry[];
  experience: ExperienceEntry[];
  skills: SkillGroup[];
  education: EducationBlock;
}
