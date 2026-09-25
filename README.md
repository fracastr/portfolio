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

Before deploying, edit `astro.config.mjs` and replace `YOUR_GITHUB_USERNAME`
in the `site` value with your actual GitHub username. If you name your repo
something other than `portfolio`, also update the `base` value to match
(e.g. `base: "/my-repo-name"`).

1. Create a GitHub repository named `portfolio` (or update `site` and `base`
   in `astro.config.mjs` to match whatever name you use).
2. Push this repo to `main`.
3. In the GitHub repo settings, go to **Pages** and set the source to
   **GitHub Actions**.
4. Every push to `main` builds and deploys automatically via
   `.github/workflows/deploy.yml`.
