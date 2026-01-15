  const editBtn = document.getElementById('editBtn');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const emailDisplay = document.getElementById('emailDisplay');
  const usernameInput = document.getElementById('usernameInput');
  const emailInput = document.getElementById('emailInput');
  const profilePic = document.getElementById('profilePic');

  // Initialize inputs
  usernameInput.value = usernameDisplay.textContent;
  emailInput.value = emailDisplay.textContent;

  let editing = false;

  editBtn.addEventListener('click', () => {
    if(!editing){
      usernameDisplay.style.display = 'none';
      emailDisplay.style.display = 'none';
      usernameInput.style.display = 'block';
      emailInput.style.display = 'block';
      editBtn.textContent = 'Save Changes';
      editing = true;
    } else {
      usernameDisplay.textContent = usernameInput.value;
      emailDisplay.textContent = emailInput.value;
      usernameDisplay.style.display = 'block';
      emailDisplay.style.display = 'block';
      usernameInput.style.display = 'none';
      emailInput.style.display = 'none';
      editBtn.textContent = 'Edit Profile';
      editing = false;
      console.log('Saved:', usernameDisplay.textContent, emailDisplay.textContent);
    }
  });

  profilePic.addEventListener('click', () => {
    const url = prompt('Enter new profile picture URL:');
    if(url) profilePic.src = url;
  });


  function handleProfileChange(value) {
  if(value === "community") {
    window.location.href = "./community/";
  } else if(value === "logout") {
    // You can handle logout logic here
    alert("Logging out...");
    // Example: redirect to login page
    window.location.href = "./login.html";
  } else if(value === "profile") {
    window.location.href = "./profile.html"; // or wherever your profile page is
  }
}