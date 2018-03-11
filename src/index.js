import css from "./scss/style.scss";
import { CommentsListController } from "./js/CommentsListController";
import { navButton } from "./js/navButton";
import { commentsButton } from "./js/commentsButton";
import {articleLoader} from "./js/articleLoader";
import { returnButton } from "./js/returnButton";

import moment from "moment";
import {TimeService} from "./js/TimeService";

import { CommentController } from "./js/CommentController";
import { FormController } from "./js/FormController";
import { CommentsService } from "./js/CommentsService";
import { PubSub } from "pubsub-js";
import { NumComments } from "./js/NumComments";



document.addEventListener("DOMContentLoaded", () => {
  let commentController = new CommentController("body", PubSub);
    let commentsService = new CommentsService("http://localhost:3001/comments/");

  let commentsListController = new CommentsListController(".commentsList",commentsService,
PubSub
  );
  commentsListController.loadComments();
let numComments = new NumComments;
  numComments.numComments();
  let timeService=new TimeService;
  timeService.timeStamp();
  let formController = new FormController(".commentsForm", commentsService, PubSub);
});