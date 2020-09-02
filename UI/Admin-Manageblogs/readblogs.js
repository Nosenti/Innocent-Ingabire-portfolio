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

// Data validation in blog forms and firebase connection
let postId;

getData();
var deleteB;
function insertNewRecord(key, title, date) {
  postId = key;
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
  cell4.innerHTML = date;
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

function onDelete() {
  let token = localStorage.getItem("token");
  axios
    .delete(`${BASE_URL}/user/blogs/${postId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      clearTable();
      getData();
    });
}
function onEdit() {}

/**
 * if I get data from Firebase
 * I delete all other entries from the table
 * @param {*} data
 */
async function getData(data) {
  try {
    res = await axios.get(`${BASE_URL}/blogs`);
    const blogsList = res.data.data;
    console.log(blogsList);
    clearTable();
    blogsList.forEach((blog) => {
      var title = blog.title;
      // var content = blog.content;
      var key = blog._id;
      var date = blog.createdAt;
      insertNewRecord(key, title, date);
    });
  } catch (error) {
    console.log(error);
  }

  // blogs = data.val();
  // var keys = Object.keys(blogs);
  // clearTable();
  // for (var i = 0; i < keys.length; i++) {
  //   var key = keys[i];
  //   // Look at each fruit object!
  //   var title = blogs[key].title;
  //   var message = blogs[key].message;
  //   var date = blogs[key].date;
  //   insertNewRecord(title, key, date);
  // }
}

/**
 * Clear the table
 */
const clearTable = () => {
  table = document.getElementById("blogsList");
  let oldBody = table.querySelector("tbody");
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
