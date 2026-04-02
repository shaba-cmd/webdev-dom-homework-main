import { fetchFunc } from "./fetchFunc.js";

export let comments = [];
export const updateComments = (newComments) => {
  comments = newComments;
};

fetchFunc();
