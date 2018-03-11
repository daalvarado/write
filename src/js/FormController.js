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
    this.element.querySelectorAll("input, button, textarea").forEach(item => {
      item.disabled = loading;
    });
  }

  addEventListeners() {
    this.addInputListeners();
  try{  this.addFormSubmitListener();}
  catch(e){console.log("No comments form on this page. Error: "+e)}
  }

  addFormSubmitListener() {
    this.element.addEventListener("submit", event => {
      event.preventDefault();
      if (this.loading) {
        return; 
      }
      this.setLoading(true);
      let comment = this.buildCommentData();
      this.commentsService
        .save(comment)
        .then(createdComment => {
          console.log("COMMENT CREATED", createdComment);
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
      userLastname: this.element.querySelector("#userLastname").value,
      userEmail: this.element.querySelector("#userEmail").value,
      userComment: this.element.querySelector("#userComment").value
    };
  }

  addInputListeners() {
    try{
      this.element.querySelectorAll("input, textarea").forEach((input) => {
      
        if (input.tagName == "INPUT"){
        input.addEventListener("blur", event => {
        if (input.checkValidity() == false) {
          input.classList.add("error");
        } else {
          input.classList.remove("error"); 
        }
        this.checkTextAreaValidity();
        this.checkFormValidity();
      })}
        
        
        
      })}
      catch(e) {console.log("No forms on this page. Error: "+e)}}

    
    

checkTextAreaValidity() {
  try{
    const textA = this.element.querySelector("textarea");
    textA.addEventListener("blur", event => {
      let textAcontents=textA.value.trim();
      let button = this.element.querySelector("button");
      
      if (!textAcontents) {
        textA.classList.add("error");
        button.disabled = true;
      } else if (textAcontents.split(" ").length > 5) {
          textA.classList.add("error");
          button.disabled = true;
        } 
      else if(
        textAcontents.length == 0){
          textA.classList.add("error");
          button.disabled = true;
        } else {
        textA.classList.remove("error");
        // if ($("#userName").hasClass("error") || $("#userLastname").hasClass("error") || $("#userEmail").hasClass("error") || $("#userName").is(':empty') || $("#userLastname").is(':empty') || $("#userEmail").is(':empty') ){
        //   button.disabled = true;
        // } else {
        //   button.disabled = false;
        // }}
      }})
    }catch(e) {console.log("No text forms on this page. Error: "+e)}
  }
  



  checkFormValidity() {
    let button = this.element.querySelector("button");
    if (this.element.checkValidity() && $("textarea").val().length != 0) {
      button.disabled = false;
    } else {
      
      button.disabled = true;
    }
  }
}
