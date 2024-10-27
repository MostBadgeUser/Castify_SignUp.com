// Save user in IndexedDB
function saveUser(username, password) {
    console.log("Saving user:", username);  // Log username
    const transaction = db.transaction("users", "readwrite");
    const store = transaction.objectStore("users");
    store.put({ username, password });
    transaction.oncomplete = () => alert("Account created successfully!");
    transaction.onerror = () => alert("Error saving account.");
}

// Validate user login
function validateUser(username, password, callback) {
    console.log("Validating user:", username);  // Log username
    const transaction = db.transaction("users", "readonly");
    const store = transaction.objectStore("users");
    const getUser = store.get(username);

    getUser.onsuccess = () => {
        if (getUser.result) {
            console.log("User found:", getUser.result);
            if (getUser.result.password === password) {
                callback(true);
            } else {
                console.log("Incorrect password");
                callback(false);
            }
        } else {
            console.log("Username not found");
            callback(false);
        }
    };
    getUser.onerror = () => callback(false);
}