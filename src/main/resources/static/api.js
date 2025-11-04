// API base URL - adjust if your server runs on a different port
const API_BASE_URL = 'http://localhost:8080';

// Function to fetch all animals from the API
async function fetchAllAnimals() {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animals = await response.json();
        return animals;
    } catch (error) {
        console.error('Error fetching animals:', error);
        return [];
    }
}

// Function to fetch a specific animal by ID
async function fetchAnimalById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animal = await response.json();
        return animal;
    } catch (error) {
        console.error('Error fetching animal by ID:', error);
        return null;
    }
}

// Function to search animals by name
async function searchAnimalsByName(name) {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals/name?key=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animals = await response.json();
        return animals;
    } catch (error) {
        console.error('Error searching animals by name:', error);
        return [];
    }
}

// Function to filter animals by habitat
async function fetchAnimalsByHabitat(habitat) {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals?habitat=${encodeURIComponent(habitat)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animals = await response.json();
        return animals;
    } catch (error) {
        console.error('Error fetching animals by habitat:', error);
        return [];
    }
}

// Function to create a new animal (POST request)
async function createAnimal(animalData) {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animalData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newAnimal = await response.json();
        return newAnimal;
    } catch (error) {
        console.error('Error creating animal:', error);
        return null;
    }
}

// Function to update an existing animal (PUT request)
async function updateAnimal(id, animalData) {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animalData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedAnimal = await response.json();
        return updatedAnimal;
    } catch (error) {
        console.error('Error updating animal:', error);
        return null;
    }
}

// Function to delete an animal (DELETE request)
async function deleteAnimal(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/weird-animals/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // The API returns the updated list of all animals after deletion
        const remainingAnimals = await response.json();
        return remainingAnimals;
    } catch (error) {
        console.error('Error deleting animal:', error);
        return null;
    }
}