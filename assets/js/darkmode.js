// darkmode.js
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const icon = themeToggle.querySelector('span.material-symbols-outlined');
  
  // 1. Cek preferensi user (localStorage/media query)
  const savedTheme = localStorage.getItem('pastnow-theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // 2. Apply tema awal
  html.setAttribute('data-theme', savedTheme);
  icon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';

  // 3. Toggle tema saat button diklik
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update atribut dan icon
    html.setAttribute('data-theme', newTheme);
    icon.textContent = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
    
    // Simpan preferensi
    localStorage.setItem('pastnow-theme', newTheme);
    
    // Trigger event untuk komponen lain
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
  });
  
  // 4. Sync dengan perubahan sistem (opsional)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('pastnow-theme')) {
      html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
});
