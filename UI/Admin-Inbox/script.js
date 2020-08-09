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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

var messagesRef = firebase.database().ref("messages");
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
messagesRef.on("value", getData);

function insertNewRecord(name, message, date) {
  var messageDiv = document.createElement("div");
  messageDiv.className = "message-inbox";
  var a = document.createElement("a");
  a.href = "#";
  messageDiv.appendChild(a);
  var messageTitleDiv = document.createElement("div");
  messageTitleDiv.className = "message-inbox__title";
  var p = document.createElement("p");
  messageTitleDiv.appendChild(p);
  a.appendChild(messageTitleDiv);

  var messageBodyDiv = document.createElement("div");
  messageBodyDiv.className = "message-inbox__body";
  messageBodyDiv.appendChild(p);
  var messageDetailsDiv = document.createElement("div");
  messageDetailsDiv.className = "message-inbox__details";

  var senderNameDiv = document.createElement("div");
  senderNameDiv.appendChild(p);
  var receivedTimeDiv = document.createElement("div");
  receivedTimeDiv.appendChild(p);
  a.appendChild(messageBodyDiv);
  a.appendChild(messageDetailsDiv);
  messageDetailsDiv.appendChild(senderNameDiv);
  messageDetailsDiv.appendChild(receivedTimeDiv);
  const messagesContainer = document.querySelector(".messages-container");

  // const messagesContainer = document.querySelector(".messages-container");
  // const messageInbox = document.querySelector(".message-inbox");
  // const messageInboxTitle = document.querySelector(".message-inbox__title");
  // const messageInboxBody = document.querySelector(".message-inbox__body");
  // const senderName = document.querySelector(".sender-name");
  // const receivedTime = document.querySelector(".received-time");
  // const messageInboxDetails = document.querySelector(".message-inbox__details");

  senderNameDiv.innerHTML = name;
  messageBodyDiv.innerHTML = message;
  receivedTimeDiv.innerHTML = date;
  messageTitleDiv.innerHTML = "Message";
  var newBlog = messagesContainer.appendChild(messageDiv);
  messagesContainer.appendChild(newBlog);
}

function getData(data) {
  messages = data.val();
  var keys = Object.keys(messages);
  clearBlogs();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var name = messages[key].name;
    var email = messages[key].email;
    var message = messages[key].message;
    var date = messages[key].date;
    insertNewRecord(name, message, date);
  }
}

const clearBlogs = () => {
  const messagesContainer = document.querySelector(".messages-container");
  let oldBody = messagesContainer.querySelector("div");
  oldBody.innerHTML = "";
};
