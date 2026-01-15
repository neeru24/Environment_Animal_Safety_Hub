
    console.log("EcoLife Blog Page Loaded");
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    if (localStorage.getItem('blogDarkMode') === 'enabled') {
      enableDarkMode();
    }
    
    function enableDarkMode() {
      document.body.classList.add('dark-mode');
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('blogDarkMode', 'enabled');
    }
    
    function disableDarkMode() {
      document.body.classList.remove('dark-mode');
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('blogDarkMode', 'disabled');
    }
    
    themeToggle.addEventListener('click', () => {
      if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
      
      // Add click animation
      themeToggle.style.transform = 'scale(0.95)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 150);
    });

    // Category filtering functionality
    document.addEventListener('DOMContentLoaded', function() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const blogCards = document.querySelectorAll('.blog-card');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          const category = this.getAttribute('data-category');
          
          // Show/hide blog cards based on category
          blogCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
      
      // Newsletter form submission
      const newsletterForm = document.querySelector('.newsletter-form');
      const emailInput = newsletterForm.querySelector('input');
      
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (emailInput.value && emailInput.value.includes('@')) {
          alert('Thank you for subscribing to the EcoLife newsletter!');
          emailInput.value = '';
        } else {
          alert('Please enter a valid email address.');
        }
      });
      
      // Make blog cards clickable
      blogCards.forEach(card => {
        card.addEventListener('click', function() {
          const readMoreLink = this.querySelector('.read-more');
          if (readMoreLink) {
            window.location.href = readMoreLink.getAttribute('href');
          }
        });
      });
      
      // Add animation on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);
      
      // Observe blog cards for animation
      blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
      });
      
      // Observe featured card for animation
      const featuredCard = document.querySelector('.featured-card');
      if (featuredCard) {
        featuredCard.style.opacity = '0';
        featuredCard.style.transform = 'translateY(20px)';
        featuredCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(featuredCard);
      }
    });