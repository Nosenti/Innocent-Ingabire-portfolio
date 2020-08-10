var commentForm = document.querySelector(".comment-form");
const leaveComment = document.getElementById("leave-comment-btn");

leaveComment.addEventListener("click", () => {
  if (commentForm.style.display === "none") {
    commentForm.style.display = "inline-block";
  } else {
    commentForm.style.display = "none";
  }
});
