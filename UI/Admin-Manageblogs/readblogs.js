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

// Data validation in blog forms and firebase connection

var blogsRef = firebase.database().ref("blogs");

blogsRef.on("value", getData);
var deleteB;
function insertNewRecord(title, key) {
  deleteB = document.createElement("a");
  var editB = document.createElement("a");
  var i = document.createElement("i");
  var j = document.createElement("j");

  j.className = "fas fa-edit";
  i.className = "far fa-trash-alt";

  editB.appendChild(j);
  deleteB.appendChild(i);
  editB.href = `edit.html#${key}`;
  var table = document
    .getElementById("blogsList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = key;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = title;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = "Hello";
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = "Hello";
  cell5 = newRow.insertCell(4);
  // cell5.innerHTML = `<a href="#"onClick="onEdit(this)"><i class="fas fa-edit"></i></a>
  //                      <a onClick="onDelete(this)" ><i class="far fa-trash-alt"></i></a>`;
  cell5.appendChild(editB);
  cell5.appendChild(deleteB);
  deleteB.addEventListener("click", function (e) {
    e.stopPropagation();
    onDelete(key);
  });
}
function onDelete(key) {
  blogsRef.child(key).remove();
}
function onEdit() {}

/**
 * if I get data from Firebase
 * I delete all other entries from the table
 * @param {*} data
 */
function getData(data) {
  blogs = data.val();
  var keys = Object.keys(blogs);
  clearTable();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    // Look at each fruit object!
    var title = blogs[key].title;
    var message = blogs[key].message;
    insertNewRecord(title, key);
  }
}

/**
 * Clear the table
 */
const clearTable = () => {
  table = document.getElementById("blogsList");
  let oldBody = table.querySelector("tbody");
  oldBody.innerHTML = "";
};
