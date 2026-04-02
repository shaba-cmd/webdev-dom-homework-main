const host = "https://wedev-api.sky.pro/api/v2/igor-shabalin";

const authToken = "https://wedev-api.sky.pro/api/user";

export let token = localStorage.getItem("token") || "";
export const updateToken = (newToken) => {
  token = newToken;
  localStorage.setItem("token", newToken);
};

export let name = localStorage.getItem("name") || "";
export const updateName = (newName) => {
  name = newName;
  localStorage.setItem("name", newName);
};

export function getComments() {
  return fetch(host + "/comments", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
  });
}

export function postComments(text) {
  return fetch(host + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
    }),
  });
}

export function registration({ login, name, password }) {
  return fetch(authToken, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Пользователь с таким логином уже существует");
    }
    return response.json();
  });
}

export function login(login, password) {
  return fetch(authToken + "/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

export const logout = () => {
  token = "";
  name = "";
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};

export function likeComment(commentId, token) {
  return fetch(`${host}/comments/${commentId}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
    throw new Error("Ошибка при установке лайка");
  });
}
