// Load the form functionality when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setupNewAnimalForm();
});

// Function to setup the new animal form submission
function setupNewAnimalForm() {
    const form = document.querySelector('.new-animal-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

// Function to handle form submission
async function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = getFormData();
    
    // Validate required fields
    if (!validateFormData(formData)) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    try {
        // Send POST request to create new animal
        const newAnimal = await createAnimal(formData);
        
        if (newAnimal) {
            // Success! Show success message and redirect
            showSuccessMessage();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showErrorMessage('Failed to create animal. Please try again.');
        }
    } catch (error) {
        console.error('Error creating animal:', error);
        showErrorMessage('An error occurred while creating the animal.');
    } finally {
        hideLoadingState();
    }
}

// Function to get form data and map it to API format
function getFormData() {
    const name = document.getElementById('animal-name').value.trim();
    const description = document.getElementById('animal-description').value.trim();
    const habitat = document.getElementById('animal-habitat').value.trim();
    const species = document.getElementById('animal-species').value.trim();
    
    // Note: The form has fields like 'type', 'age', and 'image' that don't match the API
    // We'll focus on the fields that match your database schema
    
    return {
        name: name,
        description: description,
        habitat: habitat || null, // habitat is optional in your database
        species: species
    };
}

// Function to validate form data
function validateFormData(formData) {
    const errors = [];
    
    if (!formData.name) {
        errors.push('Name is required');
    }
    
    if (!formData.description) {
        errors.push('Description is required');
    }
    
    if (!formData.species) {
        errors.push('Species is required');
    }
    
    if (errors.length > 0) {
        showErrorMessage('Please fix the following errors:\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

// Function to show loading state
function showLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Adding Animal...';
}

// Function to hide loading state
function hideLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = 'Add Animal';
}

// Function to show success message
function showSuccessMessage() {
    showMessage('Animal added successfully! Redirecting to home page...', 'success');
}

// Function to show error message
function showErrorMessage(message) {
    showMessage(message, 'error');
}

// Function to show messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.padding = '10px';
    messageDiv.style.margin = '10px 0';
    messageDiv.style.borderRadius = '4px';
    messageDiv.style.textAlign = 'center';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
    }
    
    // Insert message above the form
    const form = document.querySelector('.new-animal-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Test function to verify API connection
async function testAPIConnection() {
    try {
        const animals = await fetchAllAnimals();
        console.log('API Connection test successful. Current animals:', animals);
        return true;
    } catch (error) {
        console.error('API Connection test failed:', error);
        return false;
    }
}