import { nameEl, textEl } from "./comments.js";
import { replaceMethod } from "./methods.js";
import { fetchFunc } from "./fetchFunc.js";

export const newComment = () => {
  const addBtn = document.querySelector(".add-form-button");
  const formErrClass = "-form-error";

  nameEl.addEventListener("focus", () => {
    nameEl.classList.remove(formErrClass);
  });

  textEl.addEventListener("focus", () => {
    textEl.classList.remove(formErrClass);
  });

  const handlePostClick = () => {
    const newComm = {
      data: new Date(),
      likes: 0,
      isLiked: false,
      isLikeLoading: false,
      name: replaceMethod(nameEl),
      text: replaceMethod(textEl),
      forceError: true,
    };

    const formContainer = document.querySelector(".add-form");
    formContainer.style.display = "none";
    const loadMessage = document.querySelector(".loadMess");
    loadMessage.style.display = "block";

    fetch("https://wedev-api.sky.pro/api/v1/igor-shabalin/comments", {
      method: "POST",
      body: JSON.stringify(newComm),
    })
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
      .then(() => fetchFunc())
      .then(() => {
        nameEl.removeAttribute("readonly");
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
