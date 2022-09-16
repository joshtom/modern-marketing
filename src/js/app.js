import { gsap, Back } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

Splitting();

let isAnimating = false;
const overlayPath = document.querySelector(".overlay__path");
const openMenuCtrl = document.querySelector("button.button-menu");
const closeMenuCtrl = document.querySelector("button.button-close");
const menuWrap = document.querySelector(".menu-wrap");
const hero = {
  heading: document.querySelector(".hero__title"),
  moresection: document.querySelectorAll(".hero__more--section"),
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
        ease: Back.easeInOut.config(1.7),
        y: -200,
        stagger: 0.05,
      },
      0.2
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

openMenuCtrl.addEventListener("click", openMenu);
closeMenuCtrl.addEventListener("click", closeMenu);
