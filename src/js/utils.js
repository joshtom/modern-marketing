const imagesLoaded = require("imagesloaded");
import { gsap, Back } from "gsap";
import Splitting from "splitting";
import { heroItem } from "./heroItem";
import { Menu } from "./menu";
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

const heroitem = new heroItem();
const menu = new Menu();
const {
  overlayPath,
  overlayLoaderWrapper,
  overlayLoaderWrapperText,
  menuWrap,
  navLinks,
  navSocialLink,
  footer,
} = menu.DOM;
const {
  workHeader,
  accordionItems,
  card,
  workhero,
  workherotext,
  heading,
  moresection,
} = heroitem.DOM;

const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

const animationEnter = (container) => {
  showHeader();
  return gsap.from(container, {
    duration: 1,
    autoAlpha: 0,
    opacity: 0,
    ease: "none",
  });
};

const animationLeave = (container) => {
  gsap
    .timeline()
    .set(overlayPath, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      zIndex: 1,
      fill: "var(--color-yellow)",
    })
    .set(".overlay", { zIndex: 1000 })
    .to([navLinks, navSocialLink, footer], {
      duration: 0.6,
      ease: "power2.in",
      opacity: 0,
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
    .set(overlayLoaderWrapper, { zIndex: 2000 })
    .set(overlayLoaderWrapperText, {
      display: "block",
      autoAlpha: 1,
      zIndex: 1000,
    })
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
    })
    .from(
      overlayLoaderWrapperText,
      { duration: 0.8, y: 300, stagger: 0.05 },
      "=-.6"
    )
    // Hide Menu Navigation if present
    .set(menuWrap, { display: "none" })
    .set(overlayPath, { attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" } })
    .to(overlayPath, {
      duration: 0.8,
      ease: "power2.in",
      attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
    })
    .to(overlayPath, {
      duration: 1,
      ease: "power4",
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
    })
    .to(
      overlayLoaderWrapperText,
      {
        duration: 1,
        y: -300,
        ease: "power4.in",
        autoAlpha: 0,
        onComplete: () => {
          document.querySelector(".overlay-loader-wrapper").style.zIndex = -1;
          document.querySelector(".overlay-text").style.translateY = 0;
        },
      },
      1
    )
    .set(overlayLoaderWrapperText, { y: 0, display: "none" });

  gsap.to(container, {
    duration: 1.3,
    autoAlpha: 0,
    ease: "power2.out",
  });
};

const bannerLoaderHome = () => {
  const loaderText = document.querySelector("#loader-text");
  const titleChar = Splitting({
    target: heading,
    by: "chars",
  });
  const result = Splitting({ target: loaderText, by: "chars" });
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
      onComplete: () => {},
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
      moresection,
      {
        duration: 1.4,
        stagger: 0.08,
        ease: Back.easeInOut.config(1.7),
        transformOrigin: "50% 50%",
        opacity: 0,
        y: 120,
      },
      "-=2"
    )
    .from(
      card,
      {
        duration: 1,
        stagger: 0.09,
        ease: Back.easeInOut.config(2.5),
        opacity: 0,
        x: 120,
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      },
      "-=1.4"
    );
};

const bannerLoaderWork = () => {
  const loaderText = document.querySelector("#loader-text");
  const titleChar = Splitting({
    target: workhero,
    by: "chars",
  });
  const subtitleChar = Splitting({
    target: workherotext,
    by: "chars",
  });
  const result = Splitting({ target: loaderText, by: "chars" });
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
    })
    .from(workHeader, { duration: 1, autoAlpha: 0 }, "-=.5")
    .from(
      [titleChar[0].chars, subtitleChar[0].chars],
      {
        duration: 1.4,
        stagger: 0.05,
        ease: Back.easeInOut.config(1.3),
        rotateX: -20,
        transformOrigin: "50% 50%",
        opacity: 0,
        y: 120,
      },
      "-=0.9"
    )
    .from(
      accordionItems,
      {
        delay: -1.3,
        duration: 1,
        x: 120,
        opacity: 0,
        stagger: 0.05,
        ease: Back.easeInOut.config(1.6),
      },
      "-=1.4"
    );
};

const getAccordionImage = (number, workImg) => {
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

/**
 * @param (workAccordion, workImgWrapper, workImg)
 */
const workAccordionCall = (workAccordion, workImgWrapper, workImg) => {
  // Listen for mousemove to display the images
  workAccordion.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const { number } = el.dataset;
      getAccordionImage(number, workImg);
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
};

const openMenuHome = (heading, moresection, card) => {
  hideHeader();
  gsap
    .timeline()
    .to(
      [heading, moresection],
      {
        delay: -0.6,
        duration: 1,
        ease: "power2.in",
        y: -200,
        stagger: 0.05,
        opacity: 0,
        onComplete: () => {},
      },
      0.5
    )
    .to(
      card,
      {
        duration: 1.2,
        stagger: 0.09,
        ease: Back.easeInOut.config(1.7),
        opacity: 0,
        y: -120,
      },
      "-=1.4"
    );
};

const closeMenuHome = (heading, moresection, card) => {
  showHeader();
  gsap
    .timeline()
    .to(
      [heading, moresection],
      {
        delay: 0.4,
        duration: 1,
        ease: "power4",
        y: 0,
        stagger: 0.05,
        opacity: 1,
        onComplete: () => {},
      },
      0.5
    )
    .to(
      card,
      {
        duration: 1,
        stagger: 0.09,
        ease: Back.easeInOut.config(1.5),
        opacity: 1,
        y: 0,
      },
      "-=1.4"
    );
};

const openMenuWork = (workhero, workherotext, accordionItems) => {
  gsap
    .timeline()
    .to(
      [workhero, workherotext],
      {
        delay: -0.9,
        duration: 1,
        ease: "power2.in",
        y: -200,
        stagger: 0.05,
        opacity: 0,
      },
      0.5
    )
    .to(accordionItems, {
      delay: -0.8,
      x: 100,
      opacity: 0,
      stagger: 0.05,
    });
};

closeMenuWork = (workhero, workherotext, accordionItems) => {
  gsap
    .timeline()
    .to(
      [workhero, workherotext],
      {
        delay: 0.4,
        duration: 1,
        ease: "power4.out",
        y: 0,
        stagger: 0.05,
        opacity: 1,
      },
      0.5
    )
    .to(accordionItems, {
      delay: -1.3,
      duration: 1,
      x: 0,
      opacity: 1,
      stagger: 0.05,
      ease: Back.easeInOut.config(1.6),
    });
};

const hideHeader = () => {
  gsap.to("nav.header", {
    delay: 0.5,
    autoAlpha: 0,
    ease: "power2.in",
    y: -100,
  });
};
const showHeader = () => {
  gsap.to("nav.header", {
    delay: 0.9,
    duration: 0.9,
    autoAlpha: 1,
    ease: "power2.out",
    y: 0,
  });
};

const disablePointerEvents = () => {
  document.body.style.pointerEvents = "none";
};

const enablePointerEvents = () => {
  document.body.style.pointerEvents = "auto";
};

export {
  preloadImages,
  bannerLoaderHome,
  bannerLoaderWork,
  animationEnter,
  animationLeave,
  disablePointerEvents,
  enablePointerEvents,
  workAccordionCall,
  openMenuHome,
  closeMenuHome,
  closeMenuWork,
  openMenuWork,
};
