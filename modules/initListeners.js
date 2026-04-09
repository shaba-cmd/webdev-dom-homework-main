import { likeComment } from "./api.js";
import { comments } from "./comments.js";
import { commentRendering } from "./rendering.js";
import { token } from "./saveData.js";

export const commentsButtons = () => {
  const commentElements = document.querySelectorAll(".comment");

  commentElements.forEach((el) => {
    el.addEventListener("click", () => {
      const textEl = document.querySelector(".add-form-text");

      const commentId = el.dataset.id;
      const comment = comments.find((c) => c.id === commentId);

      textEl.value = `> ${comment.author.name}: ${comment.text}`;
    });
  });
};

export const likeButtons = () => {
  const likeBtns = document.querySelectorAll(".like-button");

  likeBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();

      const commentEl = this.closest(".comment");
      const commentId = commentEl.dataset.id;

      const comment = comments.find((c) => c.id === commentId);

      comment.isLikeLoading = true;
      commentRendering();

      likeComment(commentId, token)
        .then((data) => {
          comment.likes = data.result.likes;
          comment.isLiked = data.result.isLiked;
          comment.isLikeLoading = false;
        })
        .catch((error) => {
          console.error(error);
          alert("Не удалось поставить лайк");
          comment.isLikeLoading = false;
        })
        .finally(() => {
          commentRendering();
        });
    });
  });
};
