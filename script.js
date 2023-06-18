const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const imageContainer = document.getElementById('imageContainer');

// Event listener for the search form submission
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Clear previous search results
  imageContainer.innerHTML = '';

  // Get the search keyword
  const keyword = searchInput.value.trim();

  // Call the NASA API to search for images
  searchImages(keyword);
});

// Function to search for images using NASA API
function searchImages(keyword) {
  const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(keyword)}&media_type=image`;

  // Make a GET request to the NASA API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const items = data.collection.items;

      // Display each image in the search results
      items.forEach(item => {
        const imageUrl = item.links[0].href;
        const title = item.data[0].title;
        const description = item.data[0].description;

        // Create image item HTML
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = title;

        const caption = document.createElement('p');
        caption.textContent = title;

        const desc = document.createElement('p');
        desc.textContent = description;

        imageItem.appendChild(image);
        imageItem.appendChild(caption);
        imageItem.appendChild(desc);

        imageContainer.appendChild(imageItem);
      });
    })
    .catch(error => {
      console.error('Error searching images:', error);
    });
}
