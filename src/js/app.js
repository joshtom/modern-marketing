import { gsap } from "gsap";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import barba from "@barba/core";
import { heroItem } from "./heroItem";
import {
  animationEnter,
  animationLeave,
  bannerLoaderHome,
  bannerLoaderWork,
  closeMenuHome,
  closeMenuWork,
  disablePointerEvents,
  enablePointerEvents,
  openMenuHome,
  openMenuWork,
  workAccordionCall,
} from "./utils";
import { Menu } from "./menu";

Splitting();

const menu = new Menu();
const { openMenuCtrl, closeMenuCtrl } = menu.DOM;

barba.init({
  debug: false,
  transitions: [
    {
      name: "My Awesome Transition",
      once({
        next: {
          url: { path },
        },
      }) {
        if (path === "/" || path === "/index.html") {
          return bannerLoaderHome();
        } else {
          return bannerLoaderWork();
        }
      },
      beforeEnter({ next }) {},
      leave(data) {
        const done = this.async();
        // Menu navigation
        gsap.to("nav.header", { autoAlpha: 0, ease: "none" });
        animationLeave(data.current.container);
        disablePointerEvents();
        if (
          data.next.url.path === "/" ||
          data.next.url.path === "/index.html"
        ) {
          menu.DOM.overlayLoaderWrapperText.innerHTML = "curious";
        } else {
          menu.DOM.overlayLoaderWrapperText.innerHTML = "intuitive";
        }
        setTimeout(() => {
          enablePointerEvents();
          done();
        }, 2000);
      },

      enter({ next }) {
        // scroll to top of the page
        gsap.to("nav.header", { autoAlpha: 1, ease: "none" });
        window.scrollTo(0, 0);
        animationEnter(next.container);
      },
    },
  ],
  views: [
    {
      namespace: "work",
      beforeEnter({ next }) {
        workAccordionCall(
          document.querySelectorAll(".work__section--list"),
          document.querySelector(".work__section--image"),
          document.querySelector(".work__section--image img")
        );

        const workhero = document.querySelector("#work-hero");
        const workherotext = document.querySelector("#work-hero-text");
        const accordionItems = document.querySelectorAll(
          ".work__section--list"
        );
        openMenuCtrl.addEventListener(
          "click",
          () => openMenuWork(workhero, workherotext, accordionItems),
          false
        );
        closeMenuCtrl.addEventListener(
          "click",
          () => closeMenuWork(workhero, workherotext, accordionItems),
          false
        );
      },
      beforeLeave() {},
    },
    {
      namespace: "home",
      beforeEnter({ next }) {
        const heading = document.querySelector(".hero__title");
        const moresection = document.querySelectorAll(".hero__more--section");
        const cards = document.querySelectorAll(".card");
        openMenuCtrl.addEventListener(
          "click",
          () => openMenuHome(heading, moresection, cards),
          false
        );
        closeMenuCtrl.addEventListener(
          "click",
          () => closeMenuHome(heading, moresection, cards),
          false
        );
      },
      beforeLeave() {},
    },
  ],
  preventRunning: true,
});

// Prevent reload if a user clicks on the current link on the same url
let links = document.querySelectorAll("a[href]");
let cbk = function (e) {
  if (e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
};

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", cbk);
}
