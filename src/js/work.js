import { gsap, Back } from "gsap";
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

const menu = new Menu(document.querySelector(".menu-wrap"));
const heroitem = new heroItem();

const { workImg, workAccordion, workImgWrapper, workhero, accordionItems } =
  heroitem.DOM;

const openMenu = () => {
  gsap
    .timeline()
    .to(
      workhero,
      {
        delay: -0.9,
        duration: 1,
        ease: "power2.in",
        // y: -200,
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

closeMenu = () => {
  gsap
    .timeline()
    .to(
      workhero,
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

// Listen for mousemove to display the images
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

// Listen to the click event
menu.DOM.openMenuCtrl.addEventListener("click", openMenu);
menu.DOM.closeMenuCtrl.addEventListener("click", closeMenu);
