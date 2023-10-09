// Get the authentication token from localStorage
const token = localStorage.getItem("authToken");

// Function to check if the user is logged in
const isLogged = () => (token ? true : false);

// Function to log the user out
const logOut = () => {
  localStorage.removeItem("authToken");
  window.location.reload();
};

// Function to update the login/logout button
const loginButtonUpdate = () => {
  const loginButton = document.querySelector("#js-login-button");

  if (isLogged()) {
    loginButton.href = "#";
    loginButton.innerText = "logout";
    loginButton.addEventListener("click", () => {
      logOut();
      loginButton.innerText = "login";
    });
  }
};

loginButtonUpdate();

// Update the user interface based on the user's login status
const updateUI = () => {
  const filter = document.querySelector("#js-filter-box");
  const editBar = document.querySelector("#js-banner");
  const alignItems = document.querySelector("#introduction");
  const buttonEditGallery = document.querySelector("#js-button-edit-gallery");

  if (isLogged()) {
    filter.style.display = "none";
    editBar.style.display = "flex";
    alignItems.style.alignItems = "inherit";
    buttonEditGallery.style.display = "inline-flex";
  }
};

// Call the function to update the user interface when the page is loaded
window.addEventListener("load", () => {
  loginButtonUpdate();
  updateUI();
});

// open and close modal
function openModal() {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".modal").classList.add("modal-open");
}

function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").classList.remove("modal-open");
}
