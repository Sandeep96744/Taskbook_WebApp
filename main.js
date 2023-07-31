// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDsJPN8kGAPnTLYVhYNXsREwDh8YanFpg",
    authDomain: "taskbooklogin.firebaseapp.com",
    projectId: "taskbooklogin",
    storageBucket: "taskbooklogin.appspot.com",
    messagingSenderId: "442429643096",
    appId: "1:442429643096:web:a5d073c56dcf361c0fed2d",
    measurementId: "G-9NLL3PF49M"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

// Function to save the user info to localStorage after successful login
function saveUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}


// Function to redirect to the home page
function redirectToHomePage() {
  window.location.href = 'index.html';
}

// Function to handle login process
function handleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      saveUserToLocalStorage(user);

      // Redirect to the home page
      redirectToHomePage();
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

// Function to check if the user is logged in
function isUserLoggedIn() {
  // Check if there is a user in localStorage
  const user = localStorage.getItem('user');
  return user !== null;
}

document.addEventListener('DOMContentLoaded', function() {
    if (isUserLoggedIn()) {
      // User is already logged in, redirect to the home page if not already on it
      if (!window.location.href.includes('index.html')) {
        redirectToHomePage();
      }
    } else {
      // User is not logged in, show the login button and add a click event to trigger the handleLogin function
      if (!window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
      }
      const loginButton = document.getElementById('login');
      loginButton.addEventListener('click', handleLogin);
    }
  });

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', (e) => {
  signOut(auth).then(() => {
    // Sign-out successful.
    localStorage.removeItem('user');
    window.location.href = "login.html";
    alert("Sign-out Success!");
  }).catch((error) => {
    // An error happened.
    console.error(error);
  });
});
