(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();function b(t){let r=!0;return t.querySelectorAll(".input-error").forEach(e=>e.classList.remove("input-error")),t.querySelectorAll(".error-text").forEach(e=>e.remove()),t.querySelectorAll("input, textarea, select").forEach(e=>{if(e.id==="email"){const o=/^[^@]+@stud\.noroff\.no$/;if(e.value&&!o.test(e.value)){r=!1,e.classList.add("input-error");const a=document.createElement("p");a.classList.add("error-text"),a.textContent="Email must be a valid stud.noroff.no address.",e.insertAdjacentElement("beforebegin",a);return}}if(!e.checkValidity()){r=!1,e.classList.add("input-error");const o=document.createElement("p");o.classList.add("error-text"),e.id==="password"&&e.value.length<8?o.textContent="Password must be at least 8 characters.":o.textContent=e.validationMessage,e.insertAdjacentElement("beforebegin",o)}if(e.name==="title"&&e.value.trim().length===0){r=!1,e.classList.add("input-error");const o=document.createElement("p");o.classList.add("error-text"),o.textContent="Title is required.",e.insertAdjacentElement("beforebegin",o);return}if(e.name==="title"&&e.value.trim().length>1){r=!0;const o=document.createElement("p");o.textContent="Post is published.",o.classList.add("success-text"),e.insertAdjacentElement("beforebegin",o);return}}),r}async function B(t){const r="https://v2.api.noroff.dev/auth/login";try{const e=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await e.json();if(!e.ok)throw new Error(o.errors?.[0]?.message||"An unknown error occurred");return o}catch(e){console.error(e)}}const E=document.getElementById("login-main-container");function R(){E.innerHTML=`
        <h2>Login</h2>
        <form id="login-form" novalidate>
        <div class="form-spacing"><label for="email">Email</label>
            <input type="email" id="email" name="email" required /></div>
        <div class="form-spacing"><label for="password">Password</label>
            <input type="password" id="password" name="password" minlength="8" required /></div>
            <button class="primary-btn form-spacing" type="submit" id="login-btn">Login</button>
        </form>
        <p id="login-message"></p>
        <a class="link" href="/register.html">Register account</a>
    `;const t=document.getElementById("login-form"),r=document.getElementById("login-message");t&&t.addEventListener("submit",async e=>{if(e.preventDefault(),!b(t))return;const o={email:document.getElementById("email").value.trim(),password:document.getElementById("password").value};let a=!1;try{a=!0,r.textContent="Logging in...";const n=await B(o);localStorage.setItem("token",n.data.accessToken),localStorage.setItem("user",JSON.stringify(n.data)),r.textContent="Login successful!",r.classList.add("success-text"),setTimeout(()=>{C(),window.location.href="/src/pages/feed.html"},1e3)}catch(n){r.textContent=`Login failed. ${n.message}`,r.classList.add("error-text"),console.error("Login failed.",err)}})}function C(){E.innerHTML=`
        <h2>You are logged in</h2>
        <button class="primary-btn" id="logout-btn">Log out</button>
    `;const t=document.getElementById("logout-btn");t&&t.addEventListener("click",()=>{k(),R(),window.location.href="../../"})}function k(){localStorage.removeItem("token"),localStorage.removeItem("user")}E&&(localStorage.getItem("token")?C():R());const M="0687c3e4-578f-46b6-8524-17fe91d9bee6",c="https://v2.api.noroff.dev/social";function d(){return{Authorization:`Bearer ${localStorage.getItem("token")}`,"X-Noroff-API-Key":M,"Content-Type":"application/json"}}async function A(t=1,r=10){const e=`${c}/posts?page=${t}&limit=${r}&_author=true&_count=true`;try{const o=await fetch(e,{headers:d()});if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return await o.json()}catch(o){console.error(o)}}async function _(t,r=1,e=10){const o=`${c}/posts/search?q=${encodeURIComponent(t)}&page=${r}&limit=${e}&_author=true&_count=true`;try{const a=await fetch(o,{headers:d()});if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);return await a.json()}catch(a){console.error(a)}}async function H(t){const r=`${c}/posts/${t}?_author=true&_count=true`;try{const e=await fetch(r,{headers:d()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){console.error(e)}}function O(t,r,e){t&&t.addEventListener("click",()=>{r()||e()})}const f=document.querySelector("#container"),p=document.getElementById("load-more-btn"),T=document.getElementById("feedSearchInput");if(!(!f||!p)){let a=function(s,l=!1){if(l||(f.innerHTML=""),!s.length&&!l){f.innerHTML="<p>No posts found.</p>";return}s.forEach(i=>{f.innerHTML+=`
            <div class="card" data-id="${i.id}">
              <div class="post-image-container">
                ${i.media?.url?`<img class="card-image" src="${i.media.url}" alt="${i.media.alt||"Post image"}">`:""}
              </div>
              <div class="card-content">
                <a href="/src/pages/profile.html?name=${encodeURIComponent(i.author.name)}" class="post-user">${i.author?.name||"Unknown author"}</a>
                <p class="post-date">${new Date(i.created).toLocaleDateString()}</p>
                <div class="post-body-container">
                  <p class="post-body post-body-title">${i.title??""}</p>
                  <p class="post-body">${i.body??""}</p>
                </div>
              </div>
            </div>
          `})};f.addEventListener("click",s=>{if(s.target.closest("a, button"))return;const l=s.target.closest(".card");if(!l)return;const i=l.dataset.id;i&&(window.location.href=`../../src/pages/post.html?id=${encodeURIComponent(i)}`)});let t=1,r=!1,e=!1,o="";async function n(s=1){if(!r){r=!0,p.textContent="Loading...",p.disabled=!0;try{s===1&&(f.innerHTML="<p>Loading...</p>");const l=e?await _(o,s,10):await A(s,10),i=l.data,I=l.meta;s===1&&(f.innerHTML=""),a(i,s!==1),I.isLastPage?p.style.display="none":(t=I.nextPage,p.textContent="Load More",p.disabled=!1)}catch(l){f.textContent="Failed to load posts",console.error(l)}finally{r=!1}}}T&&T.addEventListener("input",s=>{if(o=s.target.value.trim().toLowerCase(),t=1,!o){e=!1,n(1);return}e=!0,n(1)}),O(p,()=>r,()=>n(t)),n()}async function F(t){const r="https://v2.api.noroff.dev/auth/register";try{const e=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await e.json();if(!e.ok)throw new Error(o.errors?.[0]?.message||"An unknown error occurred");return o}catch(e){console.error(e)}}const L=document.getElementById("register-form"),h=document.getElementById("register-message");L&&L.addEventListener("submit",async t=>{if(t.preventDefault(),!b(L))return;const r={name:document.getElementById("username").value.trim(),email:document.getElementById("email").value.trim(),password:document.getElementById("password").value},e=document.getElementById("bio").value.trim(),o=document.getElementById("avatarImgUrl").value.trim();e&&(r.bio=e),o&&(r.avatar={url:o});let a=!1;try{a=!0,h.textContent="Registrating account...",h.classList.remove("error-text","success-text"),await F(r);const n=await B({email:r.email,password:r.password});localStorage.setItem("token",n.data.accessToken),localStorage.setItem("user",JSON.stringify(n.data)),h.textContent="Registration successful, you are now logged in to your new account",h.classList.add("success-text"),setTimeout(()=>{window.location.href="../../index.html"},1e3)}catch(n){h.textContent=`Registration failed. ${n.message}`,h.classList.add("error-text"),console.error("Registration failed.")}});const j=new URLSearchParams(window.location.search).get("id"),v=document.querySelector("#post-details");async function D(){if(!v)return;let t=!1;try{t=!0,v.innerHTML=`
    <span>Loading...</span>
    `;const e=(await H(j)).data;v.innerHTML=`<div class="card" id="post-card">
              <div class="post-image-container">
                ${e.media?.url?`<img class="card-image" src="${e.media.url}" alt="${e.media.alt||"Post image"}">`:""}
              </div>
              <div class="card-content">
                <a href="/src/pages/profile.html?name=${encodeURIComponent(e.author?.name)}" class="post-user">${e.author?.name||"Unknown author"}</a>
                <p class="post-date">${new Date(e.created).toLocaleDateString()}</p>
                <div class="post-body-container">
                  <p class="post-body post-body-title">${e.title??""}</p>
                  <p class="post-body">${e.body??""}</p>
                  <p class="post-reactions">Reactions:${e._count.reactions??""}</p>
                   <p class="post-comments">Comments:${e._count.comments??""}</p>
                </div></div>
            </div>  
          `}catch(r){v.textContent="Failed to load post",console.error(r)}}D();async function N(t){const r=`${c}/profiles/${t}?_followers=true`;try{const e=await fetch(r,{headers:d()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){console.error(e)}}async function q(t){const r=`${c}/profiles/${t}/posts?_author=true&_count=true`;try{const e=await fetch(r,{headers:d()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){console.error(e)}}const J=async t=>{const r=`${c}/posts/${t}`,e=await fetch(r,{method:"DELETE",headers:d()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`)},W=async(t,r)=>{const e=`${c}/posts/${t}`;try{const o=await fetch(e,{method:"PUT",headers:d(),body:JSON.stringify(r)});if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return await o.json()}catch(o){console.error(o)}};function Y(){return`  
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
        `}let u=null,m=null,P=null;function K(){const t=document.getElementById("profile-main-container");if(!t)return;u=document.getElementById("edit-post-overlay"),u||(t.insertAdjacentHTML("beforeend",`
            <dialog id="edit-post-overlay">
                <div class="add-post-form-overlay">
                    ${Y()}
                </div>
            </dialog>
            `),u=document.getElementById("edit-post-overlay")),m=u.querySelector("#edit-post-form"),u.querySelector("#cancel-add-post").addEventListener("click",()=>u.close()),m.addEventListener("submit",z)}function V(t){!u||!m||(P=t.id,m.title.value=t.title??"",m.body.value=t.body??"",m.imageUrl.value=t.media?.url??"",u.showModal())}async function z(t){if(t.preventDefault(),!P||!b(m))return;const r=new FormData(m),e={title:r.get("title").trim(),body:r.get("body").trim(),media:r.get("imageUrl")?{url:r.get("imageUrl").trim(),alt:"post image"}:void 0};try{await W(P,e),alert("Post is edited")}catch(o){console.error(o)}u.close(),m.reset(),window.location.reload()}const Q=async t=>{const r=`${c}/profiles/${t}/follow`;try{const e=await fetch(r,{method:"PUT",headers:d()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){console.error(e)}},X=async t=>{const r=`${c}/profiles/${t}/unfollow`;try{const e=await fetch(r,{method:"PUT",headers:d()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){console.error(e)}},G=new URLSearchParams(window.location.search),g=G.get("name"),w=JSON.parse(localStorage.getItem("user"));function $(t){const r=document.getElementById("details-container");if(!r)return;if(!t){r.innerHTML="<div>No profile found</div>";return}const e=Z(t.followers);w.name===t.name?r.innerHTML=`<div class="card">
  <div class="post-body-container">
    <div class="profile-information-flexbox">
      <div>
      <h2>Profile information</h2>
        <div><h3>My username</h3>${t.name}</div>
        <div><h3>Bio</h3>${t.bio}</div>
      </div>
      <img
        class="profile-avatar"
        src="${t.avatar.url}"
        alt="${t.avatar.alt}"
      />
    </div>
    <div class="my-user-follower-container">
        <div class="followers-flex-direction-box"><h3>Followers</h3>${t._count.followers}</div>
    <div class="followers-flex-direction-box"><h3>Following</h3>${t._count.following}</div>
  
    </div>
  </div>
</div>
        `:r.innerHTML=`
        <div class="card">
  <div class="post-body-container">
    <div class="profile-information-flexbox">
      <div>
      <h2>Profile information</h2>
        <div><h3>Username</h3>${t.name}</div>
        <div><h3>Bio</h3>${t.bio}</div>
      </div>
      <img
        class="profile-avatar"
        src="${t.avatar.url}"
        alt="${t.avatar.alt}"
      />
    </div>
    <div class="profile-information-flexbox">
      <div>
        <div class="followers-flex-direction-box"><h3>Followers</h3>${t._count.followers}</div>
    <div class="followers-flex-direction-box"><h3>Following</h3>${t._count.following}</div>
  </div>
  ${e?`<button class="secondary-btn" id="unfollow-btn">
         Unfollow <i class="fa-solid fa-strawberry"></i>
       </button>`:`<button class="secondary-btn" id="follow-btn">
         Follow <i class="fa-solid fa-strawberry"></i>
       </button>`}
    </div>
  </div>
</div>
        `}function Z(t){return!t||!w?!1:t.find(r=>r.name===w.name)}async function ee(){if(!g){console.error("Missing ?name= in the URL"),$(null);return}try{const r=(await N(g))?.data;$(r)}catch(t){console.error("getProfile failed:",t),$(null)}}const y=document.getElementById("user-posts-container");let S=[];if(y){let t=function(e){if(!e||e.length===0){y.innerHTML+="<div>No posts found</div>";return}S=e,y.innerHTML="",e.forEach(o=>{y.innerHTML+=`<div class="card user-post-container">
              <div class="post-image-container">
                ${o.media?.url?`<img class="card-image" src="${o.media.url}" alt="${o.media.alt||"Post image"}">`:""}
              </div>
              <div class="card-content">
                <a href="/src/pages/profile.html?name=${encodeURIComponent(o.author?.name)}" class="post-user">${o.author?.name||"Unknown author"}</a>
                <p class="post-date">${new Date(o.created).toLocaleDateString()}</p>
                <div class="post-body-container">
                  <p class="post-body post-body-title">${o.title??""}</p>
                  <p class="post-body">${o.body??""}</p>
                </div>

             ${w.name===o.author.name?`<div class="edit-delete_post_btn">
                <button class="secondary-btn edit-post-btn" data-post-id="${o.id}">Edit post</button>
                <button class="secondary-btn delete-post-btn" data-post-id="${o.id}">Delete post</button>
                </div>`:""}
              </div>
            </div>  
          `})};async function r(){if(!g){console.error("Missing ?name= in the URL"),t([]);return}try{const o=(await q(g))?.data;t(o)}catch(e){console.error("getProfilePosts failed:",e),t([])}}y.addEventListener("click",async e=>{const o=e.target.closest(".delete-post-btn");if(!o)return;const a=o.dataset.postId;try{await J(a),await r(),alert("Post is deleted")}catch(n){console.error(n),alert("Could not delete post. Please try again.")}}),K(),y.addEventListener("click",e=>{const o=e.target.closest(".edit-post-btn");if(!o)return;const a=o.dataset.postId,n=S.find(s=>String(s.id)===String(a));n&&V(n)}),await r(),await ee()}const U=document.getElementById("follow-btn"),x=document.getElementById("unfollow-btn");U&&U.addEventListener("click",async t=>{try{await Q(g),alert(`You are now following ${g}`),window.location.reload()}catch(r){console.error(r),alert("Could not follow this user.")}});x&&x.addEventListener("click",async t=>{try{await X(g),alert(`You have unfollowed ${g}`),window.location.reload()}catch(r){console.error(r),alert("Could not unfollow this user.")}});async function te(t){const r=`${c}/posts`,e={method:"POST",headers:d(),body:JSON.stringify(t)};try{const o=await fetch(r,e);if(!o.ok)throw new Error(`HTTP error! Status: ${o.status}`);return await o.json()}catch(o){console.error(o)}}function oe(){return`  
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
        <div>
          <button type="submit" class="primary-btn">Add post</button>
          <button type="button" class="primary-btn" id="cancel-add-post">Cancel</button>
        </div>
        </div>
      </form>
    `}function re(){const t=document.getElementById("feed-top");if(!t||document.getElementById("add-post-overlay"))return;t.insertAdjacentHTML("beforeend",`
  <dialog id="add-post-overlay">
    <div class="add-post-form-overlay">
      ${oe()}
    </div>
  </dialog>
  `);const r=document.getElementById("add-post-overlay"),e=document.getElementById("open-add-post"),o=r?.querySelector("#add-post-form");r.querySelector("#cancel-add-post")?.addEventListener("click",()=>r.close()),e?.addEventListener("click",()=>r.showModal()),o?.addEventListener("submit",async a=>{if(a.preventDefault(),!b(o))return;const n=new FormData(o),s={title:n.get("title")?.trim(),body:n.get("body")?.trim(),media:n.get("imageUrl")?{url:n.get("imageUrl").trim(),alt:"post image"}:void 0};await te(s),r.close(),o.reset(),window.location.reload()})}re();const ae=JSON.parse(localStorage.getItem("accessToken")),ne=JSON.parse(localStorage.getItem("user")),se=document.getElementById("header-container");se.innerHTML=`
     <h1><a href="./feed.html">STRAWBERRY</a></h1>
      <nav>
        <ul>
        ${ae?`<li>
            <a href="./login.html" aria-label="Log in">Log in</a>
          </li>
            <li>
            <a href="./register.html" aria-label="Register account">Register account</a>
          </li>`:`
           <li>
            <a href="./feed.html" aria-label="Log in">Feed</a>
          </li>
        <li>
            <a href="./profile.html?name=${encodeURIComponent(ne.name)}" aria-label="Log in">My page</a>
          </li>
           <li>
            <a href="./login.html" aria-label="Log in">Log out</a>
          </li>`}
        </ul>
      </nav>
`;
