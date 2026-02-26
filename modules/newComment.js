import { comments } from "./comments.js";
import { commentRendering } from "./rendering.js";
import { commentsButtons, likeButtons } from "./initListeners.js";
import { nameEl, textEl } from "./comments.js";
import { replaceMethod } from "./methods.js";

export const newComment = () => {
  const addBtn = document.querySelector(".add-form-button");

  const nowDate = new Date()
    .toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/,/, "");

  nameEl.addEventListener("focus", () => {
    nameEl.classList.remove("-form-error");
  });

  textEl.addEventListener("focus", () => {
    textEl.classList.remove("-form-error");
  });

  addBtn.addEventListener("click", () => { 
    if (nameEl.value === "" && textEl.value === "") {
      nameEl.classList.add("-form-error");
      textEl.classList.add("-form-error");
      return;
    } else if (nameEl.value === "") {
      nameEl.classList.add("-form-error");
      return;
    } else if (textEl.value === "") {
      textEl.classList.add("-form-error");
      return;
    }
    
    nameEl.removeAttribute('readonly');

    comments.push({
      name: replaceMethod(nameEl),
      data: nowDate,
      text: replaceMethod(textEl),
      counter: 0,
      like: false,
    });

    nameEl.value = "";
    textEl.value = "";

    commentRendering();
    commentsButtons();
    likeButtons();
  });
};
