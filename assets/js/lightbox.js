(() => {
  const images = [...document.querySelectorAll('.post-body img')]; if (!images.length) return;
  let previous = null;
  const dialog = document.createElement('dialog'); dialog.className = 'lightbox'; dialog.innerHTML = '<button type="button" aria-label="이미지 닫기">Close</button><img alt="">'; document.body.append(dialog);
  const image = dialog.querySelector('img'); const close = () => { dialog.close(); previous?.focus(); };
  images.forEach((source) => { source.loading = 'lazy'; source.tabIndex = 0; source.setAttribute('role', 'button'); source.setAttribute('aria-label', `${source.alt || '이미지'} 확대`); const open = () => { previous = source; image.src = source.currentSrc || source.src; image.alt = source.alt; dialog.showModal(); dialog.querySelector('button').focus(); }; source.addEventListener('click', open); source.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } }); });
  dialog.querySelector('button').addEventListener('click', close); dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); }); dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
})();
