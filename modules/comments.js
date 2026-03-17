import { fetchFunc } from "./fetchFunc.js";

export const nameEl = document.querySelector(".add-form-name");
export const textEl = document.querySelector(".add-form-text");

export let comments = [];
export const updateComments = (newComments) => {
  comments = newComments;
};

fetchFunc()
