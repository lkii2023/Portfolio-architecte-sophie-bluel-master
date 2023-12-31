const form = document.getElementById("js-login-form");
const emailInput = document.getElementById("js-email");
const passwordInput = document.getElementById("js-password");
const errorMessage = document.getElementById("js-error-message");

// Form submission event
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  errorMessage.textContent = "";

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Perform basic client-side validation
  if (!email || !isValidEmail(email) || !password) {
    errorMessage.textContent =
      "Veuillez saisir une adresse e-mail valide et remplir le mot de passe.";
    return;
  }

  // Send data to the server for verification
  try {
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
    switch (response.status) {
      case 200:
        const data = await response.json();

        localStorage.setItem("authToken", data.token);

        window.location.href = "index.html";
        break;

      case 401:
        errorMessage.textContent =
          "Informations d'identification invalides. Veuillez réessayer.";
        break;

      case 404:
        errorMessage.textContent = "Utilisateur non trouvé.";
        break;

      default:
        errorMessage.textContent =
          "Une erreur s'est produite. Veuillez réessayer.";
        break;
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);

    errorMessage.textContent =
      "Une erreur s'est produite. Veuillez réessayer ultérieurement.";
  }
});
