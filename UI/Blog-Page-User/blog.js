const BASE_URL = "https://mybrand-innocentingabire.herokuapp.com/api";
var commentForm = document.querySelector(".comment-form");
const leaveComment = document.getElementById("leave-comment-btn");
const sendCommentBtn = document.querySelector("#send-comment");

leaveComment.addEventListener("click", () => {
  if (commentForm.style.display === "none") {
    commentForm.style.display = "inline-block";
  } else {
    commentForm.style.display = "none";
  }
});

const blogID = window.location.href.slice(window.location.href.search("#") + 1);

/**
 *
 */
const blogTitle = document.querySelector("#blogTitle");
const blogDate = document.querySelector("#blogDate");
const blogCommentsCount = document.querySelector("#blogCommentsCount");
const blogText = document.querySelector("#blogText");
const blogComments = document.querySelector("#blogComments");
const commentorName = document.querySelector(".commentor-name");
const commentMessage = document.querySelector(".comment-message");
const commentsWrapper = document.querySelector(".comments-wrapper");
const comment = document.querySelector(".comment");
const avatar = document.querySelector(".avatar");
const commentBox = document.querySelector(".comment-box");
const commentBoxTop = document.querySelector(".comment-box__top");
const commentDate = document.querySelector(".comment-date");
const commentParagraph = document.querySelector(".comment-paragraph");
// var blogDotsDiv = document.createElement("div");
sendCommentBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const content = document.getElementById("comment").value;
  const comment = {
    name: name,
    text: content,
  };
  axios.post(`${BASE_URL}/blogs/comment/${blogID}`, comment).then((res) => {
    console.log(res);
  });
});

const leaveCommentButton = document.querySelector("#leave-comment-btn");
// const commentForm = document.querySelector(".comment-form");

/**
 * Fetches the blog from the API
 * and populates it in the HTML page
 */

const fetchBlog = () => {
  axios
    .get(`${BASE_URL}/blogs/${blogID}`)
    .then((resp) => resp.data.data)
    .then((blog) => {
      console.log("Fetched blog", blog);
      blogTitle.innerHTML = blog.title;
      blogText.innerHTML = blog.content;
      blogDate.innerHTML = new Date(blog.createdAt).toDateString();
      blogCommentsCount.innerHTML = `${blog.comments.length} comments`;
      var commentsList = blog.comments;
      console.log(commentsList);
      commentsList.forEach((comment) => {
        var name = comment.name;
        var text = comment.text;
        var date = new Date(comment.date).toDateString();

        insertComment(name, text, date);
      });
    });
};
fetchBlog();

function insertComment(name, text, date) {
  var commentsWrapperDiv = document.querySelector(".comments-wrapper");
  var commentDiv = document.createElement("div");
  var avatarDiv = document.createElement("div");
  var commentBoxDiv = document.createElement("div");
  var commentBoxTopDiv = document.createElement("div");
  var commentorNameDiv = document.createElement("div");
  var commentDateDiv = document.createElement("div");
  var commentParagraphDiv = document.createElement("div");

  commentsWrapperDiv.className = "comments-wrapper";
  commentDiv.className = "comment";
  avatarDiv.className = "avatar";
  commentBoxDiv.className = "comment-box";
  commentBoxTopDiv.className = "comment-box__top";
  commentorNameDiv.className = "commentor-name";
  commentDateDiv.className = "comment-date";
  commentParagraphDiv.className = "comment-paragraph";

  var iAvatar = document.createElement("i");
  iAvatar.className = "far fa-user-circle";
  avatarDiv.appendChild(iAvatar);

  var pCommentorName = document.createElement("p");
  pCommentorName.innerHTML = name;
  commentorNameDiv.appendChild(pCommentorName);

  var pCommentDate = document.createElement("p");
  pCommentDate.innerHTML = date;
  commentDateDiv.appendChild(pCommentDate);

  var pCommentParagraph = document.createElement("p");
  pCommentParagraph.innerHTML = text;
  commentParagraphDiv.appendChild(pCommentParagraph);

  var ahref = document.createElement("a");
  ahref.href = "#";
  ahref.innerHTML = "Reply";

  commentDiv.appendChild(avatarDiv);
  commentDiv.appendChild(commentBoxDiv);
  commentBoxDiv.appendChild(commentBoxTopDiv);
  commentBoxDiv.appendChild(commentParagraphDiv);
  commentBoxDiv.appendChild(ahref);
  commentBoxTopDiv.appendChild(commentorNameDiv);
  commentBoxTopDiv.appendChild(commentDateDiv);
  var newComment = commentDiv;

  commentsWrapperDiv.appendChild(newComment);
}
