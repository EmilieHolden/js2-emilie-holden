import { getPosts, searchPosts } from "./api/fetchPosts.js";
import { setupPagination } from "./components/pagination.js";

const container = document.querySelector("#container");
const button = document.getElementById("load-more-btn");
const searchInput = document.getElementById("feedSearchInput");

if (!container || !button) {

} else {
    let currentPage = 1;
    let isFetching = false;

    let isSearching = false;
    let searchQuery = "";

    function renderPosts(postsToRender, append = false) {
        if (!append) container.innerHTML = ""

        if (!postsToRender.length && !append) {
            container.innerHTML = "<p>No posts found.</p>"
            return
        }

        postsToRender.forEach((post) => {
            container.innerHTML += `
            <div class="card">
              <div class="post-image-container">
                ${post.media?.url
                    ? `<img class="card-image" src="${post.media.url}" alt="${post.media.alt || "Post image"}">`
                    : ""
                }
              </div>
              <div class="card-content">
                <a href="/src/pages/profile.html?name=${encodeURIComponent(post.author.name)}" class="post-user">${post.author?.name || "Unknown author"}</a>
                <p class="post-date">${new Date(post.created).toLocaleDateString()}</p>
                <div class="post-body-container">
                  <p class="post-body post-body-title">${post.title ?? ""}</p>
                  <p class="post-body">${post.body ?? ""}</p>
                </div>
              </div>
            </div>
          `;
        })
    }

    async function loadPostsPage(page = 1) {
        if (isFetching) return;
        isFetching = true;

        button.textContent = "Loading...";
        button.disabled = true;

        try {
            if (page === 1) {
                container.innerHTML = "<p>Loading...</p>";
            }

            const data = isSearching
                ? await searchPosts(searchQuery, page, 10)
                : await getPosts(page, 10);
            const posts = data.data;
            const meta = data.meta;

            if (page === 1) {
                container.innerHTML = "";
            }

            // Append posts when page > 1, to prevent posts on previus pages to disappear
            renderPosts(posts, page !== 1)


            if (meta.isLastPage) {
                button.style.display = "none";
            } else {
                currentPage = meta.nextPage;
                button.textContent = "Load More";
                button.disabled = false;
            }
        } catch (error) {
            container.textContent = "Failed to load posts";
            console.error(error);
        } finally {
            isFetching = false;
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim().toLowerCase()
            currentPage = 1

            if (!searchQuery) {
                isSearching = false
                loadPostsPage(1)
                return
            }

            isSearching = true
            loadPostsPage(1)
        })
    }

    setupPagination(button, () => isFetching, () => loadPostsPage(currentPage));
    loadPostsPage();
}
