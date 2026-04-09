import { registration } from "./api.js";
import { fetchRenderComment } from "./fetchRenderComment.js";
import { renderLogin } from "./renderLogin.js";
import { updateName, updateToken } from "./saveData.js";

export const renderRegistration = () => {
  const container = document.querySelector(".container");

  const registerHtml = `
        <div class="auth-form">
            <h2>Регистрация</h2>

            <div class="inputs">
              <input type="text" id="name-input" class="input-form" placeholder="Введите имя" />
              <input type="text" id="log-input" class="input-form" placeholder="Введите логин" />
              <input type="password" id="pass-input" class="input-form" placeholder="Введите пароль" />
            </div>

            <div class="auth-form-row">
              <p id="log-btn" class="active">Войти</p>
              <button id="reg-btn" class="auth-form-button">Зарегистрироваться</button>
            </div>
        </div>
  `;

  container.innerHTML = registerHtml;

  const button = document.getElementById("reg-btn");
  const logInput = document.getElementById("log-input");
  const nameInput = document.getElementById("name-input");
  const passInput = document.getElementById("pass-input");

  button.addEventListener("click", () => {
    registration({
      login: logInput.value,
      name: nameInput.value,
      password: passInput.value,
    })
      .then((data) => {
        updateToken(data.user.token);
        updateName(data.user.name);
        fetchRenderComment();
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  const logBtn = document.getElementById("log-btn");

  logBtn.addEventListener("click", () => {
    renderLogin();
  });
};
