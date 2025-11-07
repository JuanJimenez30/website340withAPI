// Load and display animals when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    await loadAnimals();
    setupSearchFunctionality();
});

// Function to load and display animals from the API
async function loadAnimals() {
    const animals = await fetchAllAnimals();
    displayAnimals(animals);
}

// Function to display animals on the page
function displayAnimals(animals) {
    // Get the container where we'll put the animal figures
    const body = document.body;
    
    // Remove loading message
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
    
    // Remove existing animal figures (everything after the search bar)
    const searchContainer = document.querySelector('.search-bar-container');
    let nextElement = searchContainer.nextElementSibling;
    while (nextElement) {
        const toRemove = nextElement;
        nextElement = nextElement.nextElementSibling;
        if (toRemove.tagName === 'FIGURE') {
            toRemove.remove();
        }
    }
    
    // Show message if no animals found
    if (animals.length === 0) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.style.textAlign = 'center';
        noResultsDiv.style.margin = '20px';
        noResultsDiv.textContent = 'No animals found.';
        body.appendChild(noResultsDiv);
        return;
    }
    
    // Create and append new animal figures
    animals.forEach(animal => {
        const figure = createAnimalFigure(animal);
        body.appendChild(figure);
    });
}

// Function to create an HTML figure element for an animal
function createAnimalFigure(animal) {
    const figure = document.createElement('figure');
    figure.className = `animal-section-${animal.animalId}`;
    figure.style.textAlign = 'center';
    
    // Create the link and image
    const link = document.createElement('a');
    link.href = `details.html?id=${animal.animalId}`;
    
    const img = document.createElement('img');
    // You'll need to map your animal names to image files
    // For now, using a placeholder or default image
    img.src = getImageForAnimal(animal.name);
    img.alt = `This is a ${animal.name}`;
    img.width = 250;
    img.height = 250;
    
    link.appendChild(img);
    figure.appendChild(link);
    
    // Create the caption
    const figcaption = document.createElement('figcaption');
    const captionLink = document.createElement('a');
    captionLink.href = `details.html?id=${animal.animalId}`;
    captionLink.textContent = animal.name;
    
    figcaption.appendChild(captionLink);
    figcaption.appendChild(document.createTextNode(` - ${animal.description}`));
    
    // Add habitat and species if available
    if (animal.habitat) {
        figcaption.appendChild(document.createElement('br'));
        figcaption.appendChild(document.createTextNode(`Habitat: ${animal.habitat}`));
    }
    if (animal.species) {
        figcaption.appendChild(document.createElement('br'));
        figcaption.appendChild(document.createTextNode(`Species: ${animal.species}`));
    }
    
    figure.appendChild(figcaption);
    
    return figure;
}

// Function to map animal names to image files
function getImageForAnimal(animalName) {
    const imageMap = {
        'Spider': 'Imagesfor340web/Samuria_Spider.jpg',
        'monkey': 'Imagesfor340web/Proboscis_Monkey.jpg',  // Fixed: lowercase 'monkey' to match database
        'Snake': 'Imagesfor340web/Snake_Image.jpg',
        'Monkey': 'Imagesfor340web/Proboscis_Monkey.jpg',  // Keep both cases for flexibility
        'Shark': 'Imagesfor340web/Goblin_Shark.jpg',
        'Blue Dragon': 'Imagesfor340web/Blue_Dragon.jpg',
        'Goblin Shark': 'Imagesfor340web/Goblin_Shark.jpg',
        'Proboscis Monkey': 'Imagesfor340web/Proboscis_Monkey.jpg',
        'Joro Spider': 'Imagesfor340web/Samuria_Spider.jpg'
    };
    
    // Return mapped image or a default placeholder (World.jpg as fallback)
    return imageMap[animalName] || 'Imagesfor340web/World.jpg';
}

// Function to setup search functionality
function setupSearchFunctionality() {
    const searchForm = document.querySelector('.search-bar-container form');
    const searchInput = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    
    // Handle form submission
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent form from submitting normally
        
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // Search for animals by name
            const searchResults = await searchAnimalsByName(searchTerm);
            displayAnimals(searchResults);
        } else {
            // If search is empty, show all animals
            await loadAnimals();
        }
    });
    
    // Also trigger search when clicking the search button
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        searchForm.dispatchEvent(new Event('submit'));
    });
}

// Function to filter by habitat (you can call this from buttons or dropdowns)
async function filterByHabitat(habitat) {
    const animals = await fetchAnimalsByHabitat(habitat);
    displayAnimals(animals);
}

// Function to show all animals (reset filter)
async function showAllAnimals() {
    await loadAnimals();
}