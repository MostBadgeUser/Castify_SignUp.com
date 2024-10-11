// Initialize EmailJS
(function(){
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Check if user is already registered
function isUserRegistered(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

// Register user and store in localStorage
function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username); // Save the registered username (nickname)
}

// Send welcome email using EmailJS
function sendWelcomeEmail(email, username) {
    emailjs.send("service_eaz5mxs", "template_your_template_id", {
        to_email: email,
        username: username
    })
    .then(function(response) {
        console.log('Email sent successfully:', response);
    }, function(error) {
        console.error('Failed to send email:', error);
    });
}

// Handle registration form submission
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!isUserRegistered(username)) {
                registerUser(username, email, password);
                sendWelcomeEmail(email, username); // Send welcome email
                alert('Registration successful! Redirecting...');
                window.location.href = 'https://mostbadgeuser.github.io/Castify_Welcome.com/';
            } else {