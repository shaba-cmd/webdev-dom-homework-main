import { login, updateName, updateToken } from "./api.js";
import { fetchFunc } from "./fetchFunc.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
  const container = document.querySelector(".container");

  const loginHtml = `
        <div class="auth-form">
            <h2>Авторизация</h2>

            <div class="inputs">
              <input type="text" id='log-input' class="input-form" placeholder="Введите логин" />
              <input type="password" id='pass-input' class="input-form" placeholder="Введите пароль" />
            </div>

            <div class="auth-form-row">
              <p id="reg-btn" class="active">Зарегистрироваться</p>
              <button id="log-btn" class="auth-form-button">Войти</button>
            </div>
        </div>
  `;

  container.innerHTML = loginHtml;

  const button = document.getElementById("log-btn");
  const logInput = document.getElementById("log-input");
  const passInput = document.getElementById("pass-input");

  button.addEventListener("click", () => {
    login(logInput.value, passInput.value)
      .then((data) => {
        updateToken(data.user.token); 
        updateName(data.user.name);
        fetchFunc();
      })
      .catch((error) => {
        alert(error.message);
      });
  });

  const regBtn = document.getElementById("reg-btn");

  regBtn.addEventListener("click", () => {
    renderRegistration();
  });
};
