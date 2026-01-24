class FontManager {
  constructor() {
    this.fontsLoaded = false;
    this.fallbackTimeout = 3000; // 3 seconds
    this.init();
  }

  init() {
    this.setupFontLoading();
    this.setupFallbacks();
    this.optimizeGoogleFonts();
  }

  setupFontLoading() {
    // Add font-loading class to prevent FOIT
    document.documentElement.classList.add('font-loading');

    // Use Font Loading API if available
    if ('fonts' in document) {
      this.loadFontsWithAPI();
    } else {
      this.loadFontsWithFallback();
    }
  }

  loadFontsWithAPI() {
    // Load only the fonts we actually use
    const fontPromises = [
      document.fonts.load('400 16px Poppins'),
      document.fonts.load('600 16px Poppins')
    ];

    Promise.all(fontPromises)
      .then(() => {
        this.onFontsLoaded();
      })
      .catch(() => {
        console.warn('Font loading failed, using fallbacks');
        this.onFontsLoaded();
      });

    // Fallback timeout
    setTimeout(() => {
      if (!this.fontsLoaded) {
        this.onFontsLoaded();
      }
    }, this.fallbackTimeout);
  }

  loadFontsWithFallback() {
    // Create test elements to detect font loading
    const testElement = document.createElement('div');
    testElement.style.cssText = `
      position: absolute;
      left: -9999px;
      top: -9999px;
      font-size: 72px;
      font-family: 'Poppins', sans-serif;
      visibility: hidden;
    `;
    testElement.textContent = 'BESbswy';
    document.body.appendChild(testElement);

    const fallbackWidth = testElement.offsetWidth;
    
    // Check periodically if font has loaded
    const checkFont = () => {
      if (testElement.offsetWidth !== fallbackWidth) {
        document.body.removeChild(testElement);
        this.onFontsLoaded();
      } else if (Date.now() - startTime < this.fallbackTimeout) {
        requestAnimationFrame(checkFont);
      } else {
        document.body.removeChild(testElement);
        this.onFontsLoaded();
      }
    };

    const startTime = Date.now();
    requestAnimationFrame(checkFont);
  }

  onFontsLoaded() {
    if (this.fontsLoaded) return;
    
    this.fontsLoaded = true;
    document.documentElement.classList.remove('font-loading');
    document.documentElement.classList.add('fonts-loaded');
    
    // Store in localStorage for faster subsequent loads
    localStorage.setItem('fontsLoaded', 'true');
    localStorage.setItem('fontsLoadedTime', Date.now().toString());
  }

  setupFallbacks() {
    // Check if fonts were previously loaded (within 24 hours)
    const fontsLoadedTime = localStorage.getItem('fontsLoadedTime');
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (fontsLoadedTime && (Date.now() - parseInt(fontsLoadedTime)) < twentyFourHours) {
      document.documentElement.classList.add('fonts-cached');
    }
  }

  optimizeGoogleFonts() {
    // Remove unused font weights from Google Fonts URL
    const googleFontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    
    googleFontLinks.forEach(link => {
      const href = link.href;
      
      // Only load weights we actually use (400, 600)
      if (href.includes('wght@300;400;500;600;700;800')) {
        link.href = href.replace('wght@300;400;500;600;700;800', 'wght@400;600');
      }
      
      // Add font-display=swap if not present
      if (!href.includes('display=swap')) {
        link.href += href.includes('?') ? '&display=swap' : '?display=swap';
      }
    });
  }

  // Preload critical fonts
  preloadCriticalFonts() {
    const criticalFonts = [
      'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2',
      'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2'
    ];

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = fontUrl;
      document.head.appendChild(link);
    });
  }

  // Fix contrast issues
  fixContrastIssues() {
    // Find elements with poor contrast
    const lightTextElements = document.querySelectorAll('.text-light-gray, .text-muted');
    
    lightTextElements.forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      const color = computedStyle.color;
      
      // If color is too light, darken it
      if (this.isColorTooLight(color)) {
        element.style.color = '#5a6c7d'; // WCAG compliant color
      }
    });
  }

  isColorTooLight(color) {
    // Simple check for light colors
    const rgb = color.match(/\d+/g);
    if (!rgb) return false;
    
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness > 180; // Threshold for too light
  }
}

// Initialize font manager
document.addEventListener('DOMContentLoaded', () => {
  window.fontManager = new FontManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FontManager;
}