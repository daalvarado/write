const comButton = document.querySelector(".commentTitle button");
const comForm = document.querySelector(".commentsForm");

function toggleNav2({ target }) {
  const expanded = target.getAttribute("aria-expanded") === "true" || false;
  comButton.setAttribute("aria-expanded", !expanded);
  comForm.classList.toggle("hidden");
}

comButton.addEventListener("click", toggleNav2);
