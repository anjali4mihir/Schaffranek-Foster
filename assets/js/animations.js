gsap.fromTo(".hero-ellipse",
  {
    scale: 0.8,
    opacity: 0.6
  },
  {
    scale: 1.1,
    opacity: 1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  }
);
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".parallax-help",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});

tl.to(".parallax-bg", {
  y: 120,
  ease: "none"
}, 0);


tl.to(".parallax-image", {
  y: 60,
  ease: "none"
}, 0);


tl.from(".parallax-overlay", {
  y: 40,
  opacity: 0
}, 0);


gsap.from(".services__left", {
  y: 60,
  opacity: 0,
  duration: 1
});

gsap.to(".service-item", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

gsap.from(".footer-col", {
  duration: 1,
  y: 30,
  opacity: 0,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".main-footer",
    start: "top 90%",
  }
});
