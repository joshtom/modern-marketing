import { gsap } from "gsap";
import { heroItem } from "./heroItem";
import { Menu } from "./menu";
import barba from "@barba/core";
import {
  animationEnter,
  animationLeave,
  bannerLoaderHome,
  disablePointerEvents,
  enablePointerEvents,
} from "./utils";

// const menu = new Menu(document.querySelector(".menu-wrap"));
const heroitem = new heroItem();

const menu = new Menu();

const { heading, moresection } = heroitem.DOM;

const openMenu = () => {
  console.log("Getting here open");
  gsap.timeline().to(
    [heading, moresection],
    {
      delay: -0.6,
      duration: 1,
      ease: "power2.in",
      y: -200,
      stagger: 0.05,
      opacity: 0,
      onComplete: () => {
        console.log("This is now completeeeeeeeee");
      },
    },
    0.5
  );
};

closeMenu = () => {
  gsap.timeline().to(
    [heading, moresection],
    {
      delay: 0.4,
      duration: 1,
      ease: "power4",
      y: 0,
      stagger: 0.05,
      opacity: 1,
    },
    0.5
  );
};

const openMenuCtrl = document.querySelector("button.button-menu");
const closeMenuCtrl = document.querySelector("button.button-close");

barba.hooks.after(() => {
  console.log("Not sure if it's removing the event");
  // openMenuCtrl.removeEventListener("click", openMenu);
  // closeMenuCtrl.removeEventListener("click", closeMenu);
});

barba.init({
  sync: true,
  debug: true,
  transitions: [
    {
      name: "Home Transition",
      once({
        next: {
          url: { path },
        },
      }) {
        bannerLoaderHome();
        console.log("This part works fine on load");
      },
      leave(data) {
        const done = this.async();
        // Menu navigation
        // Everything here works as well but I'm also open to suggestion on how it can be improved
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
      namespace: "home",
      beforeLeave({}) {
        console.log("Not sure if it's removing the event");
        // openMenuCtrl.removeEventListener("click", openMenu);
        // closeMenuCtrl.removeEventListener("click", closeMenu);
        console.log("hero title", heroitem.DOM.heading);
      },
      beforeEnter() {
        // openMenuCtrl.addEventListener("click", openMenu);
        // closeMenuCtrl.addEventListener("click", closeMenu);
        console.log("hero title", heroitem.DOM.heading);
      },
    },
  ],
});
