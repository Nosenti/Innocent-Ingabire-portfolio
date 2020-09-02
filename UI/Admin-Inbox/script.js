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
getData();

function insertNewRecord(name, email, message, date) {
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

async function getData() {
  try {
    let token = localStorage.getItem("token");
    console.log(token);
    res = await axios.get(`${BASE_URL}/user/queries`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const queriesList = res.data;
    console.log(queriesList);

    queriesList.forEach((query) => {
      var name = query.name;
      var email = query.email;
      var message = query.message;
      var date = query.createdAt;
      insertNewRecord(name, email, message, date);
    });
  } catch (error) {
    console.log(error);
  }
}

// function getData(data) {
//   messages = data.val();
//   var keys = Object.keys(messages);
//   clearBlogs();
//   for (var i = 0; i < keys.length; i++) {
//     var key = keys[i];
//     var name = messages[key].name;
//     var email = messages[key].email;
//     var message = messages[key].message;
//     var date = messages[key].date;
//     insertNewRecord(name, message, date);
//   }
// }

const clearBlogs = () => {
  const messagesContainer = document.querySelector(".messages-container");
  let oldBody = messagesContainer.querySelector("div");
  oldBody.innerHTML = "";
};
// const auth = firebase.auth();
// const signout = document.getElementById("signout");
// signout.addEventListener("click", () => {
//   auth
//     .signOut()
//     .then(() => {
//       window.location = "./../SignIn-page/index.html";
//       console.log("User signed out successfully !");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });
