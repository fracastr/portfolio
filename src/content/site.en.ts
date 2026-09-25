import type { SiteContent } from "./types";

export const en: SiteContent = {
  locale: "en",
  sections: {
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    education: "Education & Certifications",
    contact: "Contact",
  },
  profile: {
    name: "Francisco Castro",
    title: "Senior Full Stack Software Engineer",
    location: "Los Ángeles, Chile · Remote",
    email: "fr.castr@gmail.com",
    linkedin: "https://linkedin.com/in/fracastr",
    availability: "Actively looking, available immediately",
    languages: ["Spanish (Native)", "English (Upper-Intermediate, B2)"],
  },
  about:
    "I'm a full-stack software engineer with 7+ years of experience shipping web applications, REST APIs, and cloud systems across gaming, fintech, and e-government. My core stack is PHP/Laravel, JavaScript/TypeScript (React, Vue), Node.js, and Python, backed by AWS and GCP. I move fast across unfamiliar domains, take ownership of features end-to-end in distributed remote teams, and I'm currently deepening into AI-driven optimization and decision-support software while keeping my full-stack range.",
  projects: [
    {
      id: "opturion",
      company: "Opturion",
      role: "Software Engineer",
      period: "Apr – May 2026",
      context:
        "Opturion builds AI-driven optimization and decision-support software for logistics, transportation, and workforce planning. I joined their engineering team to ship features for intelligent scheduling and planning tools.",
      stack: ["PHP", "JavaScript", "AI decision-support"],
      achievements: [
        "Developed and delivered features for an AI-driven optimization and decision-support platform used in logistics and workforce planning.",
        "Collaborated directly with engineers, researchers, and clients to design tailored enterprise scheduling solutions.",
      ],
    },
    {
      id: "valio",
      company: "Valio",
      role: "Full Stack Software Engineer",
      period: "Jun 2025 – Feb 2026",
      context:
        "Valio delivers custom software for public-sector clients, where requirements are strict and compliance is non-negotiable.",
      stack: ["PHP (Laravel)", "React.js", "SQL Server"],
      achievements: [
        "Designed and delivered custom software solutions for public-sector clients using PHP (Laravel), React.js, and SQL Server.",
        "Integrated third-party APIs to meet strict government requirements.",
        "Ensured code quality and adherence to project specifications in a regulated environment.",
      ],
    },
    {
      id: "sciplay",
      company: "Sciplay (via Amber Studios)",
      role: "Senior Full Stack Software Engineer",
      period: "2022 – 2025",
      context:
        "Sciplay runs high-traffic gaming platforms. Working with a US-based engineering team out of Austin, TX, I owned backend services that needed to hold up under heavy concurrent load.",
      stack: ["PHP", "Docker", "Couchbase", "JavaScript"],
      achievements: [
        "Designed and maintained scalable backend services for high-traffic gaming platforms.",
        "Built and optimized server-side solutions with PHP, Docker, Couchbase, and JavaScript, improving system reliability and performance.",
        "Delivered consistently within a distributed, bilingual, agile team in a remote-first environment.",
      ],
    },
    {
      id: "sondek",
      company: "Sondek (CMP Group projects)",
      role: "Full Stack Software Engineer",
      period: "2022 – 2024",
      context:
        "Sondek needed metallurgical balance management systems for CMP Group's client projects — data-heavy tools tying together cloud storage and internal workflows.",
      stack: ["Python", "PHP", "Vue.js", "Node.js", "AWS"],
      achievements: [
        "Architected and built metallurgical balance management systems using Python, PHP, Vue.js, and Node.js.",
        "Integrated Google Drive APIs and AWS cloud infrastructure to streamline data workflows.",
        "Contributed to system design decisions and technical documentation across multiple client projects.",
      ],
    },
  ],
  experience: [
    { title: "Software Engineer", company: "Opturion", period: "Apr 2026 – May 2026", location: "Chile (Remote)" },
    { title: "Senior / Full Stack Software Engineer", company: "Passline", period: "Feb 2026 – Apr 2026", location: "Chile (Remote)" },
    { title: "Full Stack Software Engineer", company: "Valio", period: "Jun 2025 – Feb 2026", location: "Chile (Remote)" },
    { title: "Senior Full Stack Software Engineer", company: "Sciplay (via Amber Studios)", period: "2022 – 2025", location: "Austin, TX (Remote)" },
    { title: "Full Stack Software Engineer", company: "Sondek (CMP Group projects)", period: "2022 – 2024", location: "Chile" },
    { title: "Software Developer", company: "Gisma", period: "2021 – 2022", location: "Santiago, Chile" },
    { title: "Backend Developer", company: "RedCapital", period: "2020 – 2021", location: "Santiago, Chile" },
    { title: "Senior System & Software Developer", company: "Inpact", period: "2019 – 2020", location: "Santiago, Chile" },
  ],
  skills: [
    { label: "Primary", items: ["PHP (Laravel)", "JavaScript/TypeScript", "React", "Vue.js", "Angular", "Node.js", "Python", "REST APIs"] },
    { label: "Secondary", items: [".NET C#", "SQL Server", "PostgreSQL", "Couchbase", "Jenkins/CI-CD"] },
    { label: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "Git", "Linux", "Bash"] },
  ],
  education: {
    degree: "Computer Science Engineering",
    institution: "Universidad del Bío-Bío",
    location: "Concepción, Chile",
    certifications: [
      "Mobile App Development — Complutense University of Madrid",
      "Linux Server Management — Universidad del Bío-Bío",
      "Web Systems Development with PHP (Laravel)",
      "Arduino Programming — Universidad del Bío-Bío",
    ],
  },
};
