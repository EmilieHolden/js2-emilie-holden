import "./login.js";
import "./feed.js";
import "./register.js";

const registerBtn = document.getElementById("registerBtn")

if (registerBtn) {
    registerBtn.addEventListener("click", () => {
        window.location.href = "src/pages/register.html"
    })
}


