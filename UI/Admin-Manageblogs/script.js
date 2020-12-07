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

function onFormSubmit() {
  insertNewRecord(formData);
}

function readFormData() {
  var formData = {};
  formData["title"] = document.getElementById("title").value;
  formData["message"] = document.getElementById("message-body").value;

  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.title;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

// Data validation in blog forms and firebase connection

var blogsRef = firebase.database().ref("blogs");

const form = document.getElementById("form");
const title = document.getElementById("title");
const avatar = document.getElementById("avatar");
const message = document.getElementById("message-body");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    removeError(input);
    return true;
  }
}
function removeError(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control";
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    removeError(input);
    return true;
  } else {
    showError(input, "Email is not valid");
  }
}
// get today's date
function getTodayDate() {
  var today = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = today.getMonth() + 1;
  for (let i = 0; i <= months.length - 1; i++) {
    if (i + 1 === month) {
      var monthWord = months[i];
    }
  }

  var date = monthWord + " " + today.getDate() + "," + today.getFullYear();
  return date;
}

function saveBlogs(title, message, avatar, date) {
  var autoID = blogsRef.push().key;
  blogsRef.child(autoID).set({
    title: title,
    message: message,
    avatar: avatar,
    date: date,
  });
}
// Elements validity

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    // checkRequired([name, email, message]) &&
    checkLength(title, 3, 80) &&
    checkLength(message, 6, 50000)
  ) {
    // save message to database
    saveBlogs(title.value, message.value, avatar.value, getTodayDate());

    //display alert
    document.querySelector(".alert").style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").style.display = "none";
    }, 1500);

    // Clear form
    document.getElementById("form").reset();
  }
});
const auth = firebase.auth();
const signout = document.getElementById("signout");
signout.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      window.location = "./../SignIn-page/index.html";
      console.log("User signed out successfully !");
    })
    .catch((error) => {
      console.error(error);
    });
});
