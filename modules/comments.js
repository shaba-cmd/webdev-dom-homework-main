import { commentRendering } from "./rendering.js";

export const nameEl = document.querySelector(".add-form-name");
export const textEl = document.querySelector(".add-form-text");

export let comments = [];
export const updateComments = (newComments) => {
  comments = newComments;
};

fetch("https://wedev-api.sky.pro/api/v1/igor-shabalin/comments")
  .then((response) => response.json())
  .then((data) => {
    updateComments(data.comments);
    commentRendering();
  })
  .catch((err) => {
    console.log(err);
  });
