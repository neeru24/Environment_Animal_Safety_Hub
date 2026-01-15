 // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-theme');
      themeToggle.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      themeToggle.classList.toggle('dark');
      
      localStorage.setItem('theme', 
        document.body.classList.contains('dark-theme') ? 'dark' : 'light'
      );
    });

    // Create Background Particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      const size = Math.random() * 100 + 50; // 50-150px
      const x = Math.random() * 100; // 0-100vw
      const y = Math.random() * 100; // 0-100vh
      const delay = Math.random() * 20; // 0-20s delay
      const duration = Math.random() * 30 + 20; // 20-50s duration
      const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}vw`;
      particle.style.top = `${y}vh`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = opacity;
      particle.style.background = `radial-gradient(circle, var(--primary) 0%, transparent 70%)`;
      
      particlesContainer.appendChild(particle);
    }

    // Animate cards on scroll
    const animateCards = () => {
      const cards = document.querySelectorAll('.animate-card');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
      });
    };

    // Disabled button behavior
    document.querySelectorAll('.play-btn.disabled').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🚧 This game is coming soon! Stay tuned for updates!');
      });
    });

    // Add hover effect for cards
    document.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // ===== VOICE ECHO GAME LOGIC =====
    const voiceGameModal = document.getElementById('voiceGameModal');
    const closeVoiceGameBtn = document.getElementById('closeVoiceGame');
    const playVoiceGameBtn = document.querySelector('.play-voice-game');
    const microphoneBtn = document.getElementById('microphoneBtn');
    const nextWordBtn = document.getElementById('nextWordBtn');
    const currentWordEl = document.getElementById('currentWord');
    const wordPhoneticEl = document.getElementById('wordPhonetic');
    const wordMeaningEl = document.getElementById('wordMeaning');
    const scoreEl = document.getElementById('score');
    const levelEl = document.getElementById('level');
    const streakEl = document.getElementById('streak');
    const accuracyEl = document.getElementById('accuracy');
    const feedbackMessageEl = document.getElementById('feedbackMessage');
    const wordListEl = document.getElementById('wordList');

    // Eco-themed word list with phonetic pronunciation and meanings
    const ecoWords = [
      { word: "ECO", phonetic: "/ˈiːkoʊ/", meaning: "Related to the environment and nature" },
      { word: "GREEN", phonetic: "/ɡriːn/", meaning: "Color of plants; environmentally friendly" },
      { word: "RECYCLE", phonetic: "/ˌriːˈsaɪkəl/", meaning: "Convert waste into reusable material" },
      { word: "TREE", phonetic: "/triː/", meaning: "Tall plant with trunk and branches" },
      { word: "WATER", phonetic: "/ˈwɔːtər/", meaning: "Clear liquid essential for life" },
      { word: "EARTH", phonetic: "/ɜːrθ/", meaning: "Our planet; soil or ground" },
      { word: "SUN", phonetic: "/sʌn/", meaning: "Star that gives light and heat to Earth" },
      { word: "LEAF", phonetic: "/liːf/", meaning: "Flat green part of a plant" },
      { word: "SEED", phonetic: "/siːd/", meaning: "Small object from which plants grow" },
      { word: "OCEAN", phonetic: "/ˈoʊʃən/", meaning: "Vast body of salt water" },
      { word: "FOREST", phonetic: "/ˈfɔːrɪst/", meaning: "Large area covered with trees" },
      { word: "ANIMAL", phonetic: "/ˈænɪməl/", meaning: "Living creature that is not a plant" },
      { word: "BIRD", phonetic: "/bɜːrd/", meaning: "Feathered animal that can usually fly" },
      { word: "FLOWER", phonetic: "/ˈflaʊər/", meaning: "Colorful part of a plant" },
      { word: "SOIL", phonetic: "/sɔɪl/", meaning: "Top layer of earth where plants grow" },
      { word: "AIR", phonetic: "/er/", meaning: "Invisible gas we breathe" },
      { word: "CLEAN", phonetic: "/kliːn/", meaning: "Free from dirt or pollution" },
      { word: "SAVE", phonetic: "/seɪv/", meaning: "Keep safe; prevent waste" },
      { word: "GROW", phonetic: "/ɡroʊ/", meaning: "Increase in size; develop" },
      { word: "NATURE", phonetic: "/ˈneɪtʃər/", meaning: "Natural world including plants and animals" }
    ];

    // Game state
    let gameState = {
      score: 0,
      level: 1,
      streak: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      currentWordIndex: 0,
      isListening: false,
      completedWords: new Set(),
      recognition: null
    };

    // Initialize game
    function initVoiceGame() {
      gameState = {
        score: 0,
        level: 1,
        streak: 0,
        totalAttempts: 0,
        correctAttempts: 0,
        currentWordIndex: Math.floor(Math.random() * ecoWords.length),
        isListening: false,
        completedWords: new Set(),
        recognition: null
      };

      updateGameDisplay();
      generateWordBubbles();
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        gameState.recognition = new SpeechRecognition();
        gameState.recognition.continuous = false;
        gameState.recognition.interimResults = false;
        gameState.recognition.lang = 'en-US';

        gameState.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.trim().toUpperCase();
          checkPronunciation(transcript);
        };

        gameState.recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          showFeedback('Oops! Could not hear you clearly. Try again!', false);
          microphoneBtn.classList.remove('listening');
          gameState.isListening = false;
          microphoneBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Click & Speak</span>';
        };

        gameState.recognition.onend = () => {
          microphoneBtn.classList.remove('listening');
          gameState.isListening = false;
          microphoneBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Click & Speak</span>';
        };
      } else {
        showFeedback('Your browser does not support speech recognition. Try Chrome or Edge!', false);
        microphoneBtn.disabled = true;
        microphoneBtn.innerHTML = '<i class="fas fa-microphone-slash"></i><span>Not Supported</span>';
      }
    }

    // Update game display
    function updateGameDisplay() {
      const currentWord = ecoWords[gameState.currentWordIndex];
      currentWordEl.textContent = currentWord.word;
      wordPhoneticEl.textContent = currentWord.phonetic;
      wordMeaningEl.textContent = currentWord.meaning;
      
      scoreEl.textContent = gameState.score;
      levelEl.textContent = gameState.level;
      streakEl.textContent = gameState.streak;
      
      const accuracy = gameState.totalAttempts > 0 
        ? Math.round((gameState.correctAttempts / gameState.totalAttempts) * 100)
        : 100;
      accuracyEl.textContent = `${accuracy}%`;
      
      updateWordBubbles();
    }

    // Generate word bubbles
    function generateWordBubbles() {
      wordListEl.innerHTML = '';
      ecoWords.forEach((wordObj, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'word-bubble';
        bubble.textContent = wordObj.word;
        bubble.dataset.index = index;
        wordListEl.appendChild(bubble);
      });
      updateWordBubbles();
    }

    // Update word bubbles state
    function updateWordBubbles() {
      const bubbles = wordListEl.querySelectorAll('.word-bubble');
      bubbles.forEach(bubble => {
        const index = parseInt(bubble.dataset.index);
        bubble.classList.remove('completed', 'current');
        
        if (gameState.completedWords.has(index)) {
          bubble.classList.add('completed');
        }
        
        if (index === gameState.currentWordIndex) {
          bubble.classList.add('current');
        }
      });
    }

    // Check pronunciation
    function checkPronunciation(spokenWord) {
      const currentWord = ecoWords[gameState.currentWordIndex].word;
      gameState.totalAttempts++;
      
      // Simple check - allow close matches
      const isCorrect = spokenWord === currentWord || 
                       spokenWord.includes(currentWord) || 
                       currentWord.includes(spokenWord);
      
      if (isCorrect) {
        gameState.score += 10 * gameState.level;
        gameState.streak++;
        gameState.correctAttempts++;
        
        // Mark word as completed
        gameState.completedWords.add(gameState.currentWordIndex);
        
        // Level up every 5 correct words
        if (gameState.completedWords.size % 5 === 0) {
          gameState.level++;
          showFeedback(`🎉 Level Up! You're now at level ${gameState.level}`, true);
        } else {
          showFeedback('✅ Perfect! Great pronunciation!', true);
        }
        
        // Move to next word
        setTimeout(() => {
          nextWord();
        }, 1500);
      } else {
        gameState.streak = 0;
        showFeedback(`Almost! You said "${spokenWord}", try saying "${currentWord}"`, false);
      }
      
      updateGameDisplay();
    }

    // Show feedback message
    function showFeedback(message, isSuccess) {
      feedbackMessageEl.textContent = message;
      feedbackMessageEl.className = `feedback-message ${isSuccess ? 'feedback-success' : 'feedback-error'}`;
      feedbackMessageEl.style.display = 'block';
      
      if (isSuccess) {
        currentWordEl.classList.add('bounce');
        setTimeout(() => {
          currentWordEl.classList.remove('bounce');
        }, 500);
      }
      
      setTimeout(() => {
        feedbackMessageEl.style.display = 'none';
      }, 3000);
    }

    // Move to next word
    function nextWord() {
      // Find next incomplete word
      let nextIndex = (gameState.currentWordIndex + 1) % ecoWords.length;
      let attempts = 0;
      
      while (gameState.completedWords.has(nextIndex) && attempts < ecoWords.length) {
        nextIndex = (nextIndex + 1) % ecoWords.length;
        attempts++;
      }
      
      // If all words completed, reset completed list
      if (attempts >= ecoWords.length) {
        gameState.completedWords.clear();
        showFeedback('🎊 Amazing! You completed all words! Starting again...', true);
      }
      
      gameState.currentWordIndex = nextIndex;
      updateGameDisplay();
    }

    // Toggle microphone
    function toggleMicrophone() {
      if (!gameState.recognition) {
        showFeedback('Speech recognition not available in your browser.', false);
        return;
      }
      
      if (!gameState.isListening) {
        gameState.recognition.start();
        microphoneBtn.classList.add('listening');
        gameState.isListening = true;
        microphoneBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Listening... Speak Now!</span>';
        showFeedback('🎤 Listening... Say the word clearly!', true);
      } else {
        gameState.recognition.stop();
        microphoneBtn.classList.remove('listening');
        gameState.isListening = false;
        microphoneBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Click & Speak</span>';
      }
    }

    // Event Listeners for Voice Game
    playVoiceGameBtn.addEventListener('click', () => {
      initVoiceGame();
      voiceGameModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeVoiceGameBtn.addEventListener('click', () => {
      voiceGameModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Stop recognition if active
      if (gameState.recognition && gameState.isListening) {
        gameState.recognition.stop();
      }
    });

    microphoneBtn.addEventListener('click', toggleMicrophone);
    nextWordBtn.addEventListener('click', nextWord);

    // Close modal on outside click
    voiceGameModal.addEventListener('click', (e) => {
      if (e.target === voiceGameModal) {
        voiceGameModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Stop recognition if active
        if (gameState.recognition && gameState.isListening) {
          gameState.recognition.stop();
        }
      }
    });

    // Initialize
    animateCards();