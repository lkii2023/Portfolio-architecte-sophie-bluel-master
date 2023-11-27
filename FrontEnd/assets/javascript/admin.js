const backToGalleryButton = document.querySelector("#backToGallery");
const closeModalButton = document.querySelector(".modal-close");
const formAddImg = document.querySelector("#js-form-add-img");
const dropZone = document.querySelector("#drop-zone");
const fileInput = document.querySelector("#file-input");
const previewImage = document.querySelector("#preview");
const titleInput = document.querySelector("#titre");
const categorySelect = document.querySelector("#categorie");
const errorTitleForm = document.querySelector(".error-title-form");
const confirmButton = document.querySelector(".confirm-button-form-add");
const emptyOption = document.querySelector("#empty-option");
const modalGallery = document.querySelector(".gallery-modal");
const galleryItem = document.querySelector(".div");
const gallery = document.querySelector(".gallery");
const modalContainer = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");
const token = localStorage.getItem("authToken");
const addButton = document.querySelector(".modal-button");
const modalAdd = document.querySelector("#modal2");
const modalPrevious = document.querySelector("#modal1");
const backToPreviousModalButton = document.getElementById("backToGallery");

window.addEventListener("load", () => {
  loginButtonUpdate();
  updateUI();
});

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
