import { commentRendering } from "./modules/rendering.js";
import { commentsButtons, likeButtons } from "./modules/initListeners.js";
import { newComment } from "./modules/newComment.js";

commentRendering();
commentsButtons();
likeButtons();
newComment();