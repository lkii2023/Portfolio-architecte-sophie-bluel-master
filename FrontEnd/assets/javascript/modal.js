// modal1
function openModal() {
  getWorksData().then((worksData) => {
    const renderGallery = () => {
      const gallery = document.querySelector(".gallery-modal");
      gallery.innerHTML = "";
      renderModalGallery(worksData);
    };

    const modalGallery = document.querySelector(".gallery-modal");

    renderGallery(worksData, modalGallery);

    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".modal").classList.add("modal-open");
  });
}

overlay.addEventListener("click", function (event) {
  if (event.target === overlay) {
    closeModal();
  }
});

function closeModal() {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".modal-container").classList.remove("modal-open");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);

async function deleteWorkOnServer(id) {
  try {
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

    if (galleryItem) {
      galleryItem.remove();
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du travail sur le serveur : " + error
    );
  }
}

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
    const galleryItem = svg.parentElement;
    galleryItem.remove();
  });
  return svg;
};

// modal2
function backToGallery() {
  modalAdd.style.display = "none";
}

addButton.addEventListener("click", () => {
  modalAdd.style.display = "block";
});

backToPreviousModalButton.addEventListener("click", () => {
  modalAdd.style.display = "none";
  modalPrevious.style.display = "block";
});

function handleImagePreview() {
  const fileInput = document.getElementById("file-input");
  const imagePreview = document.querySelector(".preview-img");

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

document
  .getElementById("file-input")
  .addEventListener("change", handleImagePreview);

// Event handler for the project addition form
formAddImg.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorTitleForm.style.display = "none";

  const title = titleInput.value;
  const category = categorySelect.value;

  if (!title || category === "") {
    errorTitleForm.style.display = "block";
  } else {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    if (fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]);
    } else {
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
        const responseData = await response.json();
        worksData.push(responseData);

        renderModalGallery(worksData);
        renderMainGallery(worksData);
      } else {
        console.error("Erreur lors de l'envoi du projet au serveur.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du projet au serveur : " + error);
    }
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

titleInput.addEventListener("input", toggleButtonColor);
categorySelect.addEventListener("input", toggleButtonColor);
fileInput.addEventListener("change", toggleButtonColor);

function toggleButtonColor() {
  if (titleInput.value && categorySelect.value && fileInput.files.length > 0) {
    confirmButton.classList.add("active");
  } else {
    confirmButton.classList.remove("active");
  }
}

function resetForm() {
  const titleInput = document.querySelector("#titre");
  const categorySelect = document.querySelector("#categorie");
  const fileInput = document.querySelector("#file-input");
  const imagePreview = document.querySelector("#preview");
  const confirmButton = document.querySelector(".confirm-button-form-add");

  titleInput.value = "";
  categorySelect.value = "";
  fileInput.value = "";
  imagePreview.style.display = "none";
  confirmButton.classList.remove("active");
}

addButton.addEventListener("click", () => {
  resetForm();
  modalAdd.style.display = "block";
});

//Function to update the modal and main gallery with the latest data
function renderModalGalleryItem(item) {
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("img-modal");
  galleryItem.id = `main-item-${item.id}`;

  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.title;
  image.classList.add("item__imgModal");
  galleryItem.appendChild(image);

  const trashButton = createTrashSVG();
  trashButton.id = item.id;
  trashButton.classList.add("svg-trash");
  galleryItem.appendChild(trashButton);

  trashButton.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `http://localhost:5678/api/works/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const index = worksData.findIndex((work) => work.id === item.id);
        if (index !== -1) {
          worksData.splice(index, 1);
        }

        galleryItem.remove();

        const mainGalleryItem = document.getElementById(`main-item-${item.id}`);
        if (mainGalleryItem) {
          mainGalleryItem.remove();
        }
      } else {
        throw new Error(
          "Erreur lors de la suppression du travail sur le serveur."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression : " + error);
    }
  });

  return galleryItem;
}

function renderMainGalleryItem(item) {
  const galleryItem = document.createElement("div");
  galleryItem.classList.add("img-modal");
  galleryItem.id = `main-item-${item.id}`;

  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.title;
  image.classList.add("item__imgModal");
  galleryItem.appendChild(image);

  const titleParagraph = document.createElement("p");
  titleParagraph.textContent = item.title;
  galleryItem.appendChild(titleParagraph);

  return galleryItem;
}

function renderModalGallery(worksData) {
  const modalGallery = document.querySelector(".gallery-modal");
  modalGallery.innerHTML = "";

  worksData.map((item) => {
    const galleryItem = renderModalGalleryItem(item);
    modalGallery.appendChild(galleryItem);
  });
}

function renderMainGallery(worksData) {
  const mainGallery = document.querySelector(".gallery");
  mainGallery.innerHTML = worksData
    .map((item) => {
      const galleryItem = renderMainGalleryItem(item);
      return galleryItem.outerHTML;
    })
    .join("");
}

getWorksData().then((worksData) => {
  renderModalGallery(worksData);
  renderMainGallery(worksData);
});
