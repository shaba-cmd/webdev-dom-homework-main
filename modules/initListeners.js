import { comments } from "./comments.js";
import { commentRendering } from "./rendering.js";
import { nameEl, textEl } from "./comments.js";

export const commentsButtons = () => {
  const commentButtons = document.querySelectorAll("li");

  commentButtons.forEach((el) => {
    el.addEventListener("click", () => {
      let comment = el.dataset.id;

      comments.forEach((el) => {
        if (+comment === el.id) {
          return (comment = el);
        }
      });

      nameEl.value = `&gt; ${comment.author.name}`;
      nameEl.setAttribute("readonly", "");
      textEl.value = comment.text;
    });
  });
};

export const likeButtons = () => {
  const likeBtns = document.querySelectorAll(".like-button");

  likeBtns.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.stopPropagation();

      const commentEl = this.parentElement.querySelector(".likes-counter");
      let id = commentEl.dataset.index;

      comments.forEach((el) => {
        if (+id === el.id) {
          return (id = el);
        }
      });

      id.isLikeLoading = true;

      function delay(interval = 300) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, interval);
        });
      }
      
      delay(2000).then(() => {
        id.likes = id.isLiked ? id.likes - 1 : id.likes + 1;
        id.isLiked = !id.isLiked;
        id.isLikeLoading = false;
        commentRendering();
      });

      commentRendering();
    });
  });
};
