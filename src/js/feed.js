import { getPosts } from "./api/fetchPosts.js";

const loadMoreButton = document.getElementById("load-more-btn")

let currentPage = 1;
let isFetching = false;

async function fetchAndCreatePosts(page = 1) {
    const container = document.querySelector("#container")
    if (!container) return

    if (isFetching) return
    isFetching = true;

    loadMoreButton.textContent = "Loading...";
    loadMoreButton.disabled = true;

    try {
        if (page === 1) {
            container.innerHTML = "<p>Loading...</p>";
        }

        const data = await getPosts(page, 10);
        const posts = data.data
        const meta = data.meta

        if (page === 1) {
            container.innerHTML = "";
        }

        posts.forEach(post => {
            container.innerHTML += `
            <div class="card">
                <div class="post-image-container">
                    ${post.media?.url
                    ? `<img class="card-image" src="${post.media.url}" alt="${post.media.alt || "Post image"}">`
                    : ""
                }
                </div>
                <div class="card-content">
                    <p class="post-user">${post.author?.name || "Unknown author"}</p>
                     <p class="post-date">${new Date(post.created).toLocaleDateString()}</p>
                     <div class="post-body-container">
                     <p class="post-body">${post.body}</p>
                    </div>
                </div>
            </div>
            `;
        });

        if (meta.isLastPage) {
            loadMoreButton.style.display = 'none'
        } else {
            currentPage = meta.nextPage
            loadMoreButton.textContent = 'Load More'
            loadMoreButton.disabled = false;
        }

    } catch (error) {
        container.textContent = 'Failed to load posts'
        console.error(error)
    } finally {
        isFetching = false
    }
}

fetchAndCreatePosts()

loadMoreButton.addEventListener("click", () => {
    if (isFetching) return;
    fetchAndCreatePosts(currentPage);
});



