(() => {
  const overlay = document.querySelector('.search-overlay');
  const trigger = document.querySelector('.search-trigger');
  const close = document.querySelector('.search-close');
  const input = document.querySelector('#search-input');
  const results = document.querySelector('#search-results');
  const status = document.querySelector('.search-status');
  if (!overlay || !trigger || !input || !results) return;
  const index = JSON.parse(document.querySelector('#search-index').textContent || '[]');
  let returnFocus = null;
  const selectors = 'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const closeOverlay = () => { overlay.hidden = true; document.body.classList.remove('overlay-open'); returnFocus?.focus(); };
  const render = () => {
    const query = input.value.trim().toLocaleLowerCase(); results.replaceChildren();
    if (!query) { status.textContent = ''; return; }
    const matched = index.filter((post) => [post.title, post.description, ...(post.tags || [])].join(' ').toLocaleLowerCase().includes(query));
    status.textContent = `${matched.length} results`;
    matched.forEach((post) => { const li = document.createElement('li'); const link = document.createElement('a'); link.href = post.url; link.textContent = post.title; const description = document.createElement('p'); description.textContent = post.description; li.append(link, description); results.append(li); });
  };
  trigger.addEventListener('click', () => { returnFocus = trigger; overlay.hidden = false; document.body.classList.add('overlay-open'); input.value = ''; render(); input.focus(); });
  close?.addEventListener('click', closeOverlay); input.addEventListener('input', render);
  overlay.addEventListener('click', (event) => { if (event.target === overlay) closeOverlay(); });
  overlay.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeOverlay(); return; }
    if (event.key === 'ArrowDown' && results.querySelector('a')) { event.preventDefault(); results.querySelector('a').focus(); }
    if (event.key !== 'Tab') return;
    const items = [...overlay.querySelectorAll(selectors)]; const first = items[0]; const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
