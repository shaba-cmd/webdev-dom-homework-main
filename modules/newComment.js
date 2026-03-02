import { updateComments } from "./comments.js";
import { commentRendering } from "./rendering.js";
import { nameEl, textEl } from "./comments.js";
import { replaceMethod } from "./methods.js";

export const newComment = () => {
  const addBtn = document.querySelector(".add-form-button");
  const formErrClass = "-form-error";

  nameEl.addEventListener("focus", () => {
    nameEl.classList.remove(formErrClass);
  });

  textEl.addEventListener("focus", () => {
    textEl.classList.remove(formErrClass);
  });

  addBtn.addEventListener("click", () => {
    if (nameEl.value === "" && textEl.value === "") {
      nameEl.classList.add(formErrClass);
      textEl.classList.add(formErrClass);
      alert("Текст в полях должен быть не менее 3 символов");
      return;
    } else if (nameEl.value === "" || nameEl.value.length < 3) {
      nameEl.classList.add(formErrClass);
      alert("Текст автора должен быть не менее 3 символов");
      return;
    } else if (textEl.value === "" || textEl.value.length < 3) {
      textEl.classList.add(formErrClass);
      alert("Текст комментария должен быть не менее 3 символов");
      return;
    }

    const newComm = {
      data: new Date(),
      likes: 0,
      isLiked: false,
      name: replaceMethod(nameEl),
      text: replaceMethod(textEl),
    };

    fetch("https://wedev-api.sky.pro/api/v1/igor-shabalin/comments", {
      method: "POST",
      body: JSON.stringify(newComm),
    })
      .then(() => {
        return fetch("https://wedev-api.sky.pro/api/v1/igor-shabalin/comments")
      })
      .then((response) => response.json())
      .then((data) => {
        updateComments(data.comments);
        commentRendering();

        nameEl.removeAttribute("readonly");
        nameEl.value = "";
        textEl.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
