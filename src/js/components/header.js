const isLoggedIn = JSON.parse(localStorage.getItem("accessToken"))
const loggedInUser = JSON.parse(localStorage.getItem("user"))

const headerContainer = document.getElementById("header-container")

headerContainer.innerHTML = `
     <h1><a href="./feed.html">STRAWBERRY</a></h1>
      <nav>
        <ul>
        ${!isLoggedIn
        ? `
           <li>
            <a href="./feed.html" aria-label="Log in">Feed</a>
          </li>
        <li>
            <a href="./profile.html?name=${encodeURIComponent(loggedInUser.name)}" aria-label="Log in">My page</a>
          </li>
           <li>
            <a href="./login.html" aria-label="Log in">Log out</a>
          </li>`
        : `<li>
            <a href="./login.html" aria-label="Log in">Log in</a>
          </li>
            <li>
            <a href="./register.html" aria-label="Register account">Register account</a>
          </li>`
    }
        </ul>
      </nav>
`