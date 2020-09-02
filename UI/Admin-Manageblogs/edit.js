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
/**
 * Initiate fetching
 */
let postId;

postId = window.location.href.slice(window.location.href.search("#") + 1);

const updateBtn = document.getElementById("edit-btn");
const form = document.getElementById("form");
const title = document.getElementById("title");
const avatar = document.getElementById("avatar");
const message = document.getElementById("message-body");

/**
 * Listens to blog save edits and saves them
 */
updateBtn.addEventListener("click", (e) => {
  let token = localStorage.getItem("token");

  e.preventDefault();

  axios
    .patch(
      `${BASE_URL}/user/blogs/${postId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },

      {
        title: title.value,
        message: message.value,
      }
    )
    .then((res) => {
      console.log(res);
      console.log(token);
    })
    .catch((err) => console.error(err));
  // const newData = {
  //   title: title.value,
  //   message: message.value,
  //   avatar: avatar.value,
  // };
  // console.log(newData);
  // // blogsRef.child(postId).update(newData);
  // blogsList.child(postId).update(newData);
});
/**
 * Takes fetched data and populates them to inputs
 * @param {*} title
 * @param {*} avatar
 * @param {*} message
 */
function populateInputs(_title, _message) {
  title.value = _title;
  // avatar.value = _avatar;
  message.value = _message;
}
console.log(postId);
async function getData() {
  try {
    res = await axios.get(`${BASE_URL}/blogs/${postId}`);

    const blog = res.data.data;
    console.log(blog);
    // let data = blogsList.child(postId);
    // console.log(data);
    // Look at each fruit object!
    var titleValue = blog.title;
    // var avatarValue = blog.avatar;
    var messageValue = blog.content;
    populateInputs(titleValue, messageValue);
    console.log(titleValue, messageValue);
  } catch (error) {
    console.log(error);
  }
}
getData();

// /**
//  * Fetch data for a specific post
//  * And populte them to their respective inputs
//  * @param {*} data
//  */
// function getData(data) {
//   data = data.val();
//   data = data[postId];
//   console.log("Got ", data);

//   // Look at each fruit object!
//   var titleValue = data.title;
//   var avatarValue = data.avatar;
//   var messageValue = data.message;
//   populateInputs(titleValue, avatarValue, messageValue);
//   console.log(titleValue, messageValue);
// }

/**
 * Window on load
 * We retrieve the id of the post that we should fetch
 *
 */
