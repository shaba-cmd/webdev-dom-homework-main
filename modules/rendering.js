import { comments } from "./comments.js";
import { logout, name, token } from "./api.js";
import { commentsButtons, likeButtons } from "./initListeners.js";
import { newComment } from "./newComment.js";
import { nowDateTime } from "./methods.js";
import { renderLogin } from "./renderLogin.js";

export const commentRendering = () => {
  const container = document.querySelector(".container");

  const commHtml = comments
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

  const addForm = `
      <p class="loadMess">Добавление комментария...</p>

      <div class="add-form">
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <p id="logout-btn" class="active">Выйти</p>
          <button class="add-form-button">Написать</button>
        </div>
      </div>
  `;

  const linkLogin = `<p><span class='link-login'>Ввойдите</span>, что бы отправить комментарий</p>`;

  const renderHtml = `
    <ul class="comments">${commHtml}</ul>
    ${token ? addForm : linkLogin}
  `;

  container.innerHTML = renderHtml;

  if (token) {
    likeButtons();
    commentsButtons();
    newComment();

    document.getElementById("logout-btn")?.addEventListener("click", () => {
      logout();
      commentRendering();
    });
  } else {
    document.querySelector(".link-login").addEventListener("click", () => {
      renderLogin();
    });
  }
};
