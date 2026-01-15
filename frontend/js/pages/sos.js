// Initialize AOS
AOS.init({
  duration: 800,
  once: true
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme or prefered scheme
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark-theme');
  themeToggle.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.classList.toggle('dark');

  // Save preference
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
