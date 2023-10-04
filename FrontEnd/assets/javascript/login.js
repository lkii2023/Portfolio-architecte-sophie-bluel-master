// Select form elements and error messages
const form = document.getElementById("js-login-form");
const emailInput = document.getElementById("js-email");
const passwordInput = document.getElementById("js-password");
const errorMessage = document.getElementById("js-error-message");

// Form submission event
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the values of email and password fields
  const email = emailInput.value;
  const password = passwordInput.value;

  // Reset the error message
  errorMessage.textContent = "";

  // Perform basic client-side validation
  if (!email || !password) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  // Send data to the server for verification
  try {
    // Send data to the server using fetch()
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Check the server response
    if (response.status === 200) {
      // Authentication successful, get JSON data from the response
      const data = await response.json();

      // Store the authentication token on the client side (e.g., in localStorage)
      localStorage.setItem("authToken", data.token);

      // Redirect the user to the homepage
      window.location.href = "http://127.0.0.1:5501/index.html";
    } else if (response.status === 401) {
      // Authentication failed due to incorrect credentials
      errorMessage.textContent = "Invalid credentials. Please try again.";
    } else if (response.status === 404) {
      // User not found
      errorMessage.textContent = "User not found.";
    } else {
      // Handle other status codes if needed
      errorMessage.textContent = "An error occurred. Please try again.";
    }
  } catch (error) {
    console.error("Error during login:", error);
    errorMessage.textContent = "An error occurred. Please try again later.";
  }
});
