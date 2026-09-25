export function getAlternateLocalePath(pathname: string): string {
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return "/";
  }
  return "/es/";
}
