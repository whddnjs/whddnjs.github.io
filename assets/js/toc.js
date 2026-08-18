(() => {
  const links = [...document.querySelectorAll('.toc a')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((link) => [link.hash.slice(1), link]));
  const headings = [...document.querySelectorAll('.post-body h2[id], .post-body h3[id]')];
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { links.forEach((link) => link.removeAttribute('aria-current')); byId.get(entry.target.id)?.setAttribute('aria-current', 'true'); }
  }), { rootMargin: '0px 0px -70% 0px' });
  headings.forEach((heading) => observer.observe(heading));
})();
