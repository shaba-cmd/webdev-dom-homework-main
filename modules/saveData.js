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

export const logout = () => {
  token = "";
  name = "";
  localStorage.removeItem("token");
  localStorage.removeItem("name");
};