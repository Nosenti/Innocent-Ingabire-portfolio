const BASE_URL = "https://mybrand-innocentingabire.herokuapp.com/api";

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

getData();

var blogsContainer = document.querySelector(".blogs-wrapper");
function insertNewRecord(key, title, content, comments) {
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
  // blogPicDiv.innerHTML = avatar;
  text.innerHTML = content.slice(0, 500);

  a.innerHTML = "Read more >>";
  a.style.color = "green";

  blogDiv.appendChild(t);
  blogDiv.appendChild(blogDatesDiv);
  blogDiv.appendChild(blogPicDiv);
  blogDiv.appendChild(blogTextDiv);
  blogDiv.appendChild(blogMoreDiv);

  blogMoreDiv.appendChild(blogReadMoreDiv);

  // var dots = document.createElement("p");
  // blogDotsDiv.appendChild(dots);
  var newBlog = blogDiv;
  a.href = `blog.html#${key}`;

  blogsContainer.appendChild(newBlog);
}

async function getData(res) {
  try {
    res = await axios.get(`${BASE_URL}/blogs`);
    const blogsList = res.data.data;
    console.log(blogsList);

    blogsList.forEach((blog) => {
      var title = blog.title;
      var content = blog.content;
      var comments = blog.comments;
      var key = blog._id;
      insertNewRecord(key, title, content, comments);
    });
    // for (let i = 0; i <= blogsList.length; i++) {

    //   console.log(title);

    //   insertNewRecord(title, content, comments);
    // }
  } catch (error) {
    console.log(error);
  }
}

// const clearBlogs = () => {
//   blogsContainer = document.querySelector(".messages-container");
//   let oldBody = blogsContainer.querySelector("div");
//   oldBody.innerHTML = "";
// };
