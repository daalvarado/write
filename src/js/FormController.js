export class FormController {
  constructor(selector, commentsService, pubSub) {
    this.element = document.querySelector(selector);
    this.commentsService = commentsService;
    this.pubSub = pubSub;
    this.loading = false;
    this.addEventListeners();
  }

  setLoading(loading) {
    this.loading = loading;
    this.element.querySelectorAll("input, button").forEach(item => {
      item.disabled = loading;
    });
  }

  addEventListeners() {
    this.addInputListeners();
    this.addFormSubmitListener();
  }

  addFormSubmitListener() {
    this.element.addEventListener("submit", event => {
      event.preventDefault();
      if (this.loading) {
        return; // si se está cargando, no hacemos nada más
      }
      this.setLoading(true);
      let comment = this.buildCommentData();
      this.commentsService
        .save(comment)
        .then(createdComment => {
          console.log("COMMENT CRETED", createdComment);
          this.element.reset();
          this.pubSub.publish("comment:created", createdComment);
        })
        .catch(error => {
          console.error("THERE HAS BEEN AN ERROR");
          alert(`There has been an error ${error}`);
        })
        .finally(() => {
          this.setLoading(false);
        });
    });
  }

  buildCommentData() {
    return {
      userName: this.element.querySelector("#userName").value,
      userLastName: this.element.querySelector("#userLastname").value,
      userEmail: this.element.querySelector("#userEmail").value,
      userComment: this.element.querySelector("#userComment").value
    };
  }

  addInputListeners() {
    // en todos los input que hay en el formulario, los valido cuando se pierde el foco
    this.element.querySelectorAll("input").forEach(input => {
      input.addEventListener("blur", event => {
        // event.target sería lo mismo que input en este caso
        if (input.checkValidity() == false) {
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
        this.checkFormValidity();
      });
    });
  }

  checkFormValidity() {
    let button = this.element.querySelector("button");
    if (this.element.checkValidity()) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }
}