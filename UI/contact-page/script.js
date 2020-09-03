const BASE_URL = "https://mybrand-innocentingabire.herokuapp.com/api";

const form = document.getElementById("form");
const email = document.getElementById("email");
const name = document.getElementById("name");
const message = document.getElementById("message");

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
    return true;
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
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

function saveMessages(name, email, message) {
  const query = {
    name: name,
    email: email,
    message: message,
  };
  axios.post(`${BASE_URL}/queries`, query).then((res) => {
    console.log(res);
  });
}
// Elements validity

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    // checkRequired([name, email, message]) &&
    checkLength(name, 3, 40) &&
    checkLength(message, 6, 1000) &&
    checkEmail(email)
  ) {
    // save message to database
    saveMessages(name.value, email.value, message.value);

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
