const track = document.querySelector(".slider-track");

let position = 0;
let speed = 0.4;
let isPaused = false;
let isDragging = false;
let startX = 0;
let currentX = 0;

function animate() {

  if(!isPaused && !isDragging){
    position -= speed;
  }

  if(Math.abs(position) >= track.scrollWidth / 2){
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(animate);
}

animate();


// PAUSE ON HOVER
track.addEventListener("mouseenter", () => {
  isPaused = true;
});

track.addEventListener("mouseleave", () => {
  isPaused = false;
});


// DRAG FUNCTIONALITY

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if(!isDragging) return;

  currentX = e.clientX;
  let move = currentX - startX;

  position += move * 0.5;
  startX = currentX;
});


// MOBILE TOUCH SUPPORT

track.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {

  if(!isDragging) return;

  currentX = e.touches[0].clientX;
  let move = currentX - startX;

  position += move * 0.5;
  startX = currentX;
});

track.addEventListener("touchend", () => {
  isDragging = false;
});



//  Custom JavaScript Slider (Simple Fade Logic)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
}

document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".testimonial-card", {
        scrollTrigger: ".callback-section",
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    gsap.from(".form-group", {
        scrollTrigger: ".callback-section",
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
    });
});