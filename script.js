// Function to check if the user exists and password matches
function isValidUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Registered Users:', users); // Debugging line
    return users.some(user => user.username === username && user.password === password);
}

// Function to register a new user
function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (!userExists) {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        toggleRegistration(false); // Hide registration form
    } else {
        alert('Username already exists. Please choose a different username.');
    }
}

// Toggle registration form visibility
function toggleRegistration(show) {
    const registerContainer = document.getElementById('registerContainer');
    const loginForm = document.getElementById('loginForm');
    if (show) {
        registerContainer.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        registerContainer.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log('Attempting login with:', username, password); // Debugging line

    if (isValidUser(username, password)) {
        // Set the current user in localStorage and redirect to the welcome page
        localStorage.setItem('currentUser', username);
        alert('Login successful! Redirecting...');
        window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/'; // Redirect URL
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Handle registration button click
document.getElementById('registerBtn').addEventListener('click', function() {
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    registerUser(newUsername, newPassword);
});

// Show registration form when "Create an Account" link is clicked
document.getElementById('showRegister').addEventListener('click', function(event) {
    event.preventDefault();
    toggleRegistration(true);
});

// Cancel registration and go back to login
document.getElementById('cancelRegister').addEventListener('click', function() {
    toggleRegistration(false);
});