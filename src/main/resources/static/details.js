// Load animal details when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    await loadAnimalDetails();
});

// Function to get animal ID from URL parameters
function getAnimalIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Function to load and display animal details
async function loadAnimalDetails() {
    const animalId = getAnimalIdFromURL();
    
    console.log('Animal ID from URL:', animalId); // Debug log
    
    if (!animalId) {
        showError('No animal ID provided in URL');
        return;
    }
    
    try {
        // Show loading message
        showLoading();
        
        // Fetch animal data from API
        const animal = await fetchAnimalById(animalId);
        
        if (animal && animal.animalId) {
            displayAnimalDetails(animal);
        } else {
            showError('Animal not found');
        }
    } catch (error) {
        console.error('Error loading animal details:', error);
        showError('Failed to load animal details');
    }
}

// Function to display animal details on the page
function displayAnimalDetails(animal) {
    // Hide loading message
    hideLoading();
    
    // Show animal details section
    const detailsSection = document.getElementById('animal-details');
    detailsSection.style.display = 'block';
    
    // Populate the details
    document.getElementById('animal-title').textContent = animal.name;
    document.getElementById('animal-description').textContent = animal.description;
    document.getElementById('animal-habitat').textContent = animal.habitat || 'Unknown';
    document.getElementById('animal-species').textContent = animal.species || 'Unknown';
    document.getElementById('animal-id').textContent = animal.animalId;
    
    // Set the image
    const animalImage = document.getElementById('animal-image');
    animalImage.src = getImageForAnimal(animal.name);
    animalImage.alt = `Image of ${animal.name}`;
    
    // Update page title
    document.title = `${animal.name} Details`;
}

// Function to map animal names to image files (same as in index.js)
function getImageForAnimal(animalName) {
    const imageMap = {
        'Spider': 'Imagesfor340web/Samuria_Spider.jpg',
        'monkey': 'Imagesfor340web/Proboscis_Monkey.jpg',
        'Snake': 'Imagesfor340web/Snake_Image.jpg',
        'Monkey': 'Imagesfor340web/Proboscis_Monkey.jpg',
        'Shark': 'Imagesfor340web/Goblin_Shark.jpg',
        'Blue Dragon': 'Imagesfor340web/Blue_Dragon.jpg',
        'Goblin Shark': 'Imagesfor340web/Goblin_Shark.jpg',
        'Proboscis Monkey': 'Imagesfor340web/Proboscis_Monkey.jpg',
        'Joro Spider': 'Imagesfor340web/Samuria_Spider.jpg',
        'Fierce Snake': 'Imagesfor340web/Snake_Image.jpg',
        'Oxyuranus microlepidotus': 'Imagesfor340web/Snake_Image.jpg'
    };
    
    // Return mapped image or a default placeholder
    return imageMap[animalName] || 'Imagesfor340web/World.jpg';
}

// Function to show loading message
function showLoading() {
    document.getElementById('loading-message').style.display = 'block';
    document.getElementById('animal-details').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}

// Function to hide loading message
function hideLoading() {
    document.getElementById('loading-message').style.display = 'none';
}

// Function to show error message
function showError(message) {
    hideLoading();
    document.getElementById('animal-details').style.display = 'none';
    
    const errorSection = document.getElementById('error-message');
    errorSection.style.display = 'block';
    
    // Update error message if provided
    if (message) {
        const errorText = errorSection.querySelector('p');
        errorText.textContent = message;
    }
}