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
        trashButton.id = item.id;
        trashButton.classList.add("svg-trash");
        galleryItem.appendChild(trashButton);

        trashButton.addEventListener("click", () => {
          deleteWorkOnServer(item.id); // Obtenez la référence à l'élément parent (le contenant de l'image) de l'icône trash
          const galleryItem = trashButton.parentElement;

          // Supprimez l'élément parent (l'image) du DOM
          galleryItem.remove();

          // Vous pouvez également effectuer d'autres actions ici, comme supprimer l'élément correspondant de votre liste de données
          // worksData.splice(index, 1); // Supprimez l'élément correspondant de votre tableau de données
        });
      });
    };
    const modalGallery = document.querySelector(".gallery-modal");

    renderGallery(worksData, modalGallery);

    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").classList.add("modal-open");
  });
}

async function deleteWorkOnServer(id) {
  try {
    console.log("ok");
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la suppression du travail sur le serveur."
      );
    }
    const galleryItem = document.querySelector(`.img-modal[id="${id}"]`);
    console.log("gallery ok");

    if (galleryItem) {
      galleryItem.remove(); // Supprimez l'élément parent (l'image) du DOM
      console.log("dom ok");
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du travail sur le serveur : " + error
    );
  }
}

function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal-container").classList.remove("modal-open");
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
  svg.addEventListener("click", () => {
    // Obtenez la référence à l'élément parent (le contenant de l'image) de l'icône trash
    const galleryItem = svg.parentElement;
    console.log(galleryItem);
    // Supprimez l'élément parent (l'image) du DOM
    galleryItem.remove();
  });
  return svg;
};

// If the click is outside the modal, close the modal
const overlay = document.querySelector(".overlay");

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closeModal();
  }
});

// modal2
function backToGallery() {
  // Code pour gérer le retour à la modale de la galerie
  modalAdd.style.display = "none"; // Fermez la modale d'ajout de photo
}

const addButton = document.querySelector(".modal-button");
const modalAdd = document.querySelector("#modal2");
const modalPrevious = document.querySelector("#modal1");
const backToPreviousModalButton = document.getElementById("backToGallery");

addButton.addEventListener("click", () => {
  // Ouvrez la deuxième modal
  modalAdd.style.display = "block";
});

backToPreviousModalButton.addEventListener("click", () => {
  modalAdd.style.display = "none"; // Fermez la deuxième modale
  modalPrevious.style.display = "block"; // Affichez la modale précédente
});

document
  .getElementById("file-input")
  .addEventListener("change", function (event) {
    const fileInput = event.target;
    const imagePreview = document.querySelector(".preview-img");
    const deleteImageBtn = document.querySelector(".preview-delete-btn"); // Sélectionnez le bouton de suppression
    console.log(fileInput.files, "toto");
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";

        // Affichez le bouton de suppression
        deleteImageBtn.style.display = "block";
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  });

// dropdown
const populateDropdown = async () => {
  try {
    const categories = await getCategoriesData();
    const select = document.getElementById("categorie");

    while (select.options.length > 1) {
      select.remove(1);
    }

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      select.add(option);
    });
  } catch (error) {
    console.log("Erreur : Impossible de remplir le menu déroulant.");
  }
};
populateDropdown();

const backToGalleryButton = document.querySelector("#backToGallery");
const closeModalButton = document.querySelector(".modal-close");
const formAddImg = document.querySelector("#js-form-add-img");
const dropZone = document.querySelector("#drop-zone");
const fileInput = document.querySelector("#file-input");
const previewImage = document.querySelector("#preview");
const deletePreviewButton = document.querySelector("#js-delete-preview");
const titleInput = document.querySelector("#titre");
const categorySelect = document.querySelector("#categorie");
const errorTitleForm = document.querySelector(".error-title-form");
const confirmButton = document.querySelector(".confirm-button-form-add");
const emptyOption = document.querySelector("#empty-option");
const modalGallery = document.querySelector(".gallery-modal");
const galleryItem = document.querySelector(".div");
const gallery = document.querySelector(".gallery");
const modalContainer = document.querySelector(".modal-container");

// Étape 3.3 : Envoi d’un nouveau projet au back-end via le formulaire de la modale
// Gestionnaire d'événement pour le formulaire d'ajout de projet

// Ajoutez l'événement à l'extérieur de la fonction
formAddImg.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorTitleForm.style.display = "none";

  const title = titleInput.value;
  const category = categorySelect.value;

  if (!title || category === "") {
    // Vérifiez que le titre et la catégorie sont renseignés
    errorTitleForm.style.display = "block";
  } else {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    if (fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]);
    } else {
      // Gérez le cas où aucun fichier n'a été sélectionné
      console.error("Aucun fichier sélectionné");
      return;
    }

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        modalAdd.style.display = "none";

        if (fileInput.files.length > 0) {
          const imageFile = fileInput.files[0];
          const imageURL = URL.createObjectURL(imageFile);
          const newImage = document.createElement("img");
          newImage.alt = title;
          newImage.classList.add("item__imgModal");
          newImage.src = imageURL;

          const galleryItem = document.createElement("div");
          galleryItem.classList.add("img-modal");

          const trashButton = createTrashSVG();
          console.log(imageFile.name);
          trashButton.id = imageFile.name; // Utilisez le nom de fichier comme identifiant
          console.log("trash id");
          galleryItem.appendChild(newImage);
          galleryItem.appendChild(trashButton);
          console.log("galleryItem", galleryItem);

          // Ajoutez le galleryItem à la galerie
          const gallery = document.querySelector(".gallery");
          gallery.appendChild(galleryItem);

          const modalGallery = document.querySelector(".gallery-modal");
          modalGallery.appendChild(newImage);
        } else {
          console.error("Aucun fichier sélectionné");
        }
      } else {
        console.error("Erreur lors de l'envoi du projet au serveur.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du projet au serveur : " + error);
    }
  }
});

// Ajoutez un gestionnaire d'événements aux champs d'entrée
titleInput.addEventListener("input", toggleButtonColor);
categorySelect.addEventListener("input", toggleButtonColor);
fileInput.addEventListener("change", toggleButtonColor);

// La fonction qui vérifie l'état des champs et ajoute ou supprime la classe "active"
function toggleButtonColor() {
  if (titleInput.value && categorySelect.value && fileInput.files.length > 0) {
    // Tous les champs sont remplis, activez le bouton
    confirmButton.classList.add("active");
  } else {
    // Au moins un champ n'est pas rempli, désactivez le bouton
    confirmButton.classList.remove("active");
  }
}

function resetModal2() {
  const titleInput = document.querySelector("#titre");
  const categorySelect = document.querySelector("#categorie");
  const fileInput = document.querySelector("#file-input");
  const imagePreview = document.querySelector("#preview");
  const deleteImageBtn = document.querySelector("#js-delete-preview");
  const confirmButton = document.querySelector(".confirm-button-form-add");

  titleInput.value = ""; // Réinitialisez la valeur du champ de titre
  categorySelect.value = ""; // Réinitialisez la valeur du champ de catégorie
  fileInput.value = ""; // Réinitialisez la valeur du champ de fichier
  imagePreview.style.display = "none"; // Masquez l'aperçu de l'image
  deleteImageBtn.style.display = "none"; // Masquez le bouton de suppression de l'aperçu
  confirmButton.classList.remove("active"); // Désactivez le bouton de confirmation si nécessaire
}

addButton.addEventListener("click", () => {
  resetModal2(); // Réinitialisez le formulaire lorsque vous ouvrez la modale d'ajout de photo
  modalAdd.style.display = "block";
});

// Fonction pour mettre à jour la modale 1 avec les dernières données
function refreshModal1(worksData) {
  const modalGallery = document.querySelector(".gallery-modal");
  modalGallery.innerHTML = "";

  worksData.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("img-modal");
    modalGallery.appendChild(galleryItem);

    const image = document.createElement("img");
    image.src = item.imageUrl;
    image.alt = item.title;
    image.classList.add("item__imgModal");
    galleryItem.appendChild(image);

    const trashButton = createTrashSVG();
    trashButton.id = item.id;
    trashButton.classList.add("svg-trash");
    galleryItem.appendChild(trashButton);

    trashButton.addEventListener("click", () => {
      deleteWorkOnServer(item.id);
      galleryItem.remove();
    });
  });
}
// Supposons que getWorksData est une fonction asynchrone qui récupère les données depuis un serveur
getWorksData().then((worksData) => {
  refreshModal1(worksData);
});
