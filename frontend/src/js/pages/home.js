/* ===== HOME PAGE SPECIFIC ===== */

function initEcoChallenges() {
  const challengeButtons = document.querySelectorAll(".challenge-btn");

  if (challengeButtons.length === 0) return;

  challengeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("completed")) return;

      btn.classList.add("completed");
      btn.innerText = "Completed ✔";
      btn.disabled = true;

      // Use existing notification system
      showNotification(
        "Great job! 🌱 Small actions create a big impact.",
        "success"
      );
    });
  });
}

document.getElementById("carbonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let score = 0;
  const tips = [];

  const transport = document.getElementById("transport").value;
  const electricity = document.getElementById("electricity").value;
  const plastic = document.getElementById("plastic").value;

  // Transport score
  if (transport === "walk") score += 5;
  else if (transport === "public") score += 15;
  else if (transport === "bike") score += 25;
  else if (transport === "car") {
    score += 40;
    tips.push("Use public transport or carpool whenever possible.");
  }

  // Electricity score
  if (electricity === "low") score += 10;
  else if (electricity === "medium") {
    score += 25;
    tips.push("Switch to LED bulbs and turn off unused appliances.");
  } else if (electricity === "high") {
    score += 40;
    tips.push("Reduce AC usage and use energy-efficient appliances.");
  }

  // Plastic score
  if (plastic === "low") score += 10;
  else if (plastic === "medium") {
    score += 20;
    tips.push("Carry a cloth bag and avoid plastic packaging.");
  } else if (plastic === "high") {
    score += 35;
    tips.push("Replace single-use plastics with reusable alternatives.");
  }

  // Result level
  let level = "";
  if (score <= 40) level = "🌱 Low Footprint – Great job!";
  else if (score <= 80) level = "🌿 Medium Footprint – You can improve!";
  else level = "🔥 High Footprint – Time to take action!";

  // Display result
  const resultDiv = document.getElementById("carbonResult");
  document.getElementById("carbonScore").innerText = score;
  document.getElementById("carbonLevel").innerText = level;

  const tipsList = document.getElementById("carbonTips");
  tipsList.innerHTML = "";
  tips.forEach(tip => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="fa-solid fa-lightbulb"></i> ${tip}`;
    tipsList.appendChild(li);
  });

  resultDiv.style.display = "block";
  resultDiv.classList.add("success");

  // Scroll to result
  resultDiv.scrollIntoView({ behavior: "smooth", block: "center" });
});

const glossaryData = [
  {
    term: "Biodiversity",
    definition: "The variety of plants, animals, and living organisms on Earth."
  },
  {
    term: "Carbon Footprint",
    definition: "The amount of greenhouse gases released due to human activities."
  },
  {
    term: "Climate Change",
    definition: "Long-term changes in temperature and weather patterns."
  },
  {
    term: "Renewable Energy",
    definition: "Energy that comes from natural sources like sunlight and wind."
  },
  {
    term: "Sustainability",
    definition: "Using resources wisely so future generations can meet their needs."
  },
  {
    term: "Recycling",
    definition: "The process of converting waste into reusable materials."
  },
  {
    term: "Deforestation",
    definition: "Cutting down trees on a large scale, harming the environment."
  }
];

const glossaryList = document.getElementById("glossaryList");
const searchInput = document.getElementById("glossarySearch");

function renderGlossary(filter = "") {
  glossaryList.innerHTML = "";

  glossaryData
    .filter(item =>
      item.term.toLowerCase().startsWith(filter.toLowerCase()) ||
      item.term.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term))
    .forEach(item => {
      const div = document.createElement("div");
      div.className = "glossary-item";
      div.innerHTML = `
        <h4>${item.term}</h4>
        <p>${item.definition}</p>
      `;
      glossaryList.appendChild(div);
    });
}

// Initial render
renderGlossary();

// Live search
searchInput.addEventListener("input", e => {
  renderGlossary(e.target.value);
});

function toggleCard(card) {
  card.classList.toggle("flipped");
}

const ecoFacts = [
  {
    text: "Elephants can recognize themselves in mirrors, showing high intelligence.",
    category: "Animal Fact",
    icon: "🐘"
  },
  {
    text: "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    category: "Recycling Tip",
    icon: "♻️"
  },
  {
    text: "Planting trees helps absorb carbon dioxide and fight climate change.",
    category: "Climate Fact",
    icon: "🌱"
  },
  {
    text: "Plastic waste can take up to 1000 years to decompose.",
    category: "Recycling Tip",
    icon: "🧴"
  },
  {
    text: "Bees are responsible for pollinating nearly 75% of the world’s crops.",
    category: "Animal Fact",
    icon: "🐝"
  },
  {
    text: "Turning off unused lights can significantly reduce your carbon footprint.",
    category: "Climate Tip",
    icon: "💡"
  }
];

let factIndex = 0;

function showEcoFact() {
  const fact = ecoFacts[factIndex];
  document.getElementById("ecoFactText").innerText = fact.text;
  document.getElementById("factCategory").innerText = fact.category;
  document.getElementById("factIcon").innerText = fact.icon;

  factIndex = (factIndex + 1) % ecoFacts.length;
}

// Initial call
showEcoFact();

// Change fact every 5 seconds
setInterval(showEcoFact, 5000);

const plants = document.querySelectorAll(".plant");
const garden = document.getElementById("garden-plot");
const oxygenFill = document.getElementById("oxygen-fill");

let oxygen = 0;

plants.forEach(plant => {
  plant.addEventListener("dragstart", e => {
    e.dataTransfer.setData("plant", plant.outerHTML);
    e.dataTransfer.setData("oxygen", plant.dataset.oxygen);
  });
});

garden.addEventListener("dragover", e => e.preventDefault());

garden.addEventListener("drop", e => {
  e.preventDefault();

  const plantHTML = e.dataTransfer.getData("plant");
  const oxygenValue = parseInt(e.dataTransfer.getData("oxygen"));

  const placeholder = garden.querySelector("p");
  if (placeholder) placeholder.remove();

  garden.innerHTML += plantHTML;

  oxygen += oxygenValue;
  if (oxygen > 100) oxygen = 100;

  oxygenFill.style.width = oxygen + "%";
  oxygenFill.textContent = oxygen + "%";
});

const buttons = document.querySelectorAll(".sim-btn");

const impacts = {
  plastic: { animals: 80, water: 70, air: 60 },
  trees: { animals: 90, water: 60, air: 50 }
};

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const impactType = btn.dataset.impact;
    document.getElementById("animals-bar").style.width = impacts[impactType].animals + "%";
    document.getElementById("water-bar").style.width = impacts[impactType].water + "%";
    document.getElementById("air-bar").style.width = impacts[impactType].air + "%";
  });
});
