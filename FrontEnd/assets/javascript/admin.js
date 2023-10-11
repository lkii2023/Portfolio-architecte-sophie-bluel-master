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

// open and close modal add gallery
function openModal() {
  getWorksData().then((worksData) => {
    const renderGallery = (items) => {
      const gallery = document.querySelector(".gallery-modal");
      gallery.innerHTML = "";
      items.forEach((item) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("img-modal");
        gallery.appendChild(galleryItem);
        const image = document.createElement("img");
        image.src = item.imageUrl;
        image.alt = item.title;
        image.classList.add("item__imgModal");
        galleryItem.appendChild(image);

        const trashButton = createTrashSVG();
        trashButton.classList.add("svg-trash");
        galleryItem.appendChild(trashButton);
      });
    };
    const modalGallery = document.querySelector(".gallery-modal");

    renderGallery(worksData, modalGallery);

    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").classList.add("modal-open");
  });
}

function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal").classList.remove("modal-open");
}

// add btn trash
const createTrashSVG = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("class", "w-6 h-6");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute(
    "d",
    "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  );

  svg.appendChild(path);
  return svg;
};

// If the click is outside the modal, close the modal
const overlay = document.querySelector(".overlay");

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closeModal();
  }
});
