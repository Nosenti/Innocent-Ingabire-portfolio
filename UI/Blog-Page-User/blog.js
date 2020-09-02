const BASE_URL = "https://mybrand-innocentingabire.herokuapp.com/api";
var commentForm = document.querySelector(".comment-form");
const leaveComment = document.getElementById("leave-comment-btn");

leaveComment.addEventListener("click", () => {
  if (commentForm.style.display === "none") {
    commentForm.style.display = "inline-block";
  } else {
    commentForm.style.display = "none";
  }
});

// getData();

// var blogsContainer = document.querySelector(".blogs-wrapper");
// function insertNewRecord(key, title, content, comments) {
//   var blogDiv = document.createElement("div");
//   var blogTitleDiv = document.createElement("div");
//   var blogDetailsDiv = document.createElement("div");
//   var blogDatesDiv = document.createElement("div");
//   var blogCommentsDiv = document.createElement("div");
//   var blogPicDiv = document.createElement("div");
//   var blogTextDiv = document.createElement("div");
//   var blogMoreDiv = document.createElement("div");
//   var blogReadMoreDiv = document.createElement("div");
//   // var blogDotsDiv = document.createElement("div");

//   blogDiv.className = "blog";
//   blogTitleDiv.className = "blog-title";
//   blogDetailsDiv.className = "blog-details";
//   blogDatesDiv.className = "dates";
//   blogCommentsDiv.className = "comments";
//   blogPicDiv.className = "blog-pic";
//   blogTextDiv.className = "blog-text";
//   blogMoreDiv.className = "blog-more";
//   blogReadMoreDiv.className = "read-more";
//   // blogDotsDiv.className = "dots-options";

//   var t = document.createElement("h1");
//   blogTitleDiv.appendChild(t);

//   var date = document.createElement("p");
//   blogDatesDiv.appendChild(date);

//   var d = document.createElement("p");
//   blogDetailsDiv.appendChild(d);

//   var c = document.createElement("p");
//   blogCommentsDiv.appendChild(c);

//   var a = document.createElement("a");
//   blogReadMoreDiv.appendChild(a);

//   var image = document.createElement("img");
//   blogPicDiv.appendChild(image);

//   var text = document.createElement("p");
//   blogTextDiv.appendChild(text);

//   var read = document.createElement("p");
//   a.appendChild(read);

//   t.innerHTML = title;
//   // blogPicDiv.innerHTML = avatar;
//   text.innerHTML = content.slice(0, 500);

//   a.innerHTML = "Read more >>";
//   a.style.color = "green";

//   blogDiv.appendChild(t);
//   blogDiv.appendChild(blogDatesDiv);
//   blogDiv.appendChild(blogPicDiv);
//   blogDiv.appendChild(blogTextDiv);
//   blogDiv.appendChild(blogMoreDiv);

//   blogMoreDiv.appendChild(blogReadMoreDiv);

//   // var dots = document.createElement("p");
//   // blogDotsDiv.appendChild(dots);
//   var newBlog = blogDiv;
//   a.href = `blog.html#${key}`;

//   blogsContainer.appendChild(newBlog);
// }

// async function getData(res) {
//   try {
//     res = await axios.get(`${BASE_URL}/blogs`);
//     const blogsList = res.data.data;
//     console.log(blogsList);

//     blogsList.forEach((blog) => {
//       var title = blog.title;
//       var content = blog.content;
//       var comments = blog.comments;
//       var key = blog._id;
//       insertNewRecord(key, title, content, comments);
//     });
//     // for (let i = 0; i <= blogsList.length; i++) {

//     //   console.log(title);

//     //   insertNewRecord(title, content, comments);
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// }
