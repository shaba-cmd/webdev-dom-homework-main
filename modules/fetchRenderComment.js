import { getComments } from "./api.js";
import { updateComments } from "./comments.js";
import { commentRendering } from "./rendering.js";

export const fetchRenderComment = (loader) => {
  if (loader) {
    document.querySelector(".container").innerHTML = ` 
      Комментарии загружаются...
    `;
  }

  getComments()
    .then((data) => {
      updateComments(data.comments);
      commentRendering();
    })
    .catch((error) => {
      console.log(error);
    });
};
