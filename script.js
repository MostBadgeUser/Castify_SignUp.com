// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDTqZeTMNIAjBt9ArxAVG3HWL0zXiU9GnM",
    authDomain: "castify-d259d.firebaseapp.com",
    projectId: "castify-d259d",
    storageBucket: "castify-d259d.appspot.com",
    messagingSenderId: "809904193970",
    appId: "1:809904193970:web:af4a99b6e3b8738adc64ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Registration
document.getElementById('registerBtn').addEventListener('click', async () => {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store the username and email in Firestore
        await setDoc(doc(db, "users", username), { username, email });

        alert('Registration successful! You can log in now.');
        document.getElementById('registerContainer').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } catch (error) {
        alert('Registration failed: ' + error.message);
        console.error('Registration error:', error);
    }
});

// Handle Login
document.getElementById('loginBtn').addEventListener('click', async () => {
    const loginInput = document.getElementById('loginNickname').value; // Get nickname or email
    const password = document.getElementById('loginPassword').value; // Get password

    try {
        let email;

        // Check if the input is an email or nickname
        if (loginInput.includes('@')) {
            email = loginInput; // It's an email
        } else {
            // Look up the email associated with the nickname in Firestore
            const userDoc = await getDoc(doc(db, "users", loginInput));
            if (userDoc.exists()) {
                email = userDoc.data().email; // Get email from Firestore
            } else {
                alert('Nickname not found. Please try again.');
                return; // Exit the function early
            }
        }

        // Sign in with email
        await signInWithEmailAndPassword(auth, email, password);
        
        alert(`Login successful! Welcome, ${loginInput}! Redirecting...`);
        window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/';
    } catch (error) {
        console.error('Login error:', error);
        alert('Invalid credentials. Please try again. Error: ' + error.message);
    }
});

// Show Register Form
document.getElementById('showRegister').addEventListener('click', () => {
    document.getElementById('registerContainer').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

// Cancel Registration
document.getElementById('cancelRegister').addEventListener('click', () => {
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});