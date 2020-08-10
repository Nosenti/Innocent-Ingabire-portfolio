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
var blogsRef = firebase.database().ref("blogs");

const form = document.getElementById("form");
const email = document.getElementById("email");
const name = document.getElementById("name");

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

blogsRef.on("value", getData);

var blogsContainer = document.querySelector(".blogs-wrapper");
function insertNewRecord(avatar, message, date, title) {
  var blogDiv = document.createElement("div");
  var blogTitleDiv = document.createElement("div");
  var blogDetailsDiv = document.createElement("div");
  var blogDatesDiv = document.createElement("div");
  var blogCommentsDiv = document.createElement("div");
  var blogPicDiv = document.createElement("div");
  var blogTextDiv = document.createElement("div");
  var blogMoreDiv = document.createElement("div");
  var blogReadMoreDiv = document.createElement("div");
  // var blogDotsDiv = document.createElement("div");

  blogDiv.className = "blog";
  blogTitleDiv.className = "blog-title";
  blogDetailsDiv.className = "blog-details";
  blogDatesDiv.className = "dates";
  blogCommentsDiv.className = "comments";
  blogPicDiv.className = "blog-pic";
  blogTextDiv.className = "blog-text";
  blogMoreDiv.className = "blog-more";
  blogReadMoreDiv.className = "read-more";
  // blogDotsDiv.className = "dots-options";

  var t = document.createElement("h1");
  blogTitleDiv.appendChild(t);

  var date = document.createElement("p");
  blogDatesDiv.appendChild(date);

  var d = document.createElement("p");
  blogDetailsDiv.appendChild(d);

  var c = document.createElement("p");
  blogCommentsDiv.appendChild(c);

  var a = document.createElement("a");
  blogReadMoreDiv.appendChild(a);

  var image = document.createElement("img");
  blogPicDiv.appendChild(image);

  var text = document.createElement("p");
  blogTextDiv.appendChild(text);

  var read = document.createElement("p");
  a.appendChild(read);

  t.innerHTML = title;
  blogPicDiv.innerHTML = avatar;
  text.innerHTML = message;

  blogDiv.appendChild(t);
  blogDiv.appendChild(blogDatesDiv);
  blogDiv.appendChild(blogPicDiv);
  blogDiv.appendChild(blogTextDiv);
  blogDiv.appendChild(blogMoreDiv);

  // var dots = document.createElement("p");
  // blogDotsDiv.appendChild(dots);
  var newBlog = blogDiv;
  a.href = "blog.html";

  blogsContainer.appendChild(newBlog);
}

function getData(data) {
  blogs = data.val();
  var keys = Object.keys(blogs);
  // clearBlogs();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var avatar = blogs[key].avatar;
    var date = blogs[key].date;
    var message = blogs[key].message;
    var title = blogs[key].title;
    insertNewRecord(avatar, message, date, title);
  }
}

// const clearBlogs = () => {
//   blogsContainer = document.querySelector(".messages-container");
//   let oldBody = blogsContainer.querySelector("div");
//   oldBody.innerHTML = "";
// };
