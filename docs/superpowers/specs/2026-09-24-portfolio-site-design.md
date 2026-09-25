# Portfolio Site — Design Spec

**Date:** 2026-09-24
**Author:** Francisco Castro (with Claude Code)
**Status:** Approved — ready for implementation plan

## 1. Purpose

A personal portfolio website for Francisco Castro, Senior Full Stack Software
Engineer, to accompany job applications. Deployed as a static site to
GitHub Pages (or a custom domain later), separate from the
`ai-job-search` repo (which handles CV/cover-letter generation, not
public-facing sites).

## 2. Goals / Non-goals

**Goals:**
- Bilingual (EN/ES) single-page portfolio: hero, about, featured projects,
  experience timeline, skills, education/certifications, contact.
- Minimalist/technical visual style, light + auto dark mode.
- Deployable as a static site via GitHub Actions → GitHub Pages.
- Content sourced strictly from the candidate's actual CV/profile — no
  fabricated metrics or claims.

**Non-goals:**
- No backend, no CMS, no contact form (mailto/LinkedIn links only).
- No blog (may be a future addition; not in this scope).
- No multi-page site beyond the single scrollable page per language.

## 3. Architecture

- **Framework:** Astro (static site generation), TypeScript.
- **Styling:** Plain CSS (component-scoped `.astro` styles), no CSS
  framework — keeps the minimalist aesthetic intentional rather than
  templated.
- **i18n:** Astro's built-in i18n routing, two locales: `en` (default)
  and `es`, e.g. `/`, `/es/`. A header toggle switches locale while
  preserving scroll position/section.
- **Content data model:** typed content files, not hardcoded in markup:
  - `src/content/site.en.ts`, `src/content/site.es.ts` exporting:
    - `experience: ExperienceEntry[]`
    - `projects: ProjectEntry[]` (featured case-study subset)
    - `skills: SkillGroup[]`
    - `education: Certification[]`
    - `profile: { name, title, location, email, linkedin, summary }`
  - Page/section components consume these arrays — adding or editing
    content never touches layout logic.
- **Deployment:** GitHub Actions workflow running `astro build` on push
  to `main`, publishing `dist/` to GitHub Pages. Repo created and pushed
  by the user; Pages enabled by the user once the repo exists on GitHub.

## 4. Content

### 4.1 Profile / Hero
- Name: Francisco Castro
- Title: Senior Full Stack Software Engineer
- Location: Los Ángeles, Chile (Remote / open to relocation worldwide)
- Contact: fr.castr@gmail.com · linkedin.com/in/fracastr
- Availability: Actively looking, available immediately

### 4.2 About (tone: value-proposition, not generic bio)
Draws on 7+ years across gaming, fintech, and e-government; core stack
PHP/Laravel, JS/TS (React/Vue), Node.js, Python, AWS/GCP, Docker;
adaptable generalist, high autonomy, thrives in distributed remote
teams; currently deepening into AI-driven optimization/decision-support
software while retaining full-stack versatility. Written in both
languages, one paragraph, 3–4 sentences.

### 4.3 Featured Projects (case-study cards)
Four cards, each with: company, role/period, 2–3 sentence context
(problem the team was solving), tech stack tags, 1–2 achievement-style
bullets (factual, drawn only from the profile — no invented metrics).

1. **Opturion** (Contract, 2026) — AI-driven optimization and
   decision-support platform. Built features for intelligent planning
   and scheduling tools across logistics, transportation, and workforce
   management, collaborating with engineers, researchers, and clients.
   Stack: PHP, JavaScript, cloud/AI decision-support systems.
2. **Sciplay (via Amber Studios)** (2022–2025) — High-traffic gaming
   platform backend, Austin TX-based team, remote-first. Designed and
   maintained scalable backend services; built server-side solutions
   with PHP, Docker, Couchbase, JavaScript in a distributed bilingual
   agile team.
3. **Sondek (CMP Group projects)** (2022–2024) — Metallurgical balance
   management systems. Architected and built the system using Python,
   PHP, Vue.js, Node.js; integrated Google Drive APIs and AWS cloud
   infrastructure; contributed to system design decisions across
   multiple client projects.
4. **Valio** (2025) — Custom software for public-sector clients.
   Designed and delivered solutions using PHP (Laravel), React.js, and
   SQL Server; integrated third-party APIs to meet strict government
   requirements in a regulated environment.

### 4.4 Experience Timeline (all roles, compact)
Chronological, most recent first: Opturion → Passline → Valio →
Sciplay/Amber Studios → Sondek → Gisma → RedCapital → Inpact — one line
each (title, company, dates, location), matching the dates/titles in
CLAUDE.md candidate profile / CV exactly.

### 4.5 Skills
- Primary: PHP (Laravel), JavaScript/TypeScript (React, Vue.js,
  Angular), Python, Node.js, REST APIs
- Secondary: .NET C#, SQL Server, PostgreSQL, Couchbase, Jenkins/CI-CD
- Cloud & DevOps: AWS, GCP, Docker, Git, Linux, Bash

### 4.6 Education & Certifications
- B.S. Computer Science Engineering — Universidad del Bío-Bío,
  Concepción, Chile
- Mobile App Development — Complutense University of Madrid
- Linux Server Management — Universidad del Bío-Bío
- Web Systems Development with PHP (Laravel)
- Arduino Programming — Universidad del Bío-Bío

### 4.7 Footer / Contact
Email, LinkedIn, location, availability status — repeated from hero for
easy access at the end of the page.

## 5. Visual Design

- **Colors:** background `#fafafa` (light) / `#111111` (dark, via
  `prefers-color-scheme`), text `#1a1a1a` / `#f2f2f2`, single accent
  color (deep blue, exact hex chosen during implementation) for links,
  card borders, section markers. No gradients, no decorative imagery.
- **Typography:** one sans-serif system font stack
  (`-apple-system, "Segoe UI", Inter, sans-serif`) for all text —
  no external font dependency, instant load. Monospace only for stack
  tags on project cards (e.g. `PHP` `React` `AWS`).
- **Layout:** single centered column, max-width ~720px, generous
  whitespace between sections, thin-rule separators instead of boxes.
- **Project cards:** 2-column grid on desktop, stacked on mobile; 1px
  subtle border, no heavy shadow.
- **Header:** name + minimal nav (Projects, Experience, Contact) + EN/ES
  toggle, sticky but understated.
- **Responsive:** mobile-first, single breakpoint (~768px) for the
  1→2 column project grid.

## 6. Animation & Polish

Implementation will invoke the `frontend-design` skill (typographic
scale, spacing rhythm, intentional accent use) and the `animate` skill
(purposeful micro-interactions, not decoration) rather than hardcoding
ad-hoc choices here. Candidate animations agreed with the user:

- Hero entrance: fade + slight upward motion on load
- Scroll-reveal per section (projects, experience) on viewport entry
- Project card hover: subtle elevation/border change, no heavy shadow
- EN/ES toggle: cross-fade content transition, no hard jump
- Sticky nav: subtle background transition on scroll

Exact easing/duration/implementation values are decided during
implementation using those skills, not fixed in this spec.

## 7. Verification

No backend to test; verification is:
- [ ] `astro build` completes with no errors/warnings
- [ ] Visual check of both locales (EN/ES) and both color schemes
      (light/dark)
- [ ] All links (email, LinkedIn) work
- [ ] Responsive check at mobile (~400px) and desktop widths
- [ ] Every experience/project claim traced back to the candidate
      profile (CLAUDE.md in `ai-job-search`) or CV — no fabricated
      metrics or claims

## 8. Out of scope / future work

- Custom domain setup (user's own DNS work, not part of this build)
- Blog / writing section
- Contact form with backend
