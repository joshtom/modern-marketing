import { gsap, Back } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import { preloadImages } from "./utils";
import image1 from "../assets/img/23.jpg";
import image2 from "../assets/img/13.jpg";
import image3 from "../assets/img/14.jpg";
import image4 from "../assets/img/2.jpg";
import image5 from "../assets/img/22.jpg";
import image6 from "../assets/img/30.jpg";
import image7 from "../assets/img/31.jpg";
import image8 from "../assets/img/32.jpg";
import image9 from "../assets/img/36.jpg";
import image10 from "../assets/img/37.jpg";

// Work Image Import

// Barba
import barba from "@barba/core";

barba.init({
  debug: true,
  transitions: [
    {
      name: "switch",
      leave({ current }) {
        document.body.style.backgroundColor = "red";
        // closeMenu()
      },
      enter({ next }) {
        document.body.style.backgroundColor = "black";
        // closeMenu()
      },
    },
  ],
  preventRunning: true,
});

Splitting();

let isAnimating = false;
let tl = gsap.timeline();
const overlayPath = document.querySelector(".overlay__path");
const openMenuCtrl = document.querySelector("button.button-menu");
const closeMenuCtrl = document.querySelector("button.button-close");

const loaderText = document.querySelector("#loader-text");
const cards = document.querySelectorAll(".card");
const navImg = document.querySelector(".menu-wrap .hidden-img img");
const hideImg = document.querySelector(".menu-wrap .hidden-img");

const hero = {
  heading: document.querySelector(".hero__title"),
  char: document.querySelector("span.char"),
  moresection: document.querySelectorAll(".hero__more--section"),
};

const menus = {
  menuWrap: document.querySelector(".menu-wrap"),
  headerWrap: document.querySelector("nav.header"),
  navLinks: document.querySelectorAll(".nav__link"),
  navSocialLink: document.querySelectorAll(".socials__links--horizontal"),
  footer: document.querySelector(".menu-wrap--footer"),
};

const workImgWrapper = document.querySelector(".work__section--image");
const workImg = document.querySelector(".work__section--image img");
const workAccordion = document.querySelectorAll(".work__section--list");

const titleChar = Splitting({ target: hero.heading, by: "chars" });

preloadImages().then(() => {
  console.log("Ready");
  navImg.setAttribute("src", image1);
});

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

const openMenu = () => {
  if (isAnimating) return;
  isAnimating = true;

  gsap.set(document.body, { overflow: "hidden" });
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
    .set(menus.menuWrap, { display: "flex" })
    .set([menus.navLinks, menus.navSocialLink, menus.footer], {
      opacity: 0,
      y: 200,
    })
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
    })
    .to(
      [menus.navLinks, menus.navSocialLink, menus.footer],
      {
        delay: -0.6,
        duration: 0.7,
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out",
        y: 0,
      },
      ">-=0.5"
    );
};

const closeMenu = () => {
  if (isAnimating) return;
  isAnimating = true;
  gsap.set(document.body, { overflow: "auto" });
  // Slide Texts
  gsap.timeline().to(
    [menus.navLinks, menus.navSocialLink, menus.footer],
    {
      duration: 0.7,
      ease: "power3.out",
      opacity: 0,
      y: 200,
    },
    "+=0.1"
  );
  // Animate Paths
  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
      delay: -0.4,
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
    .set(menus.menuWrap, { display: "none" })
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
animateLoaderBanner();

// Hover State on links that switches the image
menus.navLinks.forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    const { name } = link.dataset;
    if (name === "studio") {
      gsap.set(navImg, { attr: { src: image2 } });
    } else if (name === "contact") {
      gsap.set(navImg, { attr: { src: image3 } });
    } else {
      gsap.set(navImg, { attr: { src: image1 } });
    }
    hideImg.style.transform = `translate(-170%, -50% ) rotate(5deg)`;
    navImg.style.transform = "scale(1, 1)";
    hideImg.style.opacity = 1;
    navImg.style.opacity = 1;

    // Image move with cursor
    gsap.to(hideImg, {
      duration: 0.01,
      ease: "power4.out",
      left: e.clientX + "px",
      top: e.clientY + "px",
    });
  });

  link.addEventListener("mouseleave", () => {
    hideImg.style.opacity = 0;
    navImg.style.opacity = 0;
    hideImg.style.transform = `translate(-50%, -50%) rotate(-5deg)`;
    navImg.style.transform = "scale(0.8, 0.8)";
  });
});

const getAccordionImage = (number) => {
  switch (number) {
    case "1":
      workImg.setAttribute("src", image4);
      break;
    case "2":
      workImg.setAttribute("src", image5);
      break;
    case "3":
      workImg.setAttribute("src", image6);
      break;
    case "4":
      workImg.setAttribute("src", image7);
      break;
    case "5":
      workImg.setAttribute("src", image8);
      break;
    case "6":
      workImg.setAttribute("src", image9);
      break;
    case "7":
      workImg.setAttribute("src", image10);
      break;
    case "8":
      workImg.setAttribute("src", image1);
      break;
    case "9":
      workImg.setAttribute("src", image2);
      break;
    case "10":
      workImg.setAttribute("src", image3);
      break;

    default:
      workImg.setAttribute("src", image4);
      break;
  }
};

// Hover State for Work divs
workAccordion.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const { number } = el.dataset;
    getAccordionImage(number);
    // Use Switch for a little syntactic sugar

    workImgWrapper.style.opacity = 1;
    workImgWrapper.style.zIndex = 1;
    workImgWrapper.style.transform = `translate(-120%, -80% ) rotate(5deg)`;

    gsap.to(workImgWrapper, {
      duration: 0.1,
      ease: "power4.out",
      // left: e.clientX + "px",
      top: e.clientY + "px",
    });
  });

  el.addEventListener("mouseleave", () => {
    workImgWrapper.style.opacity = 0;
  });
});
