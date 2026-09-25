import type { SiteContent } from "./types";

export const es: SiteContent = {
  locale: "es",
  sections: {
    projects: "Proyectos",
    experience: "Experiencia",
    skills: "Habilidades",
    education: "Educación y Certificaciones",
    contact: "Contacto",
  },
  profile: {
    name: "Francisco Castro",
    title: "Senior Full Stack Software Engineer",
    location: "Los Ángeles, Chile · Remoto",
    email: "fr.castr@gmail.com",
    linkedin: "https://linkedin.com/in/fracastr",
    availability: "Buscando activamente, disponible de inmediato",
    languages: ["Español (Nativo)", "Inglés (Intermedio-Alto, B2)"],
  },
  about:
    "Soy ingeniero de software full-stack con más de 7 años de experiencia entregando aplicaciones web, APIs REST y sistemas cloud en los sectores de gaming, fintech y gobierno electrónico. Mi stack principal es PHP/Laravel, JavaScript/TypeScript (React, Vue), Node.js y Python, con AWS y GCP como infraestructura. Me adapto rápido a dominios desconocidos, tomo ownership de las funcionalidades de punta a punta en equipos remotos distribuidos, y actualmente estoy profundizando en software de optimización y soporte de decisiones basado en IA sin perder mi versatilidad full-stack.",
  projects: [
    {
      id: "opturion",
      company: "Opturion",
      role: "Software Engineer",
      period: "Abr – May 2026",
      context:
        "Opturion desarrolla software de optimización y soporte de decisiones basado en IA para logística, transporte y planificación de personal. Me sumé al equipo de ingeniería para construir funcionalidades de scheduling y planificación inteligente.",
      stack: ["PHP", "JavaScript", "IA / soporte de decisiones"],
      achievements: [
        "Desarrollé y entregué funcionalidades para una plataforma de optimización y soporte de decisiones basada en IA, usada en logística y planificación de personal.",
        "Colaboré directamente con ingenieros, investigadores y clientes en el diseño de soluciones de scheduling empresarial a medida.",
      ],
    },
    {
      id: "sciplay",
      company: "Sciplay (vía Amber Studios)",
      role: "Senior Full Stack Software Engineer",
      period: "2022 – 2025",
      context:
        "Sciplay opera plataformas de gaming de alto tráfico. Trabajando con un equipo de ingeniería en Austin, TX, tuve a cargo servicios backend que debían soportar carga concurrente alta.",
      stack: ["PHP", "Docker", "Couchbase", "JavaScript"],
      achievements: [
        "Diseñé y mantuve servicios backend escalables para plataformas de gaming de alto tráfico.",
        "Construí y optimicé soluciones server-side con PHP, Docker, Couchbase y JavaScript, mejorando la confiabilidad y el rendimiento del sistema.",
        "Entregué resultados de forma consistente en un equipo ágil, bilingüe y distribuido, en un entorno remote-first.",
      ],
    },
    {
      id: "sondek",
      company: "Sondek (proyectos CMP Group)",
      role: "Full Stack Software Engineer",
      period: "2022 – 2024",
      context:
        "Sondek necesitaba sistemas de gestión de balance metalúrgico para los proyectos de CMP Group — herramientas intensivas en datos que conectaban almacenamiento en la nube con flujos de trabajo internos.",
      stack: ["Python", "PHP", "Vue.js", "Node.js", "AWS"],
      achievements: [
        "Diseñé y construí sistemas de gestión de balance metalúrgico usando Python, PHP, Vue.js y Node.js.",
        "Integré APIs de Google Drive e infraestructura cloud de AWS para optimizar flujos de datos.",
        "Contribuí a decisiones de diseño de sistema y documentación técnica en múltiples proyectos de clientes.",
      ],
    },
    {
      id: "valio",
      company: "Valio",
      role: "Full Stack Software Engineer",
      period: "Jun 2025 – Feb 2026",
      context:
        "Valio entrega software a medida para clientes del sector público, donde los requisitos son estrictos y el cumplimiento normativo no es negociable.",
      stack: ["PHP (Laravel)", "React.js", "SQL Server"],
      achievements: [
        "Diseñé y entregué soluciones de software a medida para clientes del sector público usando PHP (Laravel), React.js y SQL Server.",
        "Integré APIs de terceros para cumplir con requisitos gubernamentales estrictos.",
        "Aseguré la calidad de código y el cumplimiento de las especificaciones del proyecto en un entorno regulado.",
      ],
    },
  ],
  experience: [
    { title: "Software Engineer", company: "Opturion", period: "Abr 2026 – May 2026", location: "Chile (Remoto)" },
    { title: "Senior / Full Stack Software Engineer", company: "Passline", period: "Feb 2026 – Abr 2026", location: "Chile (Remoto)" },
    { title: "Full Stack Software Engineer", company: "Valio", period: "Jun 2025 – Feb 2026", location: "Chile (Remoto)" },
    { title: "Senior Full Stack Software Engineer", company: "Sciplay (vía Amber Studios)", period: "2022 – 2025", location: "Austin, TX (Remoto)" },
    { title: "Full Stack Software Engineer", company: "Sondek (proyectos CMP Group)", period: "2022 – 2024", location: "Chile" },
    { title: "Desarrollador de Software", company: "Gisma", period: "2021 – 2022", location: "Santiago, Chile" },
    { title: "Desarrollador Backend", company: "RedCapital", period: "2020 – 2021", location: "Santiago, Chile" },
    { title: "Senior System & Software Developer", company: "Inpact", period: "2019 – 2020", location: "Santiago, Chile" },
  ],
  skills: [
    { label: "Principal", items: ["PHP (Laravel)", "JavaScript/TypeScript", "React", "Vue.js", "Angular", "Node.js", "Python", "REST APIs"] },
    { label: "Secundario", items: [".NET C#", "SQL Server", "PostgreSQL", "Couchbase", "Jenkins/CI-CD"] },
    { label: "Cloud y DevOps", items: ["AWS", "GCP", "Docker", "Git", "Linux", "Bash"] },
  ],
  education: {
    degree: "Ingeniería Civil en Informática",
    institution: "Universidad del Bío-Bío",
    location: "Concepción, Chile",
    certifications: [
      "Desarrollo de Aplicaciones Móviles — Universidad Complutense de Madrid",
      "Administración de Servidores Linux — Universidad del Bío-Bío",
      "Desarrollo de Sistemas Web con PHP (Laravel)",
      "Programación en Arduino — Universidad del Bío-Bío",
    ],
  },
};
