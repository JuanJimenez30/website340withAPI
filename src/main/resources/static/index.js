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
    
    // Add edit and delete buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'animal-actions';
    buttonContainer.style.marginTop = '10px';
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = () => openEditModal(animal);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => confirmDeleteAnimal(animal.animalId);
    
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    figure.appendChild(buttonContainer);
    
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

// Function to open edit modal
function openEditModal(animal) {
    const modal = document.getElementById('editModal');
    
    // Fill form with current animal data
    document.getElementById('editAnimalId').value = animal.animalId;
    document.getElementById('editName').value = animal.name;
    document.getElementById('editDescription').value = animal.description;
    document.getElementById('editHabitat').value = animal.habitat || '';
    document.getElementById('editSpecies').value = animal.species || '';
    
    modal.style.display = 'block';
}

// Function to close edit modal
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Function to handle edit form submission
async function handleEditSubmit(event) {
    event.preventDefault();
    
    const animalId = document.getElementById('editAnimalId').value;
    const animalData = {
        animalId: parseInt(animalId),
        name: document.getElementById('editName').value,
        description: document.getElementById('editDescription').value,
        habitat: document.getElementById('editHabitat').value,
        species: document.getElementById('editSpecies').value
    };
    
    try {
        const updatedAnimal = await updateAnimal(animalId, animalData);
        if (updatedAnimal) {
            closeEditModal();
            await loadAnimals(); // Refresh the list
            alert('Animal updated successfully!');
        } else {
            alert('Failed to update animal. Please try again.');
        }
    } catch (error) {
        console.error('Error updating animal:', error);
        alert('An error occurred while updating the animal.');
    }
}

// Function to confirm and delete animal
async function confirmDeleteAnimal(animalId) {
    if (confirm('Are you sure you want to delete this animal? This action cannot be undone.')) {
        try {
            const result = await deleteAnimal(animalId);
            if (result) {
                await loadAnimals(); // Refresh the list
                alert('Animal deleted successfully!');
            } else {
                alert('Failed to delete animal. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting animal:', error);
            alert('An error occurred while deleting the animal.');
        }
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target == modal) {
        closeEditModal();
    }
}