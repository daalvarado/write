export class CommentsListController {
  constructor(selector, commentsService, pubSub) {
    this.element = document.querySelector(selector);
    
    
    this.commentsService = commentsService;
    pubSub.subscribe("comment:created", (event, comment) => {
      console.log("CommentsListController", comment);
      this.loadComments();
    });
  }

  showLoadingMessage() {
    this.element.innerHTML = '<div class="loading">Cargando...</div>';}
    
  

  showErrorMessage(error) {
    this.element.innerHTML =
      '<div class="error">There has been an error: <b>'+error+'</b></div>';
  }

  showNoCommentsMessage() {
    this.element.innerHTML = '<div class="info">There are no comments yet. Please leave the first comment.</div>';
  }

  renderComments(comments) {
    
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
    try{this.showLoadingMessage();}
    catch(e){console.log("No comments on this page. Error:"+e)};
    this.commentsService
      .list()
      .then(comments => {
        
        if (comments.length == 0) {
          this.showNoCommentsMessage();
        } else {
          try{  this.renderComments(comments);
        } catch(e){console.log("No comments to render on this page. Error: "+e)}
      }})
      .catch(error => {
        console.error("ERROR RETRIEVING COMMENTS", error);
        this.showErrorMessage(error);
      });
  }
}
