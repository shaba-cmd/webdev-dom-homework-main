import { comments } from "./comments.js";

export const commentRendering = () => {
  const listEl = document.querySelector(".comments");

  const render = comments
    .map((comment, index) => {
      return `<li class="comment" data-comm="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.data}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter" data-index="${index}">${comment.counter}</span>
              <button class="like-button ${comment.like ? "-active-like" : ""}"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  listEl.innerHTML = render;
};
