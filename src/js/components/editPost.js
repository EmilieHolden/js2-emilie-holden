import { editPost } from "../api/edit";
import { validateForm } from "../utils";

export function renderEditForm() {
    return `  
        <form id="edit-post-form" class="add-post-form">
            <div>
            <label for="title">Title</label>
            <input name="title" type="text" id="title" placeholder="What are you up to?"  />
            </div>
    
            <div>
            <label for="body">Caption</label>
            <input name="body" type="text" id="body" placeholder="Write your caption here..."  />
            </div>
    
            <div>
            <label for="imageUrl">Image URL</label>
            <input name="imageUrl" type="text" id="imageUrl" placeholder="Paste your image URL here"  />
            </div>
    
            <div>
            <button type="submit" class="primary-btn">Save</button>
            <button type="button" class="primary-btn" id="cancel-add-post">Cancel</button>
            </div>
        </form>
        `;
}


let overlay = null;
let editForm = null;
let currentPostId = null;

export function initEditPostOverlay() {
    const mainContainer = document.getElementById("profile-main-container");
    if (!mainContainer) return;

    overlay = document.getElementById("edit-post-overlay");
    if (!overlay) {
        mainContainer.insertAdjacentHTML(
            "beforeend",
            `
            <dialog id="edit-post-overlay">
                <div class="add-post-form-overlay">
                    ${renderEditForm()}
                </div>
            </dialog>
            `
        );
        overlay = document.getElementById("edit-post-overlay");
    }

    editForm = overlay.querySelector("#edit-post-form");
    const cancelBtn = overlay.querySelector("#cancel-add-post");

    cancelBtn.addEventListener("click", () => overlay.close());

    editForm.addEventListener("submit", handleSubmit);
}

export function openEditOverlayForPost(post) {
    if (!overlay || !editForm) return;

    currentPostId = post.id;
    editForm.title.value = post.title ?? "";
    editForm.body.value = post.body ?? "";
    editForm.imageUrl.value = post.media?.url ?? "";

    overlay.showModal();
}

async function handleSubmit(e) {
    e.preventDefault();
    if (!currentPostId || !validateForm(editForm)) return;

    const formData = new FormData(editForm);

    const payload = {
        title: formData.get("title").trim(),
        body: formData.get("body").trim(),
        media: formData.get("imageUrl")
            ? { url: formData.get("imageUrl").trim(), alt: "post image" }
            : undefined,
    }

    try {
        await editPost(currentPostId, payload);
        alert("Post is edited")
    } catch (error) {
        console.error(error)
    }

    overlay.close();
    editForm.reset();
    window.location.reload();
}