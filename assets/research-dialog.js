(() => {
  const dialog = document.getElementById('research-dialog');
  const image = dialog.querySelector('img');
  document.querySelectorAll('.interest-open').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.interest-card');
      const thumbnail = button.querySelector('img');
      image.src = thumbnail.src;
      image.alt = thumbnail.alt;
      dialog.querySelector('h2').textContent = card.querySelector('h3').textContent;
      document.getElementById('research-dialog-description').textContent = card.querySelector('.interest-description').textContent;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
})();
