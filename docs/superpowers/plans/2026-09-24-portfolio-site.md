# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bilingual (EN/ES) static portfolio site for Francisco Castro, matching the approved design spec.

**Architecture:** Astro static site (TypeScript), plain component-scoped CSS, two locale pages (`/` English default, `/es/` Spanish) sharing typed content data modules. Deployed via GitHub Actions to GitHub Pages.

**Tech Stack:** Astro, TypeScript, Vitest (unit tests for content/logic), plain CSS (no framework).

**Spec:** `docs/superpowers/specs/2026-09-24-portfolio-site-design.md`

## Global Constraints

- No backend, no CMS, no contact form — contact is `mailto:` + LinkedIn links only.
- No fabricated metrics or claims — every experience/project bullet must trace back to the candidate profile (`CLAUDE.md` in the `ai-job-search` repo) or the CV PDFs.
- Single sans-serif system font stack (`-apple-system, "Segoe UI", Inter, sans-serif`) — no external font dependency.
- Content max-width ~720px, single centered column.
- Light background `#fafafa` / dark `#111111` via `prefers-color-scheme` — no manual toggle.
- Bilingual: English at `/`, Spanish at `/es/`.
- Deploy target: GitHub Pages via GitHub Actions on push to `main`.

---

## File Structure

```
portfolio/
  package.json
  tsconfig.json
  astro.config.mjs
  vitest.config.ts
  src/
    content/
      types.ts
      site.en.ts
      site.es.ts
      site.test.ts
    lib/
      locale.ts
      locale.test.ts
    scripts/
      reveal.ts
    styles/
      global.css
    layouts/
      BaseLayout.astro
    components/
      Header.astro
      Hero.astro
      About.astro
      ProjectCard.astro
      Projects.astro
      ExperienceTimeline.astro
      Skills.astro
      Education.astro
      Footer.astro
    pages/
      index.astro
      es/
        index.astro
  .github/
    workflows/
      deploy.yml
  README.md
```

---

### Task 1: Project scaffold and tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `astro.config.mjs`, `vitest.config.ts`, `.gitignore`
- Create (scaffold default, overwritten in Task 9): `src/pages/index.astro`

**Interfaces:**
- Produces: a working Astro project where `npm run build` and `npm run test` both succeed, which every later task builds on.

- [ ] **Step 1: Scaffold the Astro project**

Run inside `/Users/franciscocastro/Documents/projects/portfolio` (already git-initialized):

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

If it falls back to interactive prompts instead of honoring the flags, answer: template **Empty**, TypeScript **Strict**, install dependencies **Yes**, initialize git repository **No** (a repo already exists here).

- [ ] **Step 2: Add Vitest**

```bash
npm install --save-dev vitest
```

- [ ] **Step 3: Add the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 4: Add the `test` script**

Edit `package.json` `scripts` to include:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 5: Verify the baseline build**

Run: `npm run build`
Expected: build succeeds, `dist/index.html` exists (from Astro's default scaffold page — this gets replaced in Task 9).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with Vitest"
```

---

### Task 2: Content data model and locale-path helper (TDD)

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/site.en.ts`
- Create: `src/content/site.es.ts`
- Create: `src/content/site.test.ts`
- Create: `src/lib/locale.ts`
- Create: `src/lib/locale.test.ts`

**Interfaces:**
- Produces: `getAlternateLocalePath(pathname: string): string`; `en: SiteContent` and `es: SiteContent` from `site.en.ts`/`site.es.ts`; the `SiteContent`, `SectionLabels`, `ProjectEntry`, `ExperienceEntry`, `SkillGroup`, `EducationBlock`, `Profile` types from `types.ts`. Every later component task imports these.
- Consumes: nothing (this is the foundational content layer).

- [ ] **Step 1: Write the failing locale-path test**

Create `src/lib/locale.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getAlternateLocalePath } from "./locale";

describe("getAlternateLocalePath", () => {
  it("switches from the English root to the Spanish root", () => {
    expect(getAlternateLocalePath("/")).toBe("/es/");
  });

  it("switches from the Spanish root to the English root", () => {
    expect(getAlternateLocalePath("/es/")).toBe("/");
  });

  it("treats /es without a trailing slash as Spanish", () => {
    expect(getAlternateLocalePath("/es")).toBe("/");
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm run test -- locale.test.ts`
Expected: FAIL — `locale.ts` does not exist yet.

- [ ] **Step 3: Implement the helper**

Create `src/lib/locale.ts`:

```ts
export function getAlternateLocalePath(pathname: string): string {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return "/";
  }
  return "/es/";
}
```

- [ ] **Step 4: Run it to confirm it passes**

Run: `npm run test -- locale.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the content types**

Create `src/content/types.ts`:

```ts
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
```

- [ ] **Step 6: Write the failing content-shape test**

Create `src/content/site.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { en } from "./site.en";
import { es } from "./site.es";
import type { SiteContent } from "./types";

function assertContentShape(site: SiteContent) {
  expect(site.profile.name).not.toBe("");
  expect(site.profile.email).toContain("@");
  expect(site.profile.linkedin).toContain("linkedin.com");
  expect(site.about.length).toBeGreaterThan(0);
  expect(site.projects.length).toBe(4);
  for (const project of site.projects) {
    expect(project.company).not.toBe("");
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.achievements.length).toBeGreaterThan(0);
  }
  expect(site.experience.length).toBe(8);
  expect(site.skills.length).toBe(3);
  expect(site.education.certifications.length).toBe(4);
}

describe("site content", () => {
  it("English content has the expected shape", () => {
    assertContentShape(en);
  });

  it("Spanish content has the expected shape", () => {
    assertContentShape(es);
  });

  it("English and Spanish have matching entry counts", () => {
    expect(en.projects.length).toBe(es.projects.length);
    expect(en.experience.length).toBe(es.experience.length);
    expect(en.skills.length).toBe(es.skills.length);
  });
});
```

- [ ] **Step 7: Run it to confirm it fails**

Run: `npm run test -- site.test.ts`
Expected: FAIL — `site.en.ts` / `site.es.ts` do not exist yet.

- [ ] **Step 8: Write the English content**

Create `src/content/site.en.ts`:

```ts
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
      period: "2026",
      context:
        "Opturion builds AI-driven optimization and decision-support software for logistics, transportation, and workforce planning. I joined their engineering team to ship features for intelligent scheduling and planning tools.",
      stack: ["PHP", "JavaScript", "AI decision-support"],
      achievements: [
        "Developed and delivered features for an AI-driven optimization and decision-support platform used in logistics and workforce planning.",
        "Collaborated directly with engineers, researchers, and clients to design tailored enterprise scheduling solutions.",
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
    {
      id: "valio",
      company: "Valio",
      role: "Full Stack Software Engineer",
      period: "2025",
      context:
        "Valio delivers custom software for public-sector clients, where requirements are strict and compliance is non-negotiable.",
      stack: ["PHP (Laravel)", "React.js", "SQL Server"],
      achievements: [
        "Designed and delivered custom software solutions for public-sector clients using PHP (Laravel), React.js, and SQL Server.",
        "Integrated third-party APIs to meet strict government requirements.",
        "Ensured code quality and adherence to project specifications in a regulated environment.",
      ],
    },
  ],
  experience: [
    { title: "Software Engineer", company: "Opturion", period: "Jan 2026 – May 2026", location: "Chile (Remote)" },
    { title: "Senior / Full Stack Software Engineer", company: "Passline", period: "2025", location: "Chile" },
    { title: "Full Stack Software Engineer", company: "Valio", period: "2025", location: "Chile" },
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
    degree: "B.S. in Computer Science Engineering",
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
```

- [ ] **Step 9: Write the Spanish content**

Create `src/content/site.es.ts`:

```ts
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
      period: "2026",
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
      period: "2025",
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
    { title: "Software Engineer", company: "Opturion", period: "Ene 2026 – May 2026", location: "Chile (Remoto)" },
    { title: "Senior / Full Stack Software Engineer", company: "Passline", period: "2025", location: "Chile" },
    { title: "Full Stack Software Engineer", company: "Valio", period: "2025", location: "Chile" },
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
```

- [ ] **Step 10: Run all tests to confirm they pass**

Run: `npm run test`
Expected: PASS (locale tests + content-shape tests, 6 tests total).

- [ ] **Step 11: Commit**

```bash
git add src/content src/lib
git commit -m "feat: add typed bilingual content model and locale-path helper"
```

---

### Task 3: Base layout and global styles

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Consumes: nothing new.
- Produces: `BaseLayout` component with `Props: { title: string; lang: "en" | "es" }`, imported by every page in Task 9. CSS variables (`--bg`, `--text`, `--text-muted`, `--accent`, `--border`, `--font-sans`, `--font-mono`, `--max-width`) and the `.container`, `.tag`, `[data-reveal]` classes that every component in Tasks 4–8 relies on.

- [ ] **Step 1: Write the global stylesheet**

Create `src/styles/global.css`:

```css
:root {
  --bg: #fafafa;
  --text: #1a1a1a;
  --text-muted: #555555;
  --accent: #1d4ed8;
  --border: #e2e2e2;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace;
  --max-width: 720px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111111;
    --text: #f2f2f2;
    --text-muted: #a8a8a8;
    --border: #2a2a2a;
  }
}

* {
  box-sizing: border-box;
}

html {
  color-scheme: light dark;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

a {
  color: var(--accent);
}

section {
  padding: 3rem 0;
  border-top: 1px solid var(--border);
}

section:first-of-type {
  border-top: none;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.15rem 0.5rem;
  color: var(--text-muted);
}

[data-reveal] {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    transition: none;
  }
}
```

- [ ] **Step 2: Write the base layout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";

interface Props {
  title: string;
  lang: "en" | "es";
}

const { title, lang } = Astro.props;
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
    <script src="../scripts/reveal.ts"></script>
  </body>
</html>
```

- [ ] **Step 3: Verify the build still succeeds**

Run: `npm run build`
Expected: build fails with a missing-module error for `../scripts/reveal.ts` (it doesn't exist yet) — this is expected since Task 10 creates it. To confirm the layout and CSS themselves are valid, temporarily comment out the `<script src="../scripts/reveal.ts">` line, run `npm run build`, confirm it succeeds, then restore the line before committing.

- [ ] **Step 4: Commit**

```bash
git add src/styles src/layouts
git commit -m "feat: add base layout and global styles"
```

---

### Task 4: Header component with locale toggle

**Files:**
- Create: `src/components/Header.astro`

**Interfaces:**
- Consumes: `getAlternateLocalePath` from `src/lib/locale.ts`, `SectionLabels` type from `src/content/types.ts`.
- Produces: `Header` component with `Props: { sections: SectionLabels; currentLocale: "en" | "es" }`, used in Task 9's pages.

- [ ] **Step 1: Write the component**

Create `src/components/Header.astro`:

```astro
---
import { getAlternateLocalePath } from "../lib/locale";
import type { SectionLabels } from "../content/types";

interface Props {
  sections: SectionLabels;
  currentLocale: "en" | "es";
}

const { sections, currentLocale } = Astro.props;
const alternatePath = getAlternateLocalePath(Astro.url.pathname);
const alternateLabel = currentLocale === "en" ? "ES" : "EN";
---

<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href={currentLocale === "en" ? "/" : "/es/"}>Francisco Castro</a>
    <nav>
      <a href="#projects">{sections.projects}</a>
      <a href="#experience">{sections.experience}</a>
      <a href="#contact">{sections.contact}</a>
      <a class="locale-toggle" href={alternatePath}>{alternateLabel}</a>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    background: var(--bg);
    border-bottom: 1px solid transparent;
    z-index: 10;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .site-header.scrolled {
    border-bottom-color: var(--border);
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 1rem;
  }

  .brand {
    color: var(--text);
    text-decoration: none;
    font-weight: 600;
  }

  nav {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  nav a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.9rem;
  }

  .locale-toggle {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.15rem 0.5rem;
    font-family: var(--font-mono);
    color: var(--text);
  }
</style>

<script>
  const header = document.querySelector(".site-header");
  addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", scrollY > 8);
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add header with locale toggle"
```

---

### Task 5: Hero and About components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/About.astro`

**Interfaces:**
- Consumes: nothing beyond primitive props.
- Produces: `Hero` (`Props: { name: string; title: string; location: string; availability: string }`) and `About` (`Props: { text: string }`), used in Task 9's pages.

- [ ] **Step 1: Write the Hero component**

Create `src/components/Hero.astro`:

```astro
---
interface Props {
  name: string;
  title: string;
  location: string;
  availability: string;
}

const { name, title, location, availability } = Astro.props;
---

<section class="hero container">
  <h1>{name}</h1>
  <p class="role">{title}</p>
  <p class="meta">{location} · {availability}</p>
</section>

<style>
  .hero {
    padding-top: 3rem;
    animation: fade-up 0.6s ease both;
  }

  h1 {
    font-size: 2.25rem;
    margin: 0 0 0.25rem;
  }

  .role {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin: 0 0 0.5rem;
  }

  .meta {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin: 0;
  }

  @keyframes fade-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero {
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: Write the About component**

Create `src/components/About.astro`:

```astro
---
interface Props {
  text: string;
}

const { text } = Astro.props;
---

<section class="about container" data-reveal>
  <p>{text}</p>
</section>

<style>
  .about p {
    font-size: 1.05rem;
    max-width: 60ch;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/components/About.astro
git commit -m "feat: add hero and about sections"
```

---

### Task 6: Project card and Projects section

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Projects.astro`

**Interfaces:**
- Consumes: `ProjectEntry` type from `src/content/types.ts`.
- Produces: `Projects` component with `Props: { heading: string; projects: ProjectEntry[] }`, used in Task 9's pages. `id="projects"` on the section, matching the Header's `#projects` link.

- [ ] **Step 1: Write the ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import type { ProjectEntry } from "../content/types";

interface Props {
  project: ProjectEntry;
}

const { project } = Astro.props;
---

<article class="project-card">
  <header>
    <h3>{project.company}</h3>
    <p class="role">{project.role} · {project.period}</p>
  </header>
  <p class="context">{project.context}</p>
  <ul class="achievements">
    {project.achievements.map((item) => <li>{item}</li>)}
  </ul>
  <div class="stack">
    {project.stack.map((tech) => <span class="tag">{tech}</span>)}
  </div>
</article>

<style>
  .project-card {
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1.25rem;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .project-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  h3 {
    margin: 0 0 0.15rem;
    font-size: 1.1rem;
  }

  .role {
    margin: 0 0 0.75rem;
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .context {
    font-size: 0.95rem;
  }

  .achievements {
    padding-left: 1.1rem;
    font-size: 0.9rem;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
</style>
```

- [ ] **Step 2: Write the Projects section**

Create `src/components/Projects.astro`:

```astro
---
import ProjectCard from "./ProjectCard.astro";
import type { ProjectEntry } from "../content/types";

interface Props {
  heading: string;
  projects: ProjectEntry[];
}

const { heading, projects } = Astro.props;
---

<section id="projects" class="container" data-reveal>
  <h2>{heading}</h2>
  <div class="grid">
    {projects.map((project) => <ProjectCard project={project} />)}
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.astro src/components/Projects.astro
git commit -m "feat: add featured projects section"
```

---

### Task 7: Experience timeline component

**Files:**
- Create: `src/components/ExperienceTimeline.astro`

**Interfaces:**
- Consumes: `ExperienceEntry` type from `src/content/types.ts`.
- Produces: `ExperienceTimeline` component with `Props: { heading: string; entries: ExperienceEntry[] }`, used in Task 9's pages. `id="experience"` on the section, matching the Header's `#experience` link.

- [ ] **Step 1: Write the component**

Create `src/components/ExperienceTimeline.astro`:

```astro
---
import type { ExperienceEntry } from "../content/types";

interface Props {
  heading: string;
  entries: ExperienceEntry[];
}

const { heading, entries } = Astro.props;
---

<section id="experience" class="container" data-reveal>
  <h2>{heading}</h2>
  <ol class="timeline">
    {entries.map((entry) => (
      <li>
        <div class="title-row">
          <span class="title">{entry.title}, {entry.company}</span>
          <span class="period">{entry.period}</span>
        </div>
        <div class="location">{entry.location}</div>
      </li>
    ))}
  </ol>
</section>

<style>
  .timeline {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .timeline li {
    border-bottom: 1px solid var(--border);
    padding-bottom: 1rem;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.95rem;
  }

  .period {
    color: var(--text-muted);
    white-space: nowrap;
  }

  .location {
    color: var(--text-muted);
    font-size: 0.85rem;
    margin-top: 0.15rem;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceTimeline.astro
git commit -m "feat: add experience timeline section"
```

---

### Task 8: Skills and Education components

**Files:**
- Create: `src/components/Skills.astro`
- Create: `src/components/Education.astro`

**Interfaces:**
- Consumes: `SkillGroup` and `EducationBlock` types from `src/content/types.ts`.
- Produces: `Skills` (`Props: { heading: string; groups: SkillGroup[] }`) and `Education` (`Props: { heading: string; education: EducationBlock }`), used in Task 9's pages.

- [ ] **Step 1: Write the Skills component**

Create `src/components/Skills.astro`:

```astro
---
import type { SkillGroup } from "../content/types";

interface Props {
  heading: string;
  groups: SkillGroup[];
}

const { heading, groups } = Astro.props;
---

<section class="container" data-reveal>
  <h2>{heading}</h2>
  <div class="skill-groups">
    {groups.map((group) => (
      <div class="skill-group">
        <h3>{group.label}</h3>
        <div class="items">
          {group.items.map((item) => <span class="tag">{item}</span>)}
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .skill-groups {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .skill-group h3 {
    font-size: 0.95rem;
    margin: 0 0 0.5rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
</style>
```

- [ ] **Step 2: Write the Education component**

Create `src/components/Education.astro`:

```astro
---
import type { EducationBlock } from "../content/types";

interface Props {
  heading: string;
  education: EducationBlock;
}

const { heading, education } = Astro.props;
---

<section class="container" data-reveal>
  <h2>{heading}</h2>
  <p class="degree">{education.degree} — {education.institution}, {education.location}</p>
  <ul class="certifications">
    {education.certifications.map((item) => <li>{item}</li>)}
  </ul>
</section>

<style>
  .degree {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .certifications {
    padding-left: 1.1rem;
    font-size: 0.9rem;
    color: var(--text-muted);
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.astro src/components/Education.astro
git commit -m "feat: add skills and education sections"
```

---

### Task 9: Footer and page assembly

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro` (replace Astro's scaffold default)
- Create: `src/pages/es/index.astro`

**Interfaces:**
- Consumes: every component from Tasks 3–8, plus `en`/`es` from `src/content/site.en.ts`/`site.es.ts`.
- Produces: the two live pages (`/`, `/es/`) that Task 11 deploys.

- [ ] **Step 1: Write the Footer component**

Create `src/components/Footer.astro`:

```astro
---
interface Props {
  email: string;
  linkedin: string;
  location: string;
  availability: string;
  contactHeading: string;
}

const { email, linkedin, location, availability, contactHeading } = Astro.props;
---

<footer id="contact" class="container">
  <h2>{contactHeading}</h2>
  <p><a href={`mailto:${email}`}>{email}</a></p>
  <p><a href={linkedin} target="_blank" rel="noreferrer">{linkedin.replace("https://", "")}</a></p>
  <p class="meta">{location} · {availability}</p>
</footer>

<style>
  footer {
    padding-bottom: 3rem;
  }

  .meta {
    color: var(--text-muted);
    font-size: 0.85rem;
  }
</style>
```

- [ ] **Step 2: Write the English page**

Replace the contents of `src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import About from "../components/About.astro";
import Projects from "../components/Projects.astro";
import ExperienceTimeline from "../components/ExperienceTimeline.astro";
import Skills from "../components/Skills.astro";
import Education from "../components/Education.astro";
import Footer from "../components/Footer.astro";
import { en } from "../content/site.en";
---

<BaseLayout title={`${en.profile.name} — ${en.profile.title}`} lang="en">
  <Header sections={en.sections} currentLocale="en" />
  <Hero
    name={en.profile.name}
    title={en.profile.title}
    location={en.profile.location}
    availability={en.profile.availability}
  />
  <About text={en.about} />
  <Projects heading={en.sections.projects} projects={en.projects} />
  <ExperienceTimeline heading={en.sections.experience} entries={en.experience} />
  <Skills heading={en.sections.skills} groups={en.skills} />
  <Education heading={en.sections.education} education={en.education} />
  <Footer
    email={en.profile.email}
    linkedin={en.profile.linkedin}
    location={en.profile.location}
    availability={en.profile.availability}
    contactHeading={en.sections.contact}
  />
</BaseLayout>
```

- [ ] **Step 3: Write the Spanish page**

Create `src/pages/es/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Hero from "../../components/Hero.astro";
import About from "../../components/About.astro";
import Projects from "../../components/Projects.astro";
import ExperienceTimeline from "../../components/ExperienceTimeline.astro";
import Skills from "../../components/Skills.astro";
import Education from "../../components/Education.astro";
import Footer from "../../components/Footer.astro";
import { es } from "../../content/site.es";
---

<BaseLayout title={`${es.profile.name} — ${es.profile.title}`} lang="es">
  <Header sections={es.sections} currentLocale="es" />
  <Hero
    name={es.profile.name}
    title={es.profile.title}
    location={es.profile.location}
    availability={es.profile.availability}
  />
  <About text={es.about} />
  <Projects heading={es.sections.projects} projects={es.projects} />
  <ExperienceTimeline heading={es.sections.experience} entries={es.experience} />
  <Skills heading={es.sections.skills} groups={es.skills} />
  <Education heading={es.sections.education} education={es.education} />
  <Footer
    email={es.profile.email}
    linkedin={es.profile.linkedin}
    location={es.profile.location}
    availability={es.profile.availability}
    contactHeading={es.sections.contact}
  />
</BaseLayout>
```

- [ ] **Step 4: Verify the build**

Note: this build is still expected to fail on the missing `src/scripts/reveal.ts` import in `BaseLayout.astro` — that's created in Task 10. To sanity-check the pages themselves now, temporarily comment out the `<script src="../scripts/reveal.ts">` line in `BaseLayout.astro`, run:

Run: `npm run build`
Expected: build succeeds, `dist/index.html` and `dist/es/index.html` both exist and contain the profile name, section headings, and project company names for their respective locale.

Restore the `<script>` line afterward.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.astro src/pages
git commit -m "feat: assemble English and Spanish portfolio pages"
```

---

### Task 10: Animations (frontend-design + animate skills)

**Files:**
- Create: `src/scripts/reveal.ts`

**Interfaces:**
- Consumes: the `[data-reveal]` CSS contract from `src/styles/global.css` (Task 3) and the `data-reveal` attributes already placed on `About`, `Projects`, `ExperienceTimeline`, `Skills`, and `Education` sections (Tasks 5–8).
- Produces: the scroll-reveal behavior referenced by `BaseLayout.astro`'s `<script src="../scripts/reveal.ts">` tag (Task 3).

Before writing code, invoke the `frontend-design` skill to sanity-check the typographic scale, spacing rhythm, and accent-color usage already in `global.css` and the section components, and invoke the `animate` skill to decide exact easing/duration values for the scroll-reveal effect below (the values here are a reasonable starting point, not final — adjust per those skills' guidance). The hero entrance (Task 5), card hover (Task 6), and sticky-nav transition (Task 4) already exist; this task's own animation is the scroll-reveal.

- [ ] **Step 1: Write the scroll-reveal script**

Create `src/scripts/reveal.ts`:

```ts
const REVEAL_SELECTOR = "[data-reveal]";

function initScrollReveal() {
  const targets = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (targets.length === 0) return;

  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

initScrollReveal();
```

- [ ] **Step 2: Verify the full build now succeeds**

Run: `npm run build`
Expected: build succeeds with the `<script src="../scripts/reveal.ts">` line in `BaseLayout.astro` left intact (no more missing-module error).

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:4321/` in a browser:
- Scroll down and confirm each section (About, Projects, Experience, Skills, Education) fades/slides in as it enters the viewport.
- Hover a project card and confirm the border/elevation change from Task 6.
- Scroll past the top and confirm the header gets a bottom border (Task 4).
- Toggle OS dark mode and confirm colors invert correctly.
- Enable "reduce motion" in OS accessibility settings and confirm sections appear immediately with no animation.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/reveal.ts
git commit -m "feat: add scroll-reveal animation"
```

---

### Task 11: GitHub Pages deployment workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`
- Create: `README.md`

**Interfaces:**
- Consumes: the `dist/` output of `npm run build`.
- Produces: nothing consumed by other tasks — this is the deployment entry point.

- [ ] **Step 1: Set the site URL**

Edit `astro.config.mjs` to add the `site` option (replace `<github-username>` with the actual GitHub account once the repo is created):

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://<github-username>.github.io/portfolio",
});
```

- [ ] **Step 2: Write the deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Write the README**

Create `README.md`:

```markdown
# Francisco Castro — Portfolio

Bilingual (EN/ES) static portfolio built with Astro.

## Develop

npm install
npm run dev

## Test

npm run test

## Build

npm run build

## Deploy

1. Create a GitHub repository named `portfolio` (or update `site` in
   `astro.config.mjs` to match whatever name you use).
2. Push this repo to `main`.
3. In the GitHub repo settings, go to **Pages** and set the source to
   **GitHub Actions**.
4. Every push to `main` builds and deploys automatically via
   `.github/workflows/deploy.yml`.
```

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs .github README.md
git commit -m "chore: add GitHub Pages deployment workflow"
```

---

### Task 12: Final verification pass

**Files:** none created; this task only verifies and, if needed, patches earlier files.

**Interfaces:** none — this is the closing quality gate for the whole plan.

- [ ] **Step 1: Run the full test suite**

Run: `npm run test`
Expected: all tests pass (locale-path tests + content-shape tests).

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: no errors or warnings; `dist/index.html` and `dist/es/index.html` both exist.

- [ ] **Step 3: Walk the spec's verification checklist**

Using `npm run dev`, confirm each item from `docs/superpowers/specs/2026-09-24-portfolio-site-design.md` section 7:
- [ ] Both locales (`/`, `/es/`) render correctly
- [ ] Light and dark mode (via OS `prefers-color-scheme`) both look correct
- [ ] The `mailto:` link and the LinkedIn link both work
- [ ] Mobile width (~400px) and desktop width both look correct (single-column vs. 2-column project grid)
- [ ] Every experience/project bullet matches `CLAUDE.md` in the `ai-job-search` repo or the CV PDFs — no fabricated metrics or claims

- [ ] **Step 4: Fix any issues found, then commit**

If Step 3 surfaces any issue, fix it in the relevant component/content file and commit:

```bash
git add -A
git commit -m "fix: address final verification findings"
```

If no issues are found, no commit is needed for this task.
