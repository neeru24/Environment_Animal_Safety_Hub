/* ===== PET ADOPTION PAGE JAVASCRIPT (MERGED) ===== */

class AdoptionPage {
  constructor() {
    this.pets = [];
    this.filteredPets = [];
    this.currentFilter = 'all';
    this.petsData = {}; // hardcoded pet data from Version B
    this.init();
  }

  async init() {
    this.initPetsData();
    this.setupEventListeners();
    this.renderPets();
    this.initializeAnimations();
  }

  initPetsData() {
    // Hardcoded pet data (from Version B)
    this.petsData = {
      max: { name: "Max", breed: "Golden Retriever", gender: "male", age: "2 Years", size: "Medium", weight: "28 kg", location: "Delhi", color: "Golden", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600", badges: ["new", "vaccinated"], description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with children and other pets. Max has been fully vaccinated and is looking for a loving family to call his own.", traits: ["Friendly","Playful","Good with Kids","Trained","Energetic","Loyal"], health: "Vaccinated, Neutered, Microchipped", adoptionFee: "₹3,500" },
      whiskers: { name: "Whiskers", breed: "Persian Cat", gender: "female", age: "1 Year", size: "Small", weight: "4 kg", location: "Mumbai", color: "White", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600", badges: ["urgent"], description: "Whiskers is a beautiful Persian cat with stunning blue eyes. She's calm, affectionate, and loves to cuddle. Due to her previous owner relocating, she urgently needs a new home.", traits: ["Calm","Affectionate","Indoor Cat","Gentle","Quiet","Cuddly"], health: "Vaccinated, Spayed", adoptionFee: "₹2,500" },
      bruno: { name: "Bruno", breed: "German Shepherd", gender: "male", age: "3 Years", size: "Large", weight: "35 kg", location: "Bangalore", color: "Black & Tan", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600", badges: ["trained"], description: "Bruno is a well-trained German Shepherd with excellent obedience skills. He's protective, intelligent, and makes a great companion. Perfect for an active family with a spacious home.", traits: ["Intelligent","Protective","Trained","Active","Loyal","Alert"], health: "Vaccinated, Neutered, Microchipped", adoptionFee: "₹4,000" },
      luna: { name: "Luna", breed: "British Shorthair", gender: "female", age: "6 Months", size: "Small", weight: "2.5 kg", location: "Jaipur", color: "Gray", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600", badges: ["vaccinated"], description: "Luna is an adorable British Shorthair kitten with a playful personality. She loves chasing toys and exploring. Luna would make a perfect first pet for any family.", traits: ["Playful","Curious","Friendly","Adorable","Active","Social"], health: "Vaccinated, Dewormed", adoptionFee: "₹2,000" },
      coco: { name: "Coco", breed: "Cockatiel", gender: "male", age: "1 Year", size: "Small", weight: "100 g", location: "Chennai", color: "Gray & Yellow", image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600", badges: ["new"], description: "Coco is a charming Cockatiel who loves to whistle and sing. He's hand-tamed and enjoys interacting with people. A perfect companion for bird lovers.", traits: ["Vocal","Friendly","Hand-tamed","Musical","Social","Cheerful"], health: "Healthy, Regular checkups", adoptionFee: "₹1,500" },
      buddy: { name: "Buddy", breed: "Labrador", gender: "male", age: "4 Years", size: "Large", weight: "32 kg", location: "Pune", color: "Chocolate", image: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600", badges: ["friendly"], description: "Buddy is a sweet-natured Labrador who's excellent with children. He's patient, gentle, and loves family activities. Buddy is house-trained and knows basic commands.", traits: ["Kid Friendly","Gentle","Patient","Trained","Loving","Playful"], health: "Vaccinated, Neutered, Microchipped", adoptionFee: "₹3,500" },
      fluffy: { name: "Fluffy", breed: "Holland Lop Rabbit", gender: "female", age: "8 Months", size: "Small", weight: "1.8 kg", location: "Hyderabad", color: "White & Brown", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600", badges: ["vaccinated"], description: "Fluffy is an adorable Holland Lop rabbit with floppy ears and a sweet personality. She loves to hop around and enjoys gentle petting. Perfect for apartments.", traits: ["Gentle","Quiet","Adorable","Easy Care","Friendly","Cuddly"], health: "Vaccinated, Healthy", adoptionFee: "₹1,000" },
      simba: { name: "Simba", breed: "Orange Tabby", gender: "male", age: "2 Years", size: "Medium", weight: "5 kg", location: "Kolkata", color: "Orange", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600", badges: ["trained"], description: "Simba is a confident and friendly Orange Tabby. He's litter-trained, loves to play, and gets along well with other cats. Simba enjoys sunny spots and chin scratches.", traits: ["Confident","Friendly","Trained","Social","Playful","Affectionate"], health: "Vaccinated, Neutered, Microchipped", adoptionFee: "₹2,000" },
    };

    // Convert to array
    this.pets = Object.keys(this.petsData).map(key => ({ id: key, ...this.petsData[key] }));
    this.filteredPets = [...this.pets];
  }

  setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn, .filter-tab');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.setActiveFilter(e.target);
        this.filterPets(e.target.dataset.filter);
      });
    });

    // Adoption form
    const adoptionForm = document.getElementById('adoptionForm');
    if (adoptionForm) {
      adoptionForm.addEventListener('submit', (e) => this.handleAdoptionSubmit(e));
    }

    // Modal close
    const modal = document.getElementById('petModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
      const closeBtn = modal.querySelector('.btn-close');
      if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
    }

    // Favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleFavorite(btn);
      });
    });

    // FAQ accordion
    document.querySelectorAll(".faq-item").forEach(item => {
      item.querySelector(".faq-question")?.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    });

    // Category cards
    document.querySelectorAll(".category-card").forEach(card => {
      card.addEventListener("click", () => {
        const petsSection = document.getElementById("pets");
        if (petsSection) petsSection.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  setActiveFilter(button) {
    document.querySelectorAll('.filter-btn, .filter-tab').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  }

  filterPets(filter) {
    this.currentFilter = filter;

    this.filteredPets = filter === 'all' 
      ? [...this.pets] 
      : this.pets.filter(pet => pet.size.toLowerCase() === filter.toLowerCase() || pet.breed.toLowerCase().includes(filter.toLowerCase()));

    this.renderPets();
  }

  renderPets() {
    const petsGrid = document.getElementById('petsGrid');
    if (!petsGrid) return;
    petsGrid.innerHTML = '';

    this.filteredPets.forEach(pet => {
      const card = document.createElement('div');
      card.className = 'pet-card';
      card.dataset.category = pet.breed.toLowerCase();
      card.innerHTML = `
        <div class="pet-image"><img src="${pet.image}" alt="${pet.name}" loading="lazy"><div class="pet-status">Available</div></div>
        <div class="pet-info">
          <h3 class="pet-name">${pet.name}</h3>
          <div class="pet-details">
            <span>${pet.breed}</span>
            <span>${pet.age}</span>
            <span>${pet.gender}</span>
            <span>${pet.size}</span>
          </div>
          <p>${pet.description}</p>
          <div class="pet-actions">
            <button class="btn-details" onclick="adoptionPage.showPetDetails('${pet.id}')">View Details</button>
            <button class="btn-adopt" onclick="adoptionPage.showAdoptionForm('${pet.id}')">Adopt Me</button>
          </div>
        </div>
      `;
      petsGrid.appendChild(card);
    });
  }

  showPetDetails(petId) {
    const pet = this.pets.find(p => p.id === petId);
    if (!pet) return;
    openPetModal(petId);
  }

  showAdoptionForm(petId) {
    const formSection = document.querySelector('.form-section');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
    const petSelect = document.getElementById('petSelect');
    if (petSelect) petSelect.value = petId;
  }

  closeModal() {
    closePetModal();
  }

  handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (!email) return this.showErrorMessage('Please enter your email address.');
    showNotification(`Subscribed with ${email}!`, 'success');
    e.target.reset();
  }

  handleAdoptionSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!this.validateForm(form)) return;
    submitAdoptionForm(form);
  }

  validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('error');
      }
    });
    return valid;
  }

  toggleFavorite(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('active')) {
      icon.classList.remove('fa-regular'); icon.classList.add('fa-solid');
      showNotification('Added to favorites!', 'success');
    } else {
      icon.classList.remove('fa-solid'); icon.classList.add('fa-regular');
      showNotification('Removed from favorites', 'info');
    }
  }

  initializeAnimations() {
    // AOS animations
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 100 });
    // Hero and stats counters
    initCounterAnimation();
    initHeroStatsCounter();
  }

  showSuccessMessage(msg) {
    showNotification(msg, 'success');
  }

  showErrorMessage(msg) {
    showNotification(msg, 'error');
  }
}

/* ===== NOTIFICATIONS ===== */
function showNotification(message, type = 'info') {
  const existing = document.querySelectorAll('.message-notification');
  existing.forEach(e => e.remove());
  const div = document.createElement('div');
  div.className = `message-notification ${type}`;
  div.textContent = message;
  div.style.cssText = `
    position: fixed; top: 20px; right: 20px;
    background: ${type==='success'? '#48bb78' : type==='error'? '#f56565' : '#3182ce'};
    color: #fff; padding: 1rem 1.5rem; border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index:1001; max-width:400px; font-weight:500;
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

/* ===== INIT ADOPTION PAGE ===== */
document.addEventListener('DOMContentLoaded', () => {
  window.adoptionPage = new AdoptionPage();
});
