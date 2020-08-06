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

var blogsRef = firebase.database().ref("blogs");
blogsRef.on("value", getData);

const updateBtn = document.getElementById("edit-btn");
const form = document.getElementById("form");
const title = document.getElementById("title");
const avatar = document.getElementById("avatar");
const message = document.getElementById("message-body");

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newData = {
    title: title.value,
    message: message.value,
    avatar: avatar.value,
  };
  console.log(newData);
  blogsRef.child(key).update(newData);
});
function populateInputs(title, avatar, message) {
  title.innerHTML = title;
  avatar.innerHTML = avatar;
  message.innerHTML = message;
}

function getData(data) {
  blogs = data.val();
  var keys = Object.keys(blogs);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // Look at each fruit object!
    var titleValue = blogs[key].title;
    var avatarValue = blogs[key].avatar;
    var messageValue = blogs[key].message;
    populateInputs(titleValue, avatarValue, messageValue);
    console.log(titleValue, messageValue);
  }
}
