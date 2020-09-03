const BASE_URL = "https://mybrand-innocentingabire.herokuapp.com/api";

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

function saveBlogs(title, message) {
  let token = localStorage.getItem("token");
  const blog = {
    title: title,
    content: message,
  };
  axios
    .post(`${BASE_URL}/user/blogs`, blog, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
    });
}
// Elements validity

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    // checkRequired([name, email, message]) &&
    checkLength(title, 3, 80) &&
    checkLength(message, 6, 4000)
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

const signout = document.getElementById("signout");
signout.addEventListener("click", () => {
  localstorage.removeItem("token");
  window.location.href = "./../SignIn-page/index.html";
});
