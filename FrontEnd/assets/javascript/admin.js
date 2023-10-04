// Get the authentication token from localStorage
const token = localStorage.getItem("authToken");

// Function to check if the user is logged in
const isLogged = () => (token ? true : false);

// Function to log the user out
const logOut = () => {
  localStorage.removeItem("authToken"); // Clear the authToken from localStorage
  window.location.reload(); // Reload the page after logout
};

// Function to update the login/logout button
const loginButtonUpdate = () => {
  const loginButton = document.querySelector("#js-login-button");
  if (isLogged()) {
    loginButton.href = "#"; // Set the link to "#" to prevent navigation
    loginButton.innerText = "logout"; // Change the button text to "logout"
    loginButton.addEventListener("click", () => {
      logOut(); // Call the logOut function when the button is clicked
      loginButton.innerText = "login"; // Change the button text back to "login"
    });
  }
};
// Call the loginButtonUpdate function to update the button state
loginButtonUpdate();

// Update the user interface based on the user's login status
const updateUI = () => {
  // Select relevant HTML elements
  const filter = document.querySelector("#js-filter-box");
  const editBar = document.querySelector("#js-banner");
  const alignItems = document.querySelector("#introduction");

  // Check if the user is logged in
  if (isLogged()) {
    // If logged in, hide the filter and display the editBar
    filter.style.display = "none";
    editBar.style.display = "flex";
    alignItems.style.alignItems = "inherit";
  }
};

// Call the function to update the user interface when the page is loaded
window.addEventListener("load", () => {
  // Call loginButtonUpdate to handle login/logout button state
  loginButtonUpdate();
  // Call updateUI to update the interface based on the user's login status
  updateUI();
});
