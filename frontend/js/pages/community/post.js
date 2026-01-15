const postsContainer = document.getElementById("posts-container");
const loader = document.getElementById("loader");

let postsData = [];
let postIndex = 0;

async function loadPostsJSON() {
  try {
    const response = await fetch("../../assets/data/posts.json"); // ensure this path is correct
    postsData = await response.json();

    // Load initial 3 posts
    loadPost(3);
  } catch (err) {
    console.error("Failed to load posts:", err);
    loader.innerText = "Failed to load posts";
  }
}

// Load posts into DOM
function loadPost(count = 3) {
  if (postIndex >= postsData.length) {
    loader.innerText = "No more posts";
    return;
  }

  for (let i = 0; i < count && postIndex < postsData.length; i++, postIndex++) {
    const post = postsData[postIndex];

    const postCard = document.createElement("div");
    postCard.className = "post-card";
    postCard.innerHTML = `
      <div class="post-header">
        <img src="${post.avatar}" alt="${post.username}">
        <span class="username">${post.username}</span>
      </div>

      <div class="post-image">
        <img src="${post.image}" alt="Post image">
      </div>

      <div class="subheading post-desc">
        ${post.desc}
      </div>

      <div class="post-actions">
        <i class="fa-regular fa-heart like-btn"></i>
        <i class="fa-regular fa-comment comment-btn"></i>
        <i class="fa-regular fa-bookmark save-btn"></i>
      </div>

      <div class="post-stats">
        <span class="likes-count">${post.likes}</span> likes • 
        <span class="comments-count">${post.comments}</span> comments
      </div>

      <div class="comment-panel column" style="display:none;">
        <div class="comments-list column"></div>
        <input class="input comment-input" type="text" placeholder="Write a comment...">
        <button class="btn add-comment-btn">Post</button>
        <p class="no-comment text-sm">No comments yet</p>
      </div>
    `;
    postsContainer.appendChild(postCard);

    // =========================
    // Add interaction listeners
    // =========================
    const likeBtn = postCard.querySelector(".like-btn");
    const saveBtn = postCard.querySelector(".save-btn");
    const commentBtn = postCard.querySelector(".comment-btn");
    const commentPanel = postCard.querySelector(".comment-panel");
    const addCommentBtn = postCard.querySelector(".add-comment-btn");
    const commentInput = postCard.querySelector(".comment-input");
    const commentsList = postCard.querySelector(".comments-list");
    const noComment = postCard.querySelector(".no-comment");
    const likesCount = postCard.querySelector(".likes-count");
    const commentsCount = postCard.querySelector(".comments-count");

    // Like
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("active");
      likeBtn.classList.contains("active") 
        ? likeBtn.classList.replace("fa-regular", "fa-solid")
        : likeBtn.classList.replace("fa-solid", "fa-regular");

      let likes = parseInt(likesCount.textContent);
      likes = likeBtn.classList.contains("active") ? likes + 1 : likes - 1;
      likesCount.textContent = likes;
    });

    // Save
    saveBtn.addEventListener("click", () => {
      saveBtn.classList.toggle("active");
      saveBtn.classList.contains("active")
        ? saveBtn.classList.replace("fa-regular", "fa-solid")
        : saveBtn.classList.replace("fa-solid", "fa-regular");
    });

    // Comment toggle
    commentBtn.addEventListener("click", () => {
      commentPanel.style.display = commentPanel.style.display === "flex" ? "none" : "flex";
      updateNoCommentText();
    });

    // Add comment
    addCommentBtn.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if(text !== "") {
        const commentEl = document.createElement("div");
        commentEl.classList.add("comment-item");
        commentEl.textContent = text;
        commentsList.appendChild(commentEl);

        // Update comment count
        let comments = parseInt(commentsCount.textContent);
        comments += 1;
        commentsCount.textContent = comments;

        commentInput.value = "";
        updateNoCommentText();
      }
    });

    function updateNoCommentText() {
      noComment.style.display = commentsList.children.length === 0 ? "block" : "none";
    }

    updateNoCommentText(); // initial check
  }
}

// Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadPost();
  }
});

loadPostsJSON();

// Modal
const createPostBtn = document.querySelector(".create-post-btn");
const modal = document.getElementById("createPostModal");
const closeModal = modal.querySelector(".close-modal");
const submitPostBtn = modal.querySelector(".submit-post-btn");
const postDescInput = modal.querySelector(".post-desc-input");
const postImageInput = modal.querySelector(".post-image-input");

createPostBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.style.display = "none";
  }
});

// Add Post
submitPostBtn.addEventListener("click", () => {
  const desc = postDescInput.value.trim();
  const imageFile = postImageInput.files[0];

  if(!desc && !imageFile) return alert("Add description or image");

  const postCard = document.createElement("div");
  postCard.className = "post-card";
  postCard.innerHTML = `
    <div class="post-header">
      <img src="https://picsum.photos/seed/new/100" alt="You">
      <span class="username">You</span>
    </div>
    <div class="post-image">
      ${imageFile ? `<img src="${URL.createObjectURL(imageFile)}">` : ""}
    </div>
    <div class="subheading post-desc">
      ${desc}
    </div>
    <div class="post-actions">
      <i class="fa-regular fa-heart like-btn"></i>
      <i class="fa-regular fa-comment comment-btn"></i>
      <i class="fa-regular fa-bookmark save-btn"></i>
    </div>
    <div class="post-stats">
      <span class="likes-count">0</span> likes • 
      <span class="comments-count">0</span> comments
    </div>
    <div class="comment-panel column" style="display:none;">
      <div class="comments-list column"></div>
      <input class="input comment-input" type="text" placeholder="Write a comment...">
      <button class="btn add-comment-btn">Post</button>
      <p class="no-comment text-sm">No comments yet</p>
    </div>
  `;

  postsContainer.prepend(postCard); // add to top

  // Reset modal
  postDescInput.value = "";
  postImageInput.value = "";
  modal.style.display = "none";

  // Reattach listeners for the new post
  attachPostListeners(postCard);
});

// Function to attach likes/comments/save listeners
function attachPostListeners(postCard){
  const likeBtn = postCard.querySelector(".like-btn");
  const saveBtn = postCard.querySelector(".save-btn");
  const commentBtn = postCard.querySelector(".comment-btn");
  const commentPanel = postCard.querySelector(".comment-panel");
  const addCommentBtn = postCard.querySelector(".add-comment-btn");
  const commentInput = postCard.querySelector(".comment-input");
  const commentsList = postCard.querySelector(".comments-list");
  const noComment = postCard.querySelector(".no-comment");
  const likesCount = postCard.querySelector(".likes-count");
  const commentsCount = postCard.querySelector(".comments-count");

  // Like
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("active");
    likeBtn.style.color = likeBtn.classList.contains("active") ? "red" : "var(--primary-color)";
    let likes = parseInt(likesCount.textContent);
    likes = likeBtn.classList.contains("active") ? likes + 1 : likes - 1;
    likesCount.textContent = likes;
  });

  // Save
  saveBtn.addEventListener("click", () => {
    saveBtn.classList.toggle("active");
    saveBtn.style.color = saveBtn.classList.contains("active") ? "green" : "var(--primary-color)";
  });

  // Comment toggle
  commentBtn.addEventListener("click", () => {
    commentPanel.style.display = commentPanel.style.display === "flex" ? "none" : "flex";
    noComment.style.display = commentsList.children.length === 0 ? "block" : "none";
  });

  // Add comment
  addCommentBtn.addEventListener("click", () => {
    const text = commentInput.value.trim();
    if(text !== ""){
      const commentEl = document.createElement("div");
      commentEl.classList.add("comment-item");
      commentEl.textContent = text;
      commentsList.appendChild(commentEl);

      let comments = parseInt(commentsCount.textContent);
      comments += 1;
      commentsCount.textContent = comments;

      commentInput.value = "";
      noComment.style.display = "none";
    }
  });
}