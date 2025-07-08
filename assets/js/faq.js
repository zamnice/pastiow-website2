// faq.js
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
    
    // Animasi icon
    const icon = button.querySelector('span');
    icon.textContent = faqItem.classList.contains('active') ? 'expand_less' : 'expand_more';
  });
});
