(function () {
  const key = 'theme-preference';
  const stored = localStorage.getItem(key);
  const preference = stored === 'dark' ? 'dark' : 'light';
  localStorage.setItem(key, preference);
  document.documentElement.dataset.theme = preference;
  document.documentElement.dataset.resolvedTheme = preference;
})();
