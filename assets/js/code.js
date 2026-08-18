(() => {
  document.querySelectorAll('.highlighter-rouge, .code-block, figure.highlight').forEach((block) => {
    const code = block.querySelector('code'); if (!code) return;
    const language = [...code.classList].find((name) => name.startsWith('language-'))?.replace('language-', '');
    if (language && !block.querySelector('.code-language')) {
      const label = document.createElement('span'); label.className = 'code-language'; label.textContent = language;
      block.prepend(label);
    }
    const button = document.createElement('button'); button.className = 'copy-code'; button.type = 'button'; button.textContent = 'Copy'; button.setAttribute('aria-label', '코드 복사');
    button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(code.innerText); button.textContent = 'Copied'; } catch (_) { button.textContent = 'Copy failed'; } setTimeout(() => { button.textContent = 'Copy'; }, 1800); });
    block.prepend(button);
  });
})();
