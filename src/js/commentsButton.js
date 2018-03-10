window.onload=function(){
 const comButton = document.querySelector(".commentTitle button");
 const comForm = document.querySelector(".commentsForm");

 function toggleNav2({ target }) {
   const expanded = target.getAttribute("aria-expanded") === "true" || false;
   comButton.setAttribute("aria-expanded", !expanded);
   comForm.classList.toggle("hidden");
 }

 try{comButton.addEventListener("click", toggleNav2);}
 catch(e){console.log("No form submit button on this page. Error: "+e)}

}


