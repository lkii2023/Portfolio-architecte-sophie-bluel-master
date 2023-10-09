// Function to set the active button
const setActiveButton = (button) => {
  const filterButtons = document.querySelectorAll(".button-filter");
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
};

let worksData = [];

// Function to fetch works data from the API
const getWorksData = async () => {
  try {
    if (worksData.length > 0) {
      return worksData;
    } else {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();
      worksData = data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to fetch categories data from the API
const getCategoriesData = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error");
  }
};

// Function to render the gallery
const renderGallery = (items) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  items.forEach((item) => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("box");
    gallery.appendChild(galleryItem);
    galleryItem.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}" class="item__img">
      <h3 class="item__title">${item.title}</h3>
    `;
  });
};

// Function to filter works by category
const filterWorksByCategory = async (category) => {
  try {
    const allData = await getWorksData();
    const filteredData = allData.filter((data) =>
      category === "Tous" ? true : data.categoryId === category.id
    );
    renderGallery(filteredData);
  } catch (error) {
    console.log(error);
  }
};

// Initialize the gallery with all works and setup filtering
Promise.all([getWorksData(), getCategoriesData()]).then(
  ([worksData, categories]) => {
    const allCategoriesButton = document.querySelector("#all-filter");
    const buttonsContainer = document.querySelector("#js-filter-box");
    allCategoriesButton.addEventListener("click", () => {
      renderGallery(worksData);
      setActiveButton(allCategoriesButton);
    });

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.innerText = category.name;
      button.classList.add("button-filter");
      button.addEventListener("click", () => {
        filterWorksByCategory(category, worksData);
        setActiveButton(button);
      });
      buttonsContainer.appendChild(button);
    });
  }
);
