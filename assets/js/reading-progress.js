(() => {
  const progress = document.querySelector('.reading-progress span'); const article = document.querySelector('.post-content'); if (!progress || !article) return;
  const update = () => { const start = article.offsetTop; const total = article.offsetHeight - innerHeight; progress.style.width = `${Math.max(0, Math.min(100, ((scrollY - start) / Math.max(total, 1)) * 100))}%`; };
  addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
})();
