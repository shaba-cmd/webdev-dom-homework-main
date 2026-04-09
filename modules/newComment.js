import { replaceMethod } from "./methods.js";
import { fetchRenderComment } from "./fetchRenderComment.js";
import { postComments } from "./api.js";

export const newComment = () => {
  const nameEl = document.querySelector(".add-form-name");
  const textEl = document.querySelector(".add-form-text");
  const addBtn = document.querySelector(".add-form-button");
  const formErrClass = "-form-error";

  nameEl.addEventListener("focus", () => {
    nameEl.classList.remove(formErrClass);
  });

  textEl.addEventListener("focus", () => {
    textEl.classList.remove(formErrClass);
  });

  const handlePostClick = () => {
    const textValue = replaceMethod(textEl);

    const formContainer = document.querySelector(".add-form");
    const loadMessage = document.querySelector(".loadMess");
    formContainer.style.display = "none";
    loadMessage.style.display = "block";

    postComments(textValue)
      .then((response) => {
        if (
          response.status === 400 &&
          nameEl.value === "" &&
          textEl.value === ""
        ) {
          nameEl.classList.add(formErrClass);
          textEl.classList.add(formErrClass);
          throw new Error("Текст в полях");
        } else {
          if (response.status === 400 && nameEl.value.length < 3) {
            nameEl.classList.add(formErrClass);
            throw new Error("Текст автора");
          }
          if (response.status === 400 && textEl.value.length < 3) {
            textEl.classList.add(formErrClass);
            throw new Error("Текст комментария");
          }
          if (response.status === 500) {
            throw new Error("Ошибка сервера");
          }
        }
      })
      .then(() => fetchRenderComment())
      .then(() => {
        nameEl.value = "";
        textEl.value = "";
      })
      .catch((error) => {
        if (
          error.message === "Текст в полях" ||
          error.message === "Текст автора" ||
          error.message === "Текст комментария"
        ) {
          alert(error.message + " должен быть не менее 3 символов");
        } else if (error.message === "Ошибка сервера") {
          handlePostClick();
        } else {
          alert("Проверте интернет соединение и попробуйте еще раз");
        }
      })
      .finally(() => {
        loadMessage.style.display = "none";
        formContainer.style.display = "flex";
      });
  };

  addBtn.addEventListener("click", handlePostClick);
};
