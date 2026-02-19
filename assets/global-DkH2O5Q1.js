(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();function y(o){let t=!0;return o.querySelectorAll(".input-error").forEach(e=>e.classList.remove("input-error")),o.querySelectorAll(".error-text").forEach(e=>e.remove()),o.querySelectorAll("input, textarea, select").forEach(e=>{if(e.id==="email"){const r=/^[^@]+@stud\.noroff\.no$/;if(e.value&&!r.test(e.value)){t=!1,e.classList.add("input-error");const n=document.createElement("p");n.classList.add("error-text"),n.textContent="Email must be a valid stud.noroff.no address.",e.insertAdjacentElement("beforebegin",n);return}}if(!e.checkValidity()){t=!1,e.classList.add("input-error");const r=document.createElement("p");r.classList.add("error-text"),e.id==="password"&&e.value.length<8?r.textContent="Password must be at least 8 characters.":r.textContent=e.validationMessage,e.insertAdjacentElement("beforebegin",r)}if(e.name==="title"&&e.value.trim().length===0){t=!1,e.classList.add("input-error");const r=document.createElement("p");r.classList.add("error-text"),r.textContent="Title is required.",e.insertAdjacentElement("beforebegin",r);return}if(e.name==="title"&&e.value.trim().length>1){t=!0;const r=document.createElement("p");r.textContent="Post is published.",r.classList.add("success-text"),e.insertAdjacentElement("beforebegin",r);return}}),t}async function L(o){const t="https://v2.api.noroff.dev/auth/login";try{const e=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),r=await e.json();if(!e.ok)throw new Error(r.errors?.[0]?.message||"An unknown error occurred");return r}catch(e){throw e}}const h=document.getElementById("login-main-container");function E(){h.innerHTML=`
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
    `;const o=document.getElementById("login-form"),t=document.getElementById("login-message");o&&o.addEventListener("submit",async e=>{if(e.preventDefault(),!y(o))return;const r={email:document.getElementById("email").value.trim(),password:document.getElementById("password").value};let n=!1;try{n=!0,t.textContent="Logging in...";const a=await L(r);localStorage.setItem("token",a.data.accessToken),localStorage.setItem("user",JSON.stringify(a.data)),t.textContent="Login successful!",t.classList.add("success-text"),setTimeout(()=>{I(),window.location.href="/src/pages/feed.html"},1e3)}catch(a){t.textContent=`Login failed. ${a.message}`,t.classList.add("error-text"),console.error("Login failed.",err)}})}function I(){h.innerHTML=`
        <h2>You are logged in</h2>
        <button class="primary-btn" id="logout-btn">Log out</button>
    `;const o=document.getElementById("logout-btn");o&&o.addEventListener("click",()=>{P(),E()})}function P(){localStorage.removeItem("token"),localStorage.removeItem("user")}h&&(localStorage.getItem("token")?I():E());const T="0687c3e4-578f-46b6-8524-17fe91d9bee6",m="https://v2.api.noroff.dev/social";function f(){return{Authorization:`Bearer ${localStorage.getItem("token")}`,"X-Noroff-API-Key":T,"Content-Type":"application/json"}}async function S(o=1,t=10){const e=`${m}/posts?page=${o}&limit=${t}&_author=true&_count=true`;try{const r=await fetch(e,{headers:f()});if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);return await r.json()}catch(r){throw r}}async function x(o,t=1,e=10){const r=`${m}/posts/search?q=${encodeURIComponent(o)}&page=${t}&limit=${e}&_author=true&_count=true`;try{const n=await fetch(r,{headers:f()});if(!n.ok)throw new Error(`HTTP error! Status: ${n.status}`);return await n.json()}catch(n){throw n}}function $(o,t,e){o&&o.addEventListener("click",()=>{t()||e()})}const l=document.querySelector("#container"),d=document.getElementById("load-more-btn"),w=document.getElementById("feedSearchInput");if(!(!l||!d)){let n=function(s,c=!1){if(c||(l.innerHTML=""),!s.length&&!c){l.innerHTML="<p>No posts found.</p>";return}s.forEach(i=>{l.innerHTML+=`
            <div class="card">
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
          `})};var H=n;let o=1,t=!1,e=!1,r="";async function a(s=1){if(!t){t=!0,d.textContent="Loading...",d.disabled=!0;try{s===1&&(l.innerHTML="<p>Loading...</p>");const c=e?await x(r,s,10):await S(s,10),i=c.data,v=c.meta;s===1&&(l.innerHTML=""),n(i,s!==1),v.isLastPage?d.style.display="none":(o=v.nextPage,d.textContent="Load More",d.disabled=!1)}catch(c){l.textContent="Failed to load posts",console.error(c)}finally{t=!1}}}w&&w.addEventListener("input",s=>{if(r=s.target.value.trim().toLowerCase(),o=1,!r){e=!1,a(1);return}e=!0,a(1)}),$(d,()=>t,()=>a(o)),a()}async function U(o){const t="https://v2.api.noroff.dev/auth/register";try{const e=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),r=await e.json();if(!e.ok)throw new Error(r.errors?.[0]?.message||"An unknown error occurred");return r}catch(e){throw e}}const g=document.getElementById("register-form"),u=document.getElementById("register-message");g&&g.addEventListener("submit",async o=>{if(o.preventDefault(),!y(g))return;const t={name:document.getElementById("username").value.trim(),email:document.getElementById("email").value.trim(),password:document.getElementById("password").value},e=document.getElementById("bio").value.trim(),r=document.getElementById("avatarImgUrl").value.trim();e&&(t.bio=e),r&&(t.avatar={url:r});let n=!1;try{n=!0,u.textContent="Registrating account...",u.classList.remove("error-text","success-text"),await U(t);const a=await L({email:t.email,password:t.password});localStorage.setItem("token",a.data.accessToken),localStorage.setItem("user",JSON.stringify(a.data)),u.textContent="Registration successful, you are now logged in to your new account",u.classList.add("success-text"),setTimeout(()=>{window.location.href="../../index.html"},1e3)}catch(a){u.textContent=`Registration failed. ${a.message}`,u.classList.add("error-text"),console.error("Registration failed.")}});async function B(o){const t=`${m}/posts`,e={method:"POST",headers:f(),body:JSON.stringify(o)};try{const r=await fetch(t,e);if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);return await r.json()}catch(r){throw r}}function C(){return`  
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
          <button type="submit" class="primary-btn">Add post</button>
          <button type="button" class="primary-btn" id="cancel-add-post">Cancel</button>
        </div>
      </form>
    `}function M(){const o=document.getElementById("feed-top");if(!o||document.getElementById("add-post-overlay"))return;o.insertAdjacentHTML("beforeend",`
  <dialog id="add-post-overlay">
    <div class="add-post-form-overlay">
      ${C()}
    </div>
  </dialog>
  `);const t=document.getElementById("add-post-overlay"),e=document.getElementById("open-add-post"),r=t?.querySelector("#add-post-form");t.querySelector("#cancel-add-post")?.addEventListener("click",()=>t.close()),e?.addEventListener("click",()=>t.showModal()),r?.addEventListener("submit",async n=>{if(n.preventDefault(),!y(r))return;const a=new FormData(r),s={title:a.get("title")?.trim(),body:a.get("body")?.trim(),media:a.get("imageUrl")?{url:a.get("imageUrl").trim(),alt:"post image"}:void 0};await B(s),t.close(),r.reset(),window.location.reload()})}M();async function A(o){const t=`${m}/profiles/${o}`;try{const e=await fetch(t,{headers:f()});if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){throw e}}const k=new URLSearchParams(window.location.search),b=k.get("name"),R=JSON.parse(localStorage.getItem("user"));function p(o){const t=document.getElementById("details-container");if(t){if(!o){t.innerHTML="<div>No profile found</div>";return}R.name===o.name?t.innerHTML=`
        <div>${o.name}</div>
        <div>${o.bio}</div>
        <div>This is MYYY profile</div>
        `:t.innerHTML=`
        <div>${o.name}</div>
        <div>${o.bio}</div>
        <div>Not my profile</div>
        `}}async function O(){if(!b){console.error("Missing ?name= in the URL"),p(null);return}try{const t=(await A(b))?.data;p(t)}catch(o){console.error("getProfile failed:",o),p(null)}}O();
