console.log("Part 3: Registration Form Validation Requirements");
console.log("======================================")

// error display: 

document.addEventListener("DOMContentLoaded", () => {
    const errorDisplay = document.getElementById("errorDisplay");


// Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.

// Registration Form Validation
const registrationForm = document.getElementById("registration");
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values
  const username = registrationForm.elements["username"].value.trim();
  const email = registrationForm.elements["email"].value.trim();
  const password = registrationForm.elements["password"].value;
  const passwordCheck = registrationForm.elements["passwordCheck"].value;
  const terms = registrationForm.elements["terms"].checked;

  // Clear previous errors
  errorDisplay.style.display = "none";
  errorDisplay.innerHTML = "";

  // Validate Username (in HTML file instead)
//   if (!username) {
//     showError("Username can't be blank.");
//     return;
//   }
//   if (username.length < 4) {
//     showError("Username must be a minimum of 4 characters long.");
//     return;
//   }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    showError("Username cannot have special characters or spaces.");
    return;
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some((user) => user.username === username.toLowerCase())) {
    showError("That username is already taken. Please select another.");
    return;
  }

// Registration Form - Email Validation:
// The email must be a valid email address.
// The email must not be from the domain "example.com."
// Validate Email
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test(email)) {
  showError("Please enter a valid email.");
  return;
}
if (email.includes("example.com")) {
  showError("Email cannot be from the domain 'example.com'.");
  return;
}

// Registration Form - Password Validation:
// Passwords must be at least 12 characters long.
// Passwords must have at least one uppercase and one lowercase letter.
// Passwords must contain at least one number.
// Passwords must contain at least one special character.
// Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
// Passwords cannot contain the username.
// Both passwords must match.
// Validate Password
if (password.length < 12) {
    showError("Password must be a minimum of 12 characters long.");
    return;
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    showError("Password should have both uppercase and lowercase letters.");
    return;
  }
  if (!/\d/.test(password)) {
    showError("Password should have at least one number.");
    return;
  }
  if (!/[\W_]/.test(password)) {
    showError("Password should have at least one special character.");
    return;
  }
  if (password.toLowerCase().includes("password")) {
    showError("Password cannot contain the word 'password'.");
    return;
  }
  if (password.toLowerCase().includes(username.toLowerCase())) {
    showError("Password should not have the username.");
    return;
  }
  if (password !== passwordCheck) {
    showError("Passwords don't match.");
    return;
  }

// Registration Form - Terms and Conditions:
// The terms and conditions must be accepted.
// Validate Terms
if (!terms) {
    showError("Please accept the terms and conditions to continue.");
    return;
  }



// Registration Form - Form Submission:

// If all validation is successful, store the username, email, and password using localStorage.

// Valid usernames should be converted to all lowercase before being stored.

// Valid emails should be converted to all lowercase before being stored.
// Store User Info in LocalStorage

const userData = {
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
  };
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  // Clear all form fields after successful submission and show a success message.
  
  registrationForm.reset();
  showSuccess("Registration successful!");
});


// Registration Form - Username Validation (Part Two):
// Now that we are storing usernames, create an additional validation rule for them...
// Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.
      
  
      
console.log("Part 4: Login Form Validation Requirements");

console.log("======================================")



// For the Login Form section of the page, implement the following validation requirements:
// Login Form - Username Validation:
// The username cannot be blank.
// The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.

// Login Form - Password Validation:
// The password cannot be blank.
// The password must be correct (validate against localStorage).
// Login Form Validation

// Login Form - Form Submission:
// If all validation is successful, clear all form fields and show a success message.
// If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).
// Clear previous errors
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values
  const username = loginForm.elements["username"].value.trim();
  const password = loginForm.elements["password"].value;
  const persist = loginForm.elements["persist"].checked;

errorDisplay.style.display = "none";
errorDisplay.innerHTML = "";
  
      
      // Validate Username
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = storedUsers.find((user) => user.username === username.toLowerCase());
      if (!user) {
        showError("Username not found.");
        return;
      }
  
      // Validate Password
      if (password !== user.password) {
        showError("Incorrect password.");
        return;
      }
  
      // Successful Login
      loginForm.reset();
      showSuccess(persist ? "Login successful! (Keep me logged in)" : "Login successful!");
    });
  
    // Function to display error message
    function showError(message) {
      errorDisplay.style.display = "block";
      errorDisplay.innerHTML = message;
    }
  
    // Function to display success message
    function showSuccess(message) {
      errorDisplay.style.display = "block";
      errorDisplay.innerHTML = `<span style="color: green;">${message}</span>`;
    }
  });
  