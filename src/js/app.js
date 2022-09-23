import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
Splitting();
import { animateLoaderBanner, preloadImages } from "./utils";

// Barba
import barba from "@barba/core";

barba.init({
  debug: true,
  transitions: [
    {
      name: "switch",
      leave({ current }) {
        // closeMenu()
      },
      enter({ next }) {
        // closeMenu()
      },
    },
  ],
  preventRunning: true,
});
// const titleChar = Splitting({ target: hero.heading, by: "chars" });

preloadImages().then(() => {
  // navImg.setAttribute("src", image1);
  // animateLoaderBanner();
  // new Menu(document.querySelector(".menu-wrap"));
});
