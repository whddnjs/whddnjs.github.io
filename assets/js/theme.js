(function () {
  const key = 'theme-preference';
  const preference = localStorage.getItem(key) || 'system';
  const resolved = preference === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;
  document.documentElement.dataset.theme = preference;
  document.documentElement.dataset.resolvedTheme = resolved;
})();
