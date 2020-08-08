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

var subscribersRef = firebase.database().ref("subscribers");

const form = document.getElementById("form");
const email = document.getElementById("email");
const name = document.getElementById("name");
var commentForm = document.querySelector(".comment-form");
const leaveComment = document.getElementById("leave-comment-btn");

leaveComment.addEventListener("click", () => {
  if (commentForm.style.display === "none") {
    commentForm.style.display = "inline-block";
  } else {
    commentForm.style.display = "none";
  }
});

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

function saveSubscribers(name, email) {
  var newSubscriberRef = subscribersRef.push();
  newSubscriberRef.set({
    name: name,
    email: email,
  });
}
// Elements validity

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    // checkRequired([name, email, message]) &&
    checkLength(name, 3, 40) &&
    checkEmail(email)
  ) {
    // save message to database
    saveSubscribers(name.value, email.value);

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
