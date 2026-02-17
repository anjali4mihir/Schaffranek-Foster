const toggle = document.querySelector(".menu-toggle");
const close = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".mobile-menu");

toggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

close.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});
gsap.from(".site-header", {
  y:-80,
  opacity:0,
  duration:1,
  ease:"power3.out"
});
