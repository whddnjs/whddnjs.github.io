(() => {
  const list = document.querySelector('[data-infinite-list]');
  const sentinel = document.querySelector('.infinite-sentinel');
  if (!list || !sentinel || !('IntersectionObserver' in window)) return;
  const items = [...list.querySelectorAll('[data-infinite-item]')]; const pageSize = Number(list.dataset.pageSize || 20); let visible = pageSize;
  const showMore = () => items.forEach((item, index) => { item.hidden = index >= visible; });
  showMore();
  new IntersectionObserver((entries) => { if (entries[0].isIntersecting && visible < items.length) { visible += pageSize; showMore(); } }, { rootMargin: '300px' }).observe(sentinel);
})();
