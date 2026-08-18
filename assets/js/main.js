(() => {
  const body = document.body;
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav');
  const themeButton = document.querySelector('.theme-toggle');
  const themeMenu = document.querySelector('.theme-menu');
  const backToTop = document.querySelector('.back-to-top');

  const closeMenus = () => {
    if (mobileMenu) mobileMenu.hidden = true;
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    if (themeMenu) themeMenu.hidden = true;
  };
  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.hidden;
    closeMenus(); mobileMenu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open));
  });
  themeButton?.addEventListener('click', () => { const open = themeMenu.hidden; closeMenus(); themeMenu.hidden = !open; });
  document.querySelectorAll('[data-theme-choice]').forEach((button) => button.addEventListener('click', () => {
    const preference = button.dataset.themeChoice;
    localStorage.setItem('theme-preference', preference);
    document.documentElement.dataset.theme = preference;
    document.documentElement.dataset.resolvedTheme = preference === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : preference;
    document.querySelectorAll('[data-theme-choice]').forEach((choice) => choice.setAttribute('aria-checked', String(choice === button)));
    closeMenus(); themeButton?.focus();
  }));
  document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMenus(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenus(); });
  window.addEventListener('scroll', () => { backToTop.hidden = window.scrollY < 480; }, { passive: true });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelector('.copy-link')?.addEventListener('click', async (event) => {
    try { await navigator.clipboard.writeText(window.location.href); event.currentTarget.textContent = 'Copied'; }
    catch (_) { event.currentTarget.textContent = 'Copy failed'; }
    setTimeout(() => { event.currentTarget.textContent = 'Copy link'; }, 1800);
  });
  document.querySelectorAll('.code-block').forEach((block) => {
    const filename = block.dataset.filename;
    if (filename) { const label = document.createElement('span'); label.className = 'code-filename'; label.textContent = filename; block.prepend(label); }
  });
  void body;
})();
