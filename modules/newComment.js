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
      isLikeLoading: false,
      name: replaceMethod(nameEl),
      text: replaceMethod(textEl),
    };

    const formContainer = document.querySelector(".add-form");
    formContainer.style.display = "none";
    const loadMessage = document.querySelector(".loadMess")
    loadMessage.style.display = "block";

    fetch("https://wedev-api.sky.pro/api/v1/igor-shabalin/comments", {
      method: "POST",
      body: JSON.stringify(newComm),
    })
      .then(() => fetchFunc())
      .then(() => {
        nameEl.removeAttribute("readonly");
        nameEl.value = "";
        textEl.value = "";

        loadMessage.style.display = "none";
        formContainer.style.display = "block";
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
