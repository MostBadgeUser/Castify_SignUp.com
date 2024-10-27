// Open IndexedDB
const request = indexedDB.open("CastifyDB", 1);

request.onupgradeneeded = event => {
    const db = event.target.result;
    db.createObjectStore("users", { keyPath: "username" });
};

request.onsuccess = () => {
    const db = request.result;

    // Save user in IndexedDB
    function saveUser(username, password) {
        const transaction = db.transaction("users", "readwrite");
        const store = transaction.objectStore("users");
        store.put({ username, password });
        transaction.oncomplete = () => alert("Account created successfully!");
        transaction.onerror = () => alert("Error saving account.");
    }

    // Validate user login
    function validateUser(username, password, callback) {
        const transaction = db.transaction("users", "readonly");
        const store = transaction.objectStore("users");
        const getUser = store.get(username);

        getUser.onsuccess = () => {
            if (getUser.result && getUser.result.password === password) {
                callback(true);
            } else {
                callback(false);
            }
        };
        getUser.onerror = () => callback(false);
    }

    // Handle login submission
    document.getElementById("loginForm").addEventListener("submit", event => {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        validateUser(username, password, isValid => {
            if (isValid) {
                alert("Login successful! Redirecting...");
                window.location.href = "https://mostbadgeuser.github.io/Castify1.com/";
            } else {
                alert("Invalid username or password.");
            }
        });
    });

    // Handle signup submission
    document.getElementById("signupForm").addEventListener("submit", event => {
        event.preventDefault();
        const username = document.getElementById("signupUsername").value;
        const password = document.getElementById("signupPassword").value;
        saveUser(username, password);
        document.getElementById("signupBox").style.display = "none";
        document.getElementById("loginBox").style.display = "block";
    });

    // Toggle between login and signup forms
    document.getElementById("showSignup").addEventListener("click", () => {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("signupBox").style.display = "block";
    });

    document.getElementById("showLogin").addEventListener("click", () => {
        document.getElementById("signupBox").style.display = "none";
        document.getElementById("loginBox").style.display = "block";
    });
};