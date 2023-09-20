// Function to fetch data from the API
const fetchDataFromAPI = async (url) => {
  try {
    // Send a GET request to the specified URL
    const response = await fetch(url);

    // Parse the response as JSON
    const data = await response.json();

    // Return the retrieved data
    return data;
  } catch (error) {
    // Handle and log any errors that occur during the process
    console.error("An error occurred:", error);

    // Throw the error to handle it at the caller if needed
    throw error;
  }
};

// Call the function to fetch works data
fetchDataFromAPI("http://localhost:5678/api/works")
  .then((worksData) => {
    // Log a success message along with the retrieved data
    console.log("Work data retrieved successfully:", worksData);

    // Get the gallery container
    const gallery = document.querySelector(".gallery");

    // Clear existing work items in the gallery
    gallery.innerHTML = "";

    // Iterate through the retrieved works and create HTML elements for each work
    worksData.forEach((work) => {
      // Create a figure element for each work
      const figure = document.createElement("figure");

      // Create an image element
      const image = document.createElement("img");
      image.src = work.imageUrl; // Set the image source from the data
      image.alt = work.title; // Set the alt text from the data

      // Create a figcaption element
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title; // Set the text content from the data

      // Append the image and figcaption to the figure element
      figure.appendChild(image);
      figure.appendChild(figcaption);

      // Append the figure element to the gallery
      gallery.appendChild(figure);
    });
  })
  .catch((error) => {
    // Handle the error here if needed
    console.error("An error occurred:", error);
  });
