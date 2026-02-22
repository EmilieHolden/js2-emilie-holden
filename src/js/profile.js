import { getProfile, getProfilePosts } from "./api/fetchProfiles";
import { deletePost } from "./api/delete";
import { initEditPostOverlay, openEditOverlayForPost } from "./components/editPost";
import { followProfile } from "./api/follow";
import { unfollowProfile } from "./api/unfollow";

const params = new URLSearchParams(window.location.search);
const profileName = params.get("name");

const loggedInUser = JSON.parse(localStorage.getItem("user"));

// Render user details for specific profile by username
function renderUserdetails(profile) {
  const detailsContainer = document.getElementById("details-container");

  if (!detailsContainer) return;

  if (!profile) {
    detailsContainer.innerHTML = `<div>No profile found</div>`;
    return;
  }

  const following = isFollowingProfile(profile.followers);

  if (loggedInUser.name === profile.name) {
    detailsContainer.innerHTML = `<div class="card">
  <div class="post-body-container">
    <div class="profile-information-flexbox">
      <div>
      <h2>Profile information</h2>
        <div><h3>My username</h3>${profile.name}</div>
        <div><h3>Bio</h3>${profile.bio}</div>
      </div>
      <img
        class="profile-avatar"
        src="${profile.avatar.url}"
        alt="${profile.avatar.alt}"
      />
    </div>
    <div class="my-user-follower-container">
        <div class="followers-flex-direction-box"><h3>Followers</h3>${profile._count.followers}</div>
    <div class="followers-flex-direction-box"><h3>Following</h3>${profile._count.following}</div>
  
    </div>
  </div>
</div>
        `;
  } else {
    detailsContainer.innerHTML = `
        <div class="card">
  <div class="post-body-container">
    <div class="profile-information-flexbox">
      <div>
      <h2>Profile information</h2>
        <div><h3>Username</h3>${profile.name}</div>
        <div><h3>Bio</h3>${profile.bio}</div>
      </div>
      <img
        class="profile-avatar"
        src="${profile.avatar.url}"
        alt="${profile.avatar.alt}"
      />
    </div>
    <div class="profile-information-flexbox">
      <div>
        <div class="followers-flex-direction-box"><h3>Followers</h3>${profile._count.followers}</div>
    <div class="followers-flex-direction-box"><h3>Following</h3>${profile._count.following}</div>
  </div>
  ${following
        ? `<button class="secondary-btn" id="unfollow-btn">
         Unfollow <i class="fa-solid fa-strawberry"></i>
       </button>`
        : `<button class="secondary-btn" id="follow-btn">
         Follow <i class="fa-solid fa-strawberry"></i>
       </button>`
      }
    </div>
  </div>
</div>
        `;
  }

}

function isFollowingProfile(followers) {
  if (!followers || !loggedInUser) return false;

  return followers.find(
    follower => follower.name === loggedInUser.name
  );
}

async function loadProfilePage() {
  if (!profileName) {
    console.error("Missing ?name= in the URL");
    renderUserdetails(null);
    return;
  }

  try {
    const data = await getProfile(profileName);
    const profile = data?.data;

    renderUserdetails(profile);
  } catch (err) {
    console.error("getProfile failed:", err);
    renderUserdetails(null);
  }
}

// Render posts for specific profile by username
const userPostsContainer = document.getElementById("user-posts-container")

let currentPosts = [];

if (userPostsContainer) {
  function renderUserPosts(posts) {
    if (!posts || posts.length === 0) {
      userPostsContainer.innerHTML += `<div>No posts found</div>`;
      return;
    }

    currentPosts = posts;

    userPostsContainer.innerHTML = "";

    posts.forEach((post) => {
      userPostsContainer.innerHTML += `<div class="card user-post-container">
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
                </div>

             ${loggedInUser.name === post.author.name
          ? `<div class="edit-delete_post_btn">
                <button class="secondary-btn edit-post-btn" data-post-id="${post.id}">Edit post</button>
                <button class="secondary-btn delete-post-btn" data-post-id="${post.id}">Delete post</button>
                </div>`
          : ""
        }
              </div>
            </div>  
          `

    });
  }

  async function loadProfilePagePosts() {
    if (!profileName) {
      console.error("Missing ?name= in the URL");
      renderUserPosts([]);
      return;
    }

    try {
      const data = await getProfilePosts(profileName);
      const posts = data?.data;

      renderUserPosts(posts);
    } catch (error) {
      console.error("getProfilePosts failed:", error);
      renderUserPosts([]);
    }

  }

  // Delete post
  userPostsContainer.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest(".delete-post-btn")
    if (!deleteBtn) return;
    const postId = deleteBtn.dataset.postId;

    try {
      await deletePost(postId);

      // Re-render posts
      await loadProfilePagePosts()

      alert("Post is deleted");
    } catch (error) {
      console.error(error);
      alert("Could not delete post. Please try again.");
    }
  })

  initEditPostOverlay();

  // Edit post
  userPostsContainer.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-post-btn");
    if (!editBtn) return;

    const postId = editBtn.dataset.postId;
    const post = currentPosts.find((post) => String(post.id) === String(postId));
    if (!post) return;

    openEditOverlayForPost(post);
  });

  await loadProfilePagePosts()
  await loadProfilePage()
}

//Follow & unfollow user
const followButton = document.getElementById("follow-btn")
const unfollowButton = document.getElementById("unfollow-btn")

if (followButton) {
  followButton.addEventListener("click", async (e) => {
    try {
      await followProfile(profileName)

      alert(`You are now following ${profileName}`)
      window.location.reload();
    } catch (error) {
      console.error(error)
      alert("Could not follow this user.")
    }

  })
}

if (unfollowButton) {
  unfollowButton.addEventListener("click", async (e) => {
    try {
      await unfollowProfile(profileName)

      alert(`You have unfollowed ${profileName}`)
      window.location.reload();
    } catch (error) {
      console.error(error)
      alert("Could not unfollow this user.")
    }

  })
}
