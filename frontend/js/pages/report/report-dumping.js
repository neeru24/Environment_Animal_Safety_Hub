const form = document.getElementById("reportForm");
    const successMsg = document.getElementById("successMsg");

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      successMsg.style.display = "block";
      form.reset();
      window.scrollTo({ top: successMsg.offsetTop - 100, behavior: "smooth" });
    });