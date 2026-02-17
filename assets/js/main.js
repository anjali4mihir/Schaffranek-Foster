const nav = document.getElementById("navMenu");
const openBtn = document.getElementById("navToggle");
const closeBtn = document.getElementById("navClose");

openBtn.addEventListener("click", () => {
    nav.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    nav.classList.remove("active");
});
gsap.from(".header", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

const form = document.getElementById("callbackForm");

form.addEventListener("submit", function(e){

  if(!form.checkValidity()){
    e.preventDefault();
    alert("Please fill all required fields correctly.");
  }

});

