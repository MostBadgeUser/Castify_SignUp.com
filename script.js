// Function to save user to local storage
function saveUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to validate user login
function validateUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username && user.password === password);
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (validateUser(username, password)) {
        alert('Login successful! Redirecting...');
        localStorage.setItem('currentUser', username);
        window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/'; // Redirect URL
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if the username already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists. Please choose a different username.');
    } else {
        saveUser(username, password);
        alert('Account created successfully! You can now log in.');
        document.getElementById('signupBox').style.display = 'none';
        document.getElementById('loginBox').style.display = 'block';
    }
});

// Show signup form
document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('signupBox').style.display = 'block';
});

// Show login form
document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('signupBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
});