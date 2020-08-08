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
/**
 * Initiate fetching
 */
let postId;
var blogsRef = firebase.database().ref("blogs");

const updateBtn = document.getElementById("edit-btn");
const form = document.getElementById("form");
const title = document.getElementById("title");
const avatar = document.getElementById("avatar");
const message = document.getElementById("message-body");

/**
 * Listens to blog save edits and saves them
 */
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newData = {
    title: title.value,
    message: message.value,
    avatar: avatar.value,
  };
  console.log(newData);
  blogsRef.child(postId).update(newData);
});
/**
 * Takes fetched data and populates them to inputs
 * @param {*} title
 * @param {*} avatar
 * @param {*} message
 */
function populateInputs(_title, _avatar, _message) {
  title.value = _title;
  avatar.value = _avatar;
  message.value = _message;
}

/**
 * Fetch data for a specific post
 * And populte them to their respective inputs
 * @param {*} data
 */
function getData(data) {
  data = data.val();
  data = data[postId];
  console.log("Got ", data);

  // Look at each fruit object!
  var titleValue = data.title;
  var avatarValue = data.avatar;
  var messageValue = data.message;
  populateInputs(titleValue, avatarValue, messageValue);
  console.log(titleValue, messageValue);
}

/**
 * Window on load
 * We retrieve the id of the post that we should fetch
 *
 */
window.onload = (e) => {
  postId = window.location.href.slice(window.location.href.search("#") + 1);
  blogsRef.orderByKey().equalTo(postId).on("value", getData);
};
