export class CommentsListController {
  constructor(selector, commentsService, pubSub) {
    this.element = document.querySelector(selector);
    console.log(this.element);
    console.log(selector);
    
    this.commentsService = commentsService;
    pubSub.subscribe("comment:created", (event, comment) => {
      console.log("CommentsListController", comment);
      this.loadComments();
    });
  }

  showLoadingMessage() {
    this.element.innerHTML = '<div class="loading">Cargando...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">There has been an error</div>';
  }

  showNoCommentsMessage() {
    this.element.innerHTML = '<div class="info">There are no comments</div>';
  }

  renderComments(comments) {
    console.log(comments);
    let html = "";
    for (let comment of comments) {
      html += `<div class="commentItem">
          <div class="commentItemName">${comment.userName} ${comment.userLastname}</div>
          <div class="commentItemEmail">${comment.userEmail}</div>
          <div class="commentItemText">${comment.userComment}</div>
        </div>`;
        
    }
    this.element.innerHTML = html;
  }

  loadComments() {
    this.showLoadingMessage();
    this.commentsService
      .list()
      .then(comments => {
        if (comments.length == 0) {
          this.showNoCommentsMessage();
        } else {
          this.renderComments(comments);
        }
      })
      .catch(error => {
        console.error("ERROR RETRIEVING COMMENTS", error);
        this.showErrorMessage();
      });
  }
}
