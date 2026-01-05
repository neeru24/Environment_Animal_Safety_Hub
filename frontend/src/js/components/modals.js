/* ===== MODAL SYSTEM ===== */

// Data for all popups
const modalContent = {
    'animal-rescue': {
        icon: 'fa-truck-medical',
        title: 'Animal Rescue Services',
        body: `
            <p>Our rescue team works 24/7 to help injured and abandoned animals. We provide emergency medical care, rehabilitation, and shelter.</p>
            <h4>How it works:</h4>
            <ul>
                <li>Report an injured animal via our helpline or app.</li>
                <li>Our rescue van reaches the location within 30-60 mins.</li>
                <li>Animal receives immediate first-aid and transport to shelter.</li>
            </ul>
            <p><strong>Emergency Helpline: +91 98765 43210</strong></p>
        `
    },
    'waste-mgmt': {
        icon: 'fa-recycle',
        title: 'Waste Management',
        body: `
            <p>We help communities implement effective waste segregation and recycling systems.</p>
            <h4>Our Initiatives:</h4>
            <ul>
                <li>Door-to-door dry waste collection.</li>
                <li>Composting workshops for wet waste.</li>
                <li>E-waste recycling drives every weekend.</li>
            </ul>
        `
    },
    'climate-action': {
        icon: 'fa-cloud-sun',
        title: 'Climate Action Awareness',
        body: `
            <p>Join our movement to combat climate change through local actions and global awareness.</p>
            <p>We organize weekly seminars, school programs, and policy advocacy campaigns to push for greener regulations.</p>
        `
    },
    'tree-plant': {
        icon: 'fa-seedling',
        title: 'Tree Plantation Drives',
        body: `
            <p>Help us turn the city green! We organize massive plantation drives every Sunday.</p>
            <h4>Join us:</h4>
            <ul>
                <li><strong>When:</strong> Every Sunday, 7:00 AM</li>
                <li><strong>Where:</strong> City Park & Outskirts</li>
                <li><strong>Provided:</strong> Saplings, tools, and refreshments.</li>
            </ul>
        `
    },
    'adopt-pets': {
        icon: 'fa-paw',
        title: 'Adopt, Don\'t Shop',
        body: `
            <p>Give a loving home to a rescued animal. We have dogs, cats, and rabbits waiting for a family.</p>
            <p>Process involves: Application > House Visit > Adoption. All pets are vaccinated and sterilized.</p>
            <a href="pet-adoption.html" class="btn btn-primary" style="margin-top:10px;">View Available Pets</a>
        `
    },
    'wildlife': {
        icon: 'fa-shield-cat',
        title: 'Wildlife Protection',
        body: `
            <p>We work to protect urban wildlife including birds, squirrels, and reptiles from urban hazards.</p>
            <p>Learn how to coexist with nature and what to do if you spot wild animals in distress.</p>
        `
    },
    'feeding': {
        icon: 'fa-bowl-food',
        title: 'Stray Feeding Program',
        body: `
            <p>Hunger is the biggest enemy of stray animals. Join our community feeding program.</p>
            <h4>Guidelines:</h4>
            <ul>
                <li>Feed at designated spots away from traffic.</li>
                <li>Use eco-friendly bowls or clean up afterwards.</li>
                <li>Provide fresh water along with food.</li>
            </ul>
        `
    },
    'plastic': {
        icon: 'fa-bottle-water',
        title: 'Reduce Plastic Usage',
        body: `
            <p>Plastic takes up to 1000 years to decompose. Here are simple tips to reduce it:</p>
            <ul>
                <li>Carry your own cloth bag.</li>
                <li>Use a reusable water bottle.</li>
                <li>Say no to plastic straws and cutlery.</li>
            </ul>
        `
    },
    'energy': {
        icon: 'fa-lightbulb',
        title: 'Save Energy Tips',
        body: `
            <p>Saving energy saves money and the planet.</p>
            <ul>
                <li>Switch to LED bulbs.</li>
                <li>Unplug electronics when not in use.</li>
                <li>Use natural light during the day.</li>
            </ul>
        `
    },
    'tree-drive': {
        icon: 'fa-tree',
        title: 'Join Our Plantation Drive',
        body: `
            <p>Next Drive Details:</p>
            <p><strong>Location:</strong> Central Park Zone B<br><strong>Date:</strong> This Sunday<br><strong>Time:</strong> 8:00 AM - 11:00 AM</p>
            <p>Bring your friends and family!</p>
        `
    }
};

// Initialize Modal System
function initModalSystem() {
    const modal = document.getElementById('infoModal');
    const closeBtn = document.querySelector('.custom-modal-close');
    const modalButtons = document.querySelectorAll('.open-modal-btn');
    
    // Open Modal
    modalButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-id');
            const content = modalContent[contentId];
            
            if (content) {
                // Populate content
                document.getElementById('modalHeader').innerHTML = `
                    <i class="fa-solid ${content.icon}"></i>
                    <h2>${content.title}</h2>
                `;
                document.getElementById('modalBody').innerHTML = content.body;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close functions
    window.closeInfoModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeInfoModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeInfoModal();
        }
    });
}