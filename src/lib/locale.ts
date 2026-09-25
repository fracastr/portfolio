// Astro's configured `base` (e.g. "/portfolio" or "/portfolio/" in
// production, "/" when unset). Astro does not guarantee a trailing slash on
// import.meta.env.BASE_URL (it reflects the raw `base` config value), so we
// normalize one on here before using it. `Astro.url.pathname` includes this
// base, so we strip it before applying the EN/ES logic and re-add it to the
// result.
export function getAlternateLocalePath(pathname: string): string {
  const rawBase = import.meta.env.BASE_URL;
  const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  const path = pathname.startsWith(base) ? pathname.slice(base.length - 1) : pathname;

  if (path === "/es" || path.startsWith("/es/")) {
    return base;
  }
  return `${base}es/`;
}
