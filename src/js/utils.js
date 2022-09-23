import { gsap, Back } from "gsap";
import Splitting from "splitting";
const imagesLoaded = require("imagesloaded");

const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

const animateLoaderBanner = () => {
  const loaderText = document.querySelector("#loader-text");
  const result = Splitting({
    target: loaderText,
    by: "chars",
  });
  const lt = result[0].chars;
  const tl = gsap.timeline();
  gsap.set(document.body, { overflow: "hidden" });

  tl.to(
    lt,
    {
      duration: 0.9,
      stagger: 0.05,
      ease: "power4.in",
      color: "var(--color-dark)",
      x: 5,
    },
    "+=0.5"
  )
    .to(
      lt,
      {
        delay: 1,
        duration: 1.3,
        stagger: 0.05,
        ease: "power4.in",
        color: "var(--color-number)",
      },
      0.5
    )
    .to(
      loaderText,
      {
        delay: 1.4,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.in",
        y: "-100vw",
        opacity: 0,
      },
      ">-=1.1"
    )
    // Animate Loader
    .to(".loader", {
      delay: -0.2,
      duration: 1,
      ease: "power3.out",
      y: "-100%",
      display: "none",
      onComplete: () => {
        document.body.style.overflow = "auto";
      },
    })
    .to(".header", {
      duration: 0.9,
      ease: "power4",
      y: 0,
      opacity: 1,
    });
};

/*
const animateLoaderBanner = () => {
  const result = Splitting({ target: loaderText, by: "chars" });
  const lt = result[0].chars;
  gsap.set(document.body, { overflow: "hidden" });

  tl.to(
    lt,
    {
      duration: 0.9,
      stagger: 0.05,
      ease: "power4.in",
      color: "var(--color-dark)",
      x: 5,
    },
    "+=0.5"
  )
    .to(
      lt,
      {
        delay: 1,
        duration: 1.3,
        stagger: 0.05,
        ease: "power4.in",
        color: "var(--color-number)",
      },
      0.5
    )
    .to(
      loaderText,
      {
        delay: 1.4,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.in",
        y: "-100vw",
        opacity: 0,
      },
      ">-=1.1"
    )
    // Animate Loader
    .to(".loader", {
      delay: -0.2,
      duration: 1,
      ease: "power3.out",
      y: "-100%",
      display: "none",
      onComplete: () => {
        document.body.style.overflow = "auto";
      },
    })
    .to(".header", {
      duration: 0.9,
      ease: "power4",
      y: 0,
      opacity: 1,
    })
    .from(
      titleChar[0].chars,
      {
        duration: 1.4,
        stagger: 0.05,
        ease: Back.easeInOut.config(1.7),
        rotateX: -50,
        transformOrigin: "50% 50%",
        opacity: 0,
        y: 120,
      },
      "-=0.9"
    )
    .from(
      hero.moresection,
      {
        duration: 1.4,
        stagger: 0.08,
        ease: Back.easeInOut.config(1.7),
        transformOrigin: "50% 50%",
        opacity: 0,
        y: 120,
        onComplete: () => console.log("Complete"),
      },
      "-=2"
    )
    .from(
      cards,
      {
        duration: 1,
        stagger: 0.09,
        ease: Back.easeInOut.config(2.5),
        opacity: 0,
        x: 120,
      },
      "-=1.4"
    );
};
*/

export { preloadImages, animateLoaderBanner };
