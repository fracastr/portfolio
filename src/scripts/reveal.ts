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
    // Fire slightly before a section fully enters the viewport, and
    // independent of the section's height (a low threshold with a
    // shrunk root avoids the fragile "% of area visible" trigger,
    // which fires inconsistently for a short paragraph like About vs.
    // a tall grid like Projects).
    // Note: this assumes there's always enough scrollable content below
    // the last [data-reveal] section (currently Education) for that
    // section's top edge to cross the shrunk -100px root. If a future
    // edit ever makes the trailing content very short, the last section
    // could stay permanently hidden on a short viewport.
    { threshold: 0, rootMargin: "0px 0px -100px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

initScrollReveal();
