export class CommentController {
  constructor(selector, pubSub) {
    this.element = document.querySelector(selector);
    pubSub.subscribe("comment:created", (event, comment) => {
      
      this.toggleForm();
    });
  }

  toggleForm() {
    this.element.classList.toggle("show-form");
  }
}
