// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBL6YJVE6Pg6gABRWUL2g12iMDSxIld1EY",
  authDomain: "innocent-ingabire---portfolio.firebaseapp.com",
  databaseURL: "https://innocent-ingabire---portfolio.firebaseio.com",
  projectId: "innocent-ingabire---portfolio",
  storageBucket: "innocent-ingabire---portfolio.appspot.com",
  messagingSenderId: "583842392187",
  appId: "1:583842392187:web:2c9389562ce0f69a651ade",
  measurementId: "G-4YZ43XFW66",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

function myFunction2() {
  document.getElementById("myDropdown1").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown1");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

// js toggle sections

var profileSection = document.getElementById("profile-section");
var subscriptionSection = document.getElementById("subscription-section");
var indicator = document.getElementById("indicator");

function loadProfile() {
  profileSection.style.display = "block";
  subscriptionSection.style.display = "none";
  indicator.style.transform = "translateX(0px)";
}
function loadSubscribers() {
  profileSection.style.display = "none";
  subscriptionSection.style.display = "block";
  indicator.style.transform = "translateX(100px)";
}

const signout = document.getElementById("signout");
signout.addEventListener("click", () => {
  localstorage.removeItem("token");
  window.location.href = "./../SignIn-page/index.html";
});
