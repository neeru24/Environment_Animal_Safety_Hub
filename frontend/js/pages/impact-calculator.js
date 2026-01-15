// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Initialize quiz navigation
    initQuizNavigation();
});

// Quiz Navigation
function initQuizNavigation() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 5;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const currentStepEl = document.getElementById('currentStep');
    const formProgress = document.getElementById('formProgress');
    const steps = document.querySelectorAll('.step');
    const questionGroups = document.querySelectorAll('.question-group');

    // Start Calculator Button
    const startCalculatorBtn = document.getElementById('startCalculatorBtn');
    if (startCalculatorBtn) {
        startCalculatorBtn.addEventListener('click', function() {
            document.getElementById('calculatorForm').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Update progress
    function updateProgress() {
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        formProgress.style.width = `${progressPercentage}%`;
        currentStepEl.textContent = currentStep;
        
        // Update step indicators
        steps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Show/hide navigation buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.style.display = currentStep === totalSteps ? 'none' : 'flex';
        submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
        
        // Show current question group
        questionGroups.forEach(group => {
            const groupStep = parseInt(group.getAttribute('data-step'));
            if (groupStep === currentStep) {
                group.style.display = 'block';
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateX(0)';
                }, 10);
            } else {
                group.style.display = 'none';
                group.style.opacity = '0';
                group.style.transform = 'translateX(20px)';
            }
        });
    }

    // Next button click
    nextBtn.addEventListener('click', function() {
        const currentGroup = document.querySelector(`.question-group[data-step="${currentStep}"]`);
        const selects = currentGroup.querySelectorAll('select[required]');
        let isValid = true;
        
        selects.forEach(select => {
            if (!select.value) {
                isValid = false;
                select.style.borderColor = '#f44336';
                setTimeout(() => {
                    select.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (isValid) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateProgress();
                document.getElementById('calculatorForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            alert('Please answer all questions before proceeding.');
        }
    });

    // Previous button click
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateProgress();
            document.getElementById('calculatorForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Form submission
    const impactForm = document.getElementById('impactForm');
    impactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateImpact();
    });

    // Initialize
    updateProgress();

    // Tooltips
    const helpElements = document.querySelectorAll('.question-help');
    helpElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            // Tooltip already handled by CSS
        });
    });

    // Form validation
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#4caf50';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 1000);
            }
        });
    });
}

// Calculate Impact Function
function calculateImpact() {
    const formData = new FormData(document.getElementById('impactForm'));
    const data = Object.fromEntries(formData);
    
    // Scoring system
    let totalScore = 0;
    const categoryScores = {
        transport: 0,
        energy: 0,
        diet: 0,
        water: 0,
        waste: 0
    };

    // Transport scoring (20 points max)
    const transportScores = {
        'walk': 5, 'public': 4, 'bike': 3, 'car': 2, 'multiple': 1
    };
    const distanceScores = {
        'low': 4, 'medium': 3, 'high': 2, 'very-high': 1
    };
    categoryScores.transport = transportScores[data.transport] + distanceScores[data.distance];
    totalScore += categoryScores.transport;

    // Energy scoring (20 points max)
    const electricityScores = {
        'low': 5, 'medium': 4, 'high': 3, 'very-high': 2
    };
    const hvacScores = {
        'none': 5, 'minimal': 4, 'moderate': 3, 'heavy': 2
    };
    categoryScores.energy = electricityScores[data.electricity] + hvacScores[data.hvac];
    totalScore += categoryScores.energy;

    // Diet scoring (20 points max)
    const dietScores = {
        'vegan': 5, 'vegetarian': 4, 'pescatarian': 3, 'omnivore': 2, 'meat-heavy': 1
    };
    const wasteScores = {
        'minimal': 5, 'some': 4, 'moderate': 3, 'high': 2
    };
    categoryScores.diet = dietScores[data.diet] + wasteScores[data['food-waste']];
    totalScore += categoryScores.diet;

    // Water scoring (20 points max)
    const showerScores = {
        'short': 5, 'medium': 4, 'long': 3, 'very-long': 2
    };
    const waterScores = {
        'excellent': 5, 'good': 4, 'average': 3, 'poor': 2
    };
    categoryScores.water = showerScores[data.shower] + waterScores[data['water-conservation']];
    totalScore += categoryScores.water;

    // Waste scoring (20 points max)
    const plasticScores = {
        'minimal': 5, 'low': 4, 'moderate': 3, 'high': 2
    };
    const shoppingScores = {
        'minimal': 5, 'conscious': 4, 'regular': 3, 'frequent': 2
    };
    categoryScores.waste = plasticScores[data.plastic] + shoppingScores[data.shopping];
    totalScore += categoryScores.waste;

    // Normalize to 100
    totalScore = Math.round((totalScore / 100) * 100);
    
    // Show results
    showResults(totalScore, categoryScores, data);
}

function showResults(totalScore, categoryScores, data) {
    // Hide form, show results
    document.getElementById('calculatorForm').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('trackingSection').style.display = 'block';
    
    // Update total score
    document.getElementById('totalScore').textContent = totalScore;
    
    // Determine score level
    let scoreLevel = '';
    let scoreMessage = '';
    let scoreColor = '';
    
    if (totalScore >= 80) {
        scoreLevel = 'Eco Warrior 🌟';
        scoreMessage = 'Excellent! You\'re living sustainably and setting a great example for others.';
        scoreColor = '#4caf50';
    } else if (totalScore >= 60) {
        scoreLevel = 'Eco Conscious 🌱';
        scoreMessage = 'Good job! You\'re making eco-friendly choices but there\'s room for improvement.';
        scoreColor = '#8bc34a';
    } else if (totalScore >= 40) {
        scoreLevel = 'Average Impact 📊';
        scoreMessage = 'You\'re aware of environmental issues but could adopt more sustainable practices.';
        scoreColor = '#ff9800';
    } else {
        scoreLevel = 'Needs Improvement 🚨';
        scoreMessage = 'Your environmental impact is high. Consider adopting more eco-friendly habits.';
        scoreColor = '#f44336';
    }
    
    document.getElementById('scoreLevel').textContent = scoreLevel;
    document.getElementById('scoreMessage').textContent = scoreMessage;
    document.getElementById('scoreLevel').style.color = scoreColor;
    
    // Update score circle
    const scoreCircle = document.getElementById('scoreCircle');
    scoreCircle.style.background = `conic-gradient(${scoreColor} ${totalScore * 3.6}deg, var(--border-color) 0deg)`;
    
    // Update user bar
    const userBar = document.getElementById('userBar');
    const userImpact = document.getElementById('userImpact');
    const co2Value = Math.round((100 - totalScore) * 25); // Convert score to CO2 estimate
    userBar.style.width = `${(co2Value / 3000) * 100}%`;
    userImpact.textContent = `${co2Value} kg CO₂/year`;
    
    // Create chart
    createChart(categoryScores);
    
    // Generate recommendations
    generateRecommendations(data, totalScore);
    
    // Add event listeners to action buttons
    document.getElementById('saveResultsBtn').addEventListener('click', saveResults);
    document.getElementById('shareResultsBtn').addEventListener('click', shareResults);
    document.getElementById('retakeQuizBtn').addEventListener('click', retakeQuiz);
    
    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

function createChart(categoryScores) {
    const ctx = document.getElementById('breakdownChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.breakdownChart) {
        window.breakdownChart.destroy();
    }
    
    const colors = ['#2e7d32', '#4caf50', '#8bc34a', '#cddc39', '#ffc107'];
    
    window.breakdownChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Transport', 'Energy', 'Diet', 'Water', 'Waste'],
            datasets: [{
                data: [
                    categoryScores.transport * 5,
                    categoryScores.energy * 5,
                    categoryScores.diet * 5,
                    categoryScores.water * 5,
                    categoryScores.waste * 5
                ],
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'var(--text-primary)',
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function generateRecommendations(data, totalScore) {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    const recommendations = [];
    
    // Transport recommendations
    if (data.transport === 'car' || data.transport === 'multiple') {
        recommendations.push({
            icon: '🚌',
            title: 'Use Public Transport',
            description: 'Switch to public transport or carpool to reduce emissions.'
        });
    }
    
    if (data.distance === 'high' || data.distance === 'very-high') {
        recommendations.push({
            icon: '🚲',
            title: 'Reduce Travel Distance',
            description: 'Combine errands and plan efficient routes to minimize travel.'
        });
    }
    
    // Energy recommendations
    if (data.electricity === 'high' || data.electricity === 'very-high') {
        recommendations.push({
            icon: '💡',
            title: 'Switch to LED Bulbs',
            description: 'Replace incandescent bulbs with energy-efficient LEDs.'
        });
    }
    
    if (data.hvac === 'heavy' || data.hvac === 'moderate') {
        recommendations.push({
            icon: '🌡️',
            title: 'Optimize AC/Heater Use',
            description: 'Use programmable thermostats and maintain optimal temperatures.'
        });
    }
    
    // Diet recommendations
    if (data.diet === 'meat-heavy' || data.diet === 'omnivore') {
        recommendations.push({
            icon: '🥗',
            title: 'Reduce Meat Consumption',
            description: 'Try meatless days or plant-based alternatives.'
        });
    }
    
    if (data['food-waste'] === 'high' || data['food-waste'] === 'moderate') {
        recommendations.push({
            icon: '♻️',
            title: 'Reduce Food Waste',
            description: 'Plan meals, store food properly, and compost organic waste.'
        });
    }
    
    // Water recommendations
    if (data.shower === 'long' || data.shower === 'very-long') {
        recommendations.push({
            icon: '🚿',
            title: 'Shorten Showers',
            description: 'Aim for 5-minute showers to save water.'
        });
    }
    
    if (data['water-conservation'] === 'poor' || data['water-conservation'] === 'average') {
        recommendations.push({
            icon: '💧',
            title: 'Install Water-Saving Fixtures',
            description: 'Use low-flow showerheads and faucet aerators.'
        });
    }
    
    // Waste recommendations
    if (data.plastic === 'high' || data.plastic === 'moderate') {
        recommendations.push({
            icon: '🛍️',
            title: 'Avoid Single-Use Plastics',
            description: 'Use reusable bags, bottles, and containers.'
        });
    }
    
    if (data.shopping === 'frequent' || data.shopping === 'regular') {
        recommendations.push({
            icon: '📦',
            title: 'Practice Conscious Consumption',
            description: 'Buy only what you need and choose quality over quantity.'
        });
    }
    
    // Add general recommendations based on score
    if (totalScore < 60) {
        recommendations.push({
            icon: '📚',
            title: 'Learn More About Sustainability',
            description: 'Educate yourself on environmental issues and solutions.'
        });
    }
    
    if (totalScore > 70) {
        recommendations.push({
            icon: '🌟',
            title: 'Share Your Knowledge',
            description: 'Inspire others by sharing your eco-friendly practices.'
        });
    }
    
    // Display recommendations (max 6)
    recommendations.slice(0, 6).forEach(rec => {
        const recItem = document.createElement('div');
        recItem.className = 'recommendation-item';
        recItem.innerHTML = `
            <div class="recommendation-icon">${rec.icon}</div>
            <div class="recommendation-content">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `;
        recommendationsList.appendChild(recItem);
    });
}

function saveResults() {
    const totalScore = document.getElementById('totalScore').textContent;
    const scoreLevel = document.getElementById('scoreLevel').textContent;
    const date = new Date().toLocaleDateString();
    
    // In a real app, you would save to localStorage or backend
    const result = {
        date: date,
        score: totalScore,
        level: scoreLevel
    };
    
    alert(`Results saved for ${date}! Score: ${totalScore} - ${scoreLevel}`);
}

function shareResults() {
    const totalScore = document.getElementById('totalScore').textContent;
    const scoreLevel = document.getElementById('scoreLevel').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Environmental Impact Score',
            text: `I got ${totalScore}/100 (${scoreLevel}) on the EcoLife Environmental Impact Calculator! 🌱`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const text = `My Environmental Impact Score: ${totalScore}/100 (${scoreLevel})\nTake the quiz at: ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('Results copied to clipboard! Share it with your friends.');
        }).catch(() => {
            alert('Could not copy to clipboard. Please manually share the results.');
        });
    }
}

function retakeQuiz() {
    // Reset form
    document.getElementById('impactForm').reset();
    document.getElementById('calculatorForm').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('trackingSection').style.display = 'none';
    
    // Reset to step 1
    document.getElementById('currentStep').textContent = '1';
    document.getElementById('formProgress').style.width = '20%';
    
    // Reset steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector('.step[data-step="1"]').classList.add('active');
    
    // Reset question groups
    document.querySelectorAll('.question-group').forEach((group, index) => {
        if (index === 0) {
            group.style.display = 'block';
        } else {
            group.style.display = 'none';
        }
    });
    
    // Reset navigation buttons
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').style.display = 'flex';
    document.getElementById('submitBtn').style.display = 'none';
    
    // Scroll to form
    document.getElementById('calculatorForm').scrollIntoView({ behavior: 'smooth' });
    
    // Reinitialize quiz
    initQuizNavigation();
}
