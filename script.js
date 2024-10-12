// JavaScript for search functionality
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {
    const query = document.querySelector('.search-input').value;
    alert('Searching for: ' + query);
});

// Function to display user's nickname
function displayUsername() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const usernameDisplay = document.querySelector('.username');
        usernameDisplay.textContent = currentUser; // Set username in profile section
        document.querySelector('.profile-pic').src = 'https://i.ibb.co/Ksjms5W/icon.png'; // Set profile picture
    }
}

// Logout function to clear user session and navigate
function logout() {
    localStorage.removeItem('currentUser'); // Clear user session
    alert('Logged out!'); // Notify user
    window.location.href = 'https://mostbadgeuser.github.io/Castify.com/'; // Navigate to the specified page
}

// Attach logout function to logout button
document.querySelector('.logout-button').addEventListener('click', logout);

// Call displayUsername function on page load
document.addEventListener('DOMContentLoaded', displayUsername);