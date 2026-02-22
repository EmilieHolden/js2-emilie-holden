import { validateForm } from "./utils.js";
import { loginUser } from "./api/login.js";

const loginMainContainer = document.getElementById("login-main-container");

function renderLoggedOutView() {
    loginMainContainer.innerHTML = `
        <h2>Login</h2>
        <form id="login-form" novalidate>
        <div class="form-spacing"><label for="email">Email</label>
            <input type="email" id="email" name="email" required /></div>
        <div class="form-spacing"><label for="password">Password</label>
            <input type="password" id="password" name="password" minlength="8" required /></div>
            <button class="primary-btn form-spacing" type="submit" id="login-btn">Login</button>
        </form>
        <p id="login-message"></p>
        <a class="link" href="../../register.html">Register account</a>
    `;

    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!validateForm(loginForm)) return;

            const userData = {
                email: document.getElementById("email").value.trim(),
                password: document.getElementById("password").value,
            };

            let loading = false

            try {
                loading = true
                loginMessage.textContent = "Logging in..."

                const loginResult = await loginUser(userData);
                localStorage.setItem("token", loginResult.data.accessToken);
                localStorage.setItem("user", JSON.stringify(loginResult.data));

                loginMessage.textContent = "Login successful!";
                loginMessage.classList.add("success-text")

                setTimeout(() => {
                    renderLoggedInView();
                    window.location.href = "../../src/pages/feed.html";
                }, 1000);
            } catch (error) {
                loginMessage.textContent = `Login failed. ${error.message}`;
                loginMessage.classList.add("error-text")
                console.error("Login failed.", err);
            }
        });
    }
}

function renderLoggedInView() {
    loginMainContainer.innerHTML = `
        <h2>You are logged in</h2>
        <button class="primary-btn" id="logout-btn">Log out</button>
    `;

    const logOutBtn = document.getElementById("logout-btn");

    if (logOutBtn) {
        logOutBtn.addEventListener("click", () => {
            logoutUser();
            renderLoggedOutView();
            window.location.href = "../../";
        });
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

if (loginMainContainer) {
    const userToken = localStorage.getItem("token");
    if (userToken) {
        renderLoggedInView();
    } else {
        renderLoggedOutView();
    }
}
