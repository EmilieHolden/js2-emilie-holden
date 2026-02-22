import { createPost } from "../api/post";
import { validateForm } from "../utils";

export function addPostForm() {
  return `  
      <form id="add-post-form" class="add-post-form">
        <div>
          <label for="title">Title</label>
          <input name="title" type="text" id="title" placeholder="What are you up to?"  />
        </div>
  
        <div>
          <label for="body">Caption</label>
          <input name="body" type="text" id="body" placeholder="Write your caption here..." />
        </div>
  
        <div>
          <label for="imageUrl">Image URL</label>
          <input name="imageUrl" type="text" id="imageUrl" placeholder="Paste your image URL here" />
        </div>
  
        <div>
        <div class="add-post-cancel-btn-container">
          <button type="submit" class="primary-btn">Add post</button>
          <button type="button" class="primary-btn" id="cancel-add-post">Cancel</button>
        </div>
        </div>
      </form>
    `;
}

function setupAddPostOverlay() {
  const feedTop = document.getElementById("feed-top");
  if (!feedTop) return;
  if (document.getElementById("add-post-overlay")) return;

  feedTop.insertAdjacentHTML(
    "beforeend",
    `
  <dialog id="add-post-overlay">
    <div class="add-post-form-overlay">
      ${addPostForm()}
    </div>
  </dialog>
  `
  );

  const overlay = document.getElementById("add-post-overlay");
  const openBtn = document.getElementById("open-add-post");
  const newPostForm = overlay?.querySelector("#add-post-form");

  overlay.querySelector("#cancel-add-post")
    ?.addEventListener("click", () => overlay.close());

  openBtn?.addEventListener("click", () => overlay.showModal());

  newPostForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(newPostForm)) return

    const formData = new FormData(newPostForm)

    const payload = {
      title: formData.get("title")?.trim(),
      body: formData.get("body")?.trim(),
      media: formData.get("imageUrl")
        ? {
          url: formData.get("imageUrl").trim(),
          alt: "post image",
        }
        : undefined,
    }

    await createPost(payload)

    overlay.close();
    newPostForm.reset()
    window.location.reload()
  });
}

setupAddPostOverlay(); 
