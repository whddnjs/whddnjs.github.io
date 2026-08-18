(() => {
  const body = document.body;
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav');
  const themeButton = document.querySelector('.theme-toggle');
  const backToTop = document.querySelector('.back-to-top');

  const closeMenus = () => {
    if (mobileMenu) mobileMenu.hidden = true;
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = mobileMenu.hidden;
    closeMenus(); mobileMenu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open));
  });
  const setTheme = (theme) => {
    localStorage.setItem('theme-preference', theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.resolvedTheme = theme;
    if (themeButton) {
      const isDark = theme === 'dark';
      themeButton.textContent = isDark ? 'Light' : 'Dark';
      themeButton.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
      themeButton.setAttribute('aria-pressed', String(isDark));
    }
    document.querySelector('iframe.giscus-frame')?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  };
  setTheme(document.documentElement.dataset.resolvedTheme === 'dark' ? 'dark' : 'light');
  themeButton?.addEventListener('click', () => setTheme(document.documentElement.dataset.resolvedTheme === 'dark' ? 'light' : 'dark'));
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
