// Game Data: Items and their correct types
const wasteItems = [
  { name: "Banana Peel", type: "wet", icon: "fa-carrot" }, // representing food
  { name: "Newspaper", type: "dry", icon: "fa-newspaper" },
  { name: "Battery", type: "hazard", icon: "fa-battery-full" },
  { name: "Plastic Bottle", type: "dry", icon: "fa-bottle-water" },
  { name: "Apple Core", type: "wet", icon: "fa-apple-whole" },
  { name: "Coke Can", type: "dry", icon: "fa-can-food" }, // using can icon
  { name: "Old Medicine", type: "hazard", icon: "fa-pills" },
  { name: "Cardboard Box", type: "dry", icon: "fa-box-open" }
];

let score = 0;
let currentItem = null;

const draggable = document.getElementById('draggable-item');
const bins = document.querySelectorAll('.bin');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('game-message');
const restartBtn = document.getElementById('restart-btn');

// Initialize Game
function startGame() {
  // Hide button, clear message
  restartBtn.style.display = 'none';
  messageDisplay.textContent = "Drag the item to the correct bin!";
  messageDisplay.className = "";
  
  // Pick random item
  const randomIndex = Math.floor(Math.random() * wasteItems.length);
  currentItem = wasteItems[randomIndex];
  
  // Update UI
  draggable.querySelector('span').textContent = currentItem.name;
  draggable.querySelector('i').className = `fa-solid ${currentItem.icon}`;
  draggable.setAttribute('draggable', 'true');
  draggable.style.opacity = "1";
  draggable.style.cursor = "grab";
}

// Drag Events
draggable.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', currentItem.type);
  setTimeout(() => draggable.style.display = "none", 0); // Hide element while dragging
});

draggable.addEventListener('dragend', () => {
  draggable.style.display = "flex"; // Show again if dropped
});

// Bin Events
bins.forEach(bin => {
  // Allow drop
  bin.addEventListener('dragover', (e) => {
    e.preventDefault();
    bin.classList.add('drag-over');
  });

  bin.addEventListener('dragleave', () => {
    bin.classList.remove('drag-over');
  });

  bin.addEventListener('drop', (e) => {
    e.preventDefault();
    bin.classList.remove('drag-over');
    
    const type = bin.getAttribute('data-type');
    checkAnswer(type);
  });
});

function checkAnswer(selectedBinType) {
  if (selectedBinType === currentItem.type) {
    // Correct
    score += 10;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = `✅ Correct! ${currentItem.name} goes in ${selectedBinType} waste.`;
    messageDisplay.className = "success";
    draggable.setAttribute('draggable', 'false'); // Disable dragging
    draggable.style.cursor = "default";
    draggable.style.opacity = "0.5";
    playSuccessAnimation();
  } else {
    // Wrong
    messageDisplay.textContent = `❌ Oops! ${currentItem.name} is ${currentItem.type} waste.`;
    messageDisplay.className = "error";
  }
  
  // Show "Next" button
  restartBtn.style.display = "inline-block";
}

function playSuccessAnimation() {
    // Simple visual cue logic can be added here
    scoreDisplay.style.transform = "scale(1.5)";
    setTimeout(() => scoreDisplay.style.transform = "scale(1)", 200);
}

// Start immediately on load
startGame();