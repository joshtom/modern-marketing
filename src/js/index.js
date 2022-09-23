import { gsap } from "gsap";
import { heroItem } from "./heroItem";
import { Menu } from "./menu";

const menu = new Menu(document.querySelector(".menu-wrap"));
const heroitem = new heroItem();

const { heading, moresection } = heroitem.DOM;

const openMenu = () => {
  gsap.timeline().to(
    [heading, moresection],
    {
      delay: -0.6,
      duration: 1,
      ease: "power2.in",
      y: -200,
      stagger: 0.05,
      opacity: 0,
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

//
menu.DOM.openMenuCtrl.addEventListener("click", openMenu);
menu.DOM.closeMenuCtrl.addEventListener("click", closeMenu);
