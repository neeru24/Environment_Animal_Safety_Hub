/* ===== FORM HANDLERS ===== */

function initFormHandlers() {
  // Report Form
  const reportForm = document.getElementById("reportForm");
  if (reportForm) {
    reportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleReportSubmit(this);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleNewsletterSubmit(this);
    });
  }

  // File upload preview
  const fileInput = document.querySelector('.file-upload input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0]?.name;
      const label = this.parentElement.querySelector(".file-upload-label span");
      if (fileName && label) {
        label.textContent = fileName;
      }
    });
  }
}

function handleReportSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Reset button
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Report Submitted!';
    submitBtn.style.background = "linear-gradient(135deg, #4caf50, #2e7d32)";

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;

      // Show success message
      showNotification(
        "Report submitted successfully! We will review it shortly.",
        "success"
      );
    }, 2000);
  }, 1500);
}

function handleNewsletterSubmit(form) {
  const email = form.querySelector('input[type="email"]').value;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      showNotification(
        "Thank you for subscribing to our newsletter!",
        "success"
      );
    }, 2000);
  }, 1000);
}