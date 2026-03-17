import { comments } from "./comments.js";
import { commentsButtons, likeButtons } from "./initListeners.js";
import { nowDateTime } from "./methods.js";

export const commentRendering = () => {
  const listEl = document.querySelector(".comments");

  const render = comments
    .map((comment) => {
      return `<li class="comment" data-id="${comment.id}">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${nowDateTime(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter" data-index="${comment.id}">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""} ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  listEl.innerHTML = render;

  likeButtons();
  commentsButtons();
};
