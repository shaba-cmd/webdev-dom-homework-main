import { updateComments } from "./comments.js";
import { commentRendering } from "./rendering.js";

export const fetchFunc = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/igor-shabalin/comments")
    .then((response) => response.json())
    .then((data) => {
      updateComments(data.comments);
      commentRendering()
    })
    .catch((err) => {
      console.log(err);
    });
};
