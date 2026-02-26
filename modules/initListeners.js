import { comments } from "./comments.js";
import { commentRendering } from "./rendering.js";
import { nameEl, textEl } from "./comments.js";

export const commentsButtons = () => {
  const commentButtons = document.querySelectorAll("li");

  commentButtons.forEach((el) => {
    el.addEventListener("click", () => {
      const comment = el.dataset.comm;

      nameEl.value = `&gt; ${comments[comment].name}`;
      nameEl.setAttribute('readonly', '');
      textEl.value = comments[comment].text;

      commentsButtons();
      likeButtons();
    });
  });
};

export const likeButtons = () => {
  const likeBtns = document.querySelectorAll(".like-button");

  likeBtns.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.stopPropagation();

      const commentEl = this.parentElement.querySelector(".likes-counter");
      const index = commentEl.dataset.index;
      const comment = comments[index];

      if (comment.like) {
        comment.like = false;
        --comment.counter;
      } else {
        comment.like = true;
        ++comment.counter;
      }

      commentRendering();
      likeButtons();
      commentsButtons();
    });
  });
};
