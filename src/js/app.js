import { gsap, Back } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { preloadImages } from "./utils";

Splitting();

let isAnimating = false;
let tl = gsap.timeline();
const overlayPath = document.querySelector(".overlay__path");
const openMenuCtrl = document.querySelector("button.button-menu");
const closeMenuCtrl = document.querySelector("button.button-close");
const menuWrap = document.querySelector(".menu-wrap");
const loaderText = document.querySelector("#loader-text");
const cards = document.querySelectorAll(".card");
const hero = {
  heading: document.querySelector(".hero__title"),
  char: document.querySelector("span.char"),
  moresection: document.querySelectorAll(".hero__more--section"),
};
const navLinks = document.querySelectorAll("#nav-link");
const titleChar = Splitting({ target: hero.heading, by: "chars" });

preloadImages().then(() => {
  console.log("Ready");
  // Call loading
});

const animateLoaderBanner = () => {
  const result = Splitting({ target: loaderText, by: "chars" });
  const lt = result[0].chars;
  tl.to(
    lt,
    {
      duration: 0.9,
      stagger: 0.05,
      ease: "power4.in",
      color: "var(--color-dark)",
    },
    0.5
  )
    .to(
      lt,
      {
        delay: 1,
        duration: 1.3,
        stagger: 0.05,
        ease: "power4.in",
        color: "var(--color-text)",
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
      duration: 0.7,
      ease: "power4.out",
      y: "100%",
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

const openMenu = () => {
  if (isAnimating) return;
  isAnimating = true;

  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
    })
    .set(overlayPath, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
    })
    .to(
      overlayPath,
      {
        duration: 0.8,
        ease: "power2.in",
        attr: {
          d: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
        },
      },
      0
    )
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
    })
    .to(
      [hero.heading, hero.moresection],
      {
        duration: 1,
        ease: "power2.in",
        y: -200,
        stagger: 0.05,
      },
      0.05
    )
    // Now reveal
    .set(menuWrap, { display: "flex" })
    .set(overlayPath, {
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
    })
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2.in",
      attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
    })
    .to(overlayPath, {
      duration: 0.8,
      ease: "power4",
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
    });
};

const closeMenu = () => {
  if (isAnimating) return;
  isAnimating = true;

  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
    })
    .set(overlayPath, {
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
    })
    .to(
      overlayPath,
      {
        duration: 0.8,
        ease: "power4.in",
        attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
      },
      0
    )
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      //   fill: "var(--color-dark)",
      onComplete: () => {
        // frame.classList.remove("frame--menu-open");
        // menuWrap.classList.remove("menu-wrap--open");
        console.log("Completed");
      },
    })
    // now reveal
    .set(overlayPath, {
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
    })
    .set(menuWrap, { display: "none" })
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2.in",
      attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
    })
    .to(overlayPath, {
      duration: 0.8,
      ease: "power4",
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
    })
    .to(
      [hero.heading, hero.moresection],
      {
        duration: 1.1,
        ease: "power4",
        y: 0,
        stagger: -0.05,
      },
      ">-=1.1"
    );
};

// Hover State on links that switches the image
navLinks.forEach((link) => {
  // if ("Contact" in link.innerText) {
  //   console.log("The contact");
  // }
  link.addEventListener("mouseenter", () => {
    const { name } = link.dataset;
    if (name === "work") {
      console.log("On Work");
    }
    if (name === "studio") {
      console.log("On Studio");
    }
    if (name === "contact") {
      console.log("On Studio");
    }
  });
});

openMenuCtrl.addEventListener("click", openMenu);
closeMenuCtrl.addEventListener("click", closeMenu);
animateLoaderBanner();
