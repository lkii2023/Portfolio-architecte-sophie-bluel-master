// Function to fetch data from the API
const get_api_works = async () => {
  try {
    // Send a GET request to the specified URL
    const response = await fetch("http://localhost:5678/api/works");

    // Parse the response as JSON
    const data = await response.json();

    // Return the retrieved data
    return data;
  } catch (error) {
    // Handle and log any errors that occur during the process
    console.log(error);
  }
};

// Call the get_api_works function
get_api_works()
  .then((data) => {
    // Log a success message along with the retrieved data
    console.log("Data retrieved successfully:", data);
  })
  .catch((error) => {
    // Log an error message along with the error details
    console.error("An error occurred:", error);
  });

// Function to fetch data from the API
const get_api_categories = async () => {
  try {
    // Send a GET request to the specified URL
    const response = await fetch("http://localhost:5678/api/categories");

    // Parse the response as JSON
    const data = await response.json();

    // Return the retrieved data
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Call the get_api_categories function
get_api_categories()
  .then((data) => {
    // Log a success message along with the retrieved data
    console.log("Data retrieved successfully:", data);
  })
  .catch((error) => {
    // Log an error message along with the error details
    console.error("An error occurred:", error);
  });
