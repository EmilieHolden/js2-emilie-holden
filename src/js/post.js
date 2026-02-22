import { getPost } from "./api/fetchPosts";

const id = new URLSearchParams(window.location.search).get("id")
const postContainer = document.querySelector("#post-details");

async function fetchAndShowPost() {
    if (!postContainer) return

    let loading = false

    try {
        loading = true
        postContainer.innerHTML = `
    <span>Loading...</span>
    `
        const data = await getPost(id)
        const post = data.data

        postContainer.innerHTML = `<div class="card" id="post-card">
              <div class="post-image-container">
                ${post.media?.url
                ? `<img class="card-image" src="${post.media.url}" alt="${post.media.alt || "Post image"}">`
                : ""
            }
              </div>
              <div class="card-content">
                <a href="/src/pages/profile.html?name=${encodeURIComponent(post.author?.name)}" class="post-user">${post.author?.name || "Unknown author"}</a>
                <p class="post-date">${new Date(post.created).toLocaleDateString()}</p>
                <div class="post-body-container">
                  <p class="post-body post-body-title">${post.title ?? ""}</p>
                  <p class="post-body">${post.body ?? ""}</p>
                  <p class="post-reactions">Reactions:${post._count.reactions ?? ""}</p>
                   <p class="post-comments">Comments:${post._count.comments ?? ""}</p>
                </div></div>
            </div>  
          `
    } catch (error) {
        postContainer.textContent = "Failed to load post";
        console.error(error);
    }
}

fetchAndShowPost()