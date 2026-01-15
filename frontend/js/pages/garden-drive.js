// --- SCROLL ANIMATION LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that need to animate
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    // Create the Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the class that resets opacity and transform
                entry.target.classList.add("is-visible");
                // Stop observing once animated (optional, but performance friendly)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom
    });

    // Attach observer to elements
    animatedElements.forEach((el) => observer.observe(el));
});

// --- FORM HANDLING LOGIC ---
const form = document.getElementById("gardenForm");
const successMsg = document.getElementById("successMsg");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simulate network delay for better UX feel
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Hide Form, Show Success
            form.style.display = "none";
            successMsg.style.display = "block";
            
            // Scroll to the success message smoothly
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset logic if you want the form to reappear later (optional)
        }, 1500);
    });
}