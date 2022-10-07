import { gsap, Back } from "gsap";
import image1 from "../assets/img/23.jpg";
import image2 from "../assets/img/13.jpg";
import image3 from "../assets/img/14.jpg";
import { heroItem } from "./heroItem";

const heroitem = new heroItem();

const { heading, moresection } = heroitem.DOM;
export class Menu {
  DOM = {
    el: null,
    menuWrap: document.querySelector(".menu-wrap"),
    headerWrap: document.querySelector("nav.header"),
    navLinks: document.querySelectorAll(".nav__link"),
    navSocialLink: document.querySelectorAll(".socials__links--horizontal"),
    footer: document.querySelector(".menu-wrap--footer"),
    overlayPath: document.querySelector(".overlay__path"),
    overlayLoaderWrapper: document.querySelector(".overlay-loader-wrapper"),
    overlayLoaderWrapperText: document.querySelector(
      ".overlay-loader-wrapper > h1"
    ),
    openMenuCtrl: document.querySelector("button.button-menu"),
    closeMenuCtrl: document.querySelector("button.button-close"),
    navImg: document.querySelector(".menu-wrap .hidden-img img"),
    hideImg: document.querySelector(".menu-wrap .hidden-img"),
    make: window.location.href,
  };
  page = null;
  isAnimating = false;

  /**
   * Constructor.
   * @param {Element} DOM_el - main item .menu wrap element
   */

  constructor(DOM_el = null) {
    console.log("Calling this class");
    this.DOM.el = DOM_el;
    // Initialize the event on every page
    this.initEvents();
  }

  initEvents() {
    // Hover State on links that switches the image
    this.DOM.navLinks.forEach((link) => {
      link.addEventListener("mousemove", (e) => {
        const { name } = link.dataset;
        if (name === "studio") {
          gsap.set(this.DOM.navImg, { attr: { src: image2 } });
        } else if (name === "contact") {
          gsap.set(this.DOM.navImg, { attr: { src: image3 } });
        } else {
          gsap.set(this.DOM.navImg, { attr: { src: image1 } });
        }
        this.DOM.hideImg.style.transform = `translate(-170%, -50% ) rotate(5deg)`;
        this.DOM.navImg.style.transform = "scale(1, 1)";
        this.DOM.hideImg.style.opacity = 1;
        this.DOM.navImg.style.opacity = 1;

        // Image move with cursor
        gsap.to(this.DOM.hideImg, {
          duration: 0.01,
          ease: "power4.out",
          left: e.clientX + "px",
          top: e.clientY + "px",
        });
      });

      link.addEventListener("mouseleave", () => {
        this.DOM.hideImg.style.opacity = 0;
        this.DOM.navImg.style.opacity = 0;
        this.DOM.hideImg.style.transform = `translate(-50%, -50%) rotate(-5deg)`;
        this.DOM.navImg.style.transform = "scale(0.8, 0.8)";
      });
    });

    this.DOM.closeMenuCtrl.addEventListener("click", () => {
      let tl = gsap.timeline({
        onComplete: () => (this.isAnimating = false),
        delay: -0.4,
      });
      if (this.isAnimating) return;
      this.isAnimating = true;
      gsap.set(document.body, { overflow: "auto" });
      // Slide Texts
      gsap.timeline().to(
        [this.DOM.navLinks, this.DOM.navSocialLink, this.DOM.footer],
        {
          duration: 0.7,
          ease: "power3.out",
          opacity: 0,
          y: 200,
        },
        "+=0.1"
      );
      // Animate Paths
      tl.set(this.DOM.overlayPath, {
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        fill: "var(--color-dark)",
      })
        .to(
          this.DOM.overlayPath,
          {
            duration: 0.8,
            ease: "power4.in",
            attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
          },
          0
        )
        .to(this.DOM.overlayPath, {
          duration: 0.3,
          ease: "power2",
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
          //   fill: "var(--color-dark)",
          onComplete: () => {
            // frame.classList.remove("frame--menu-open");
          },
        })
        // now reveal
        .set(this.DOM.overlayPath, {
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        })
        .set(this.DOM.menuWrap, { display: "none" })
        .to(this.DOM.overlayPath, {
          duration: 0.3,
          ease: "power2.in",
          attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
        })
        .to(this.DOM.overlayPath, {
          duration: 0.8,
          ease: "power4",
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
        })
        .to(
          [heading, moresection],
          {
            delay: 0.6,
            duration: 1,
            ease: "power4",
            y: 0,
            stagger: 0.05,
            opacity: 1,
          },
          0.5
        );
    });

    this.DOM.openMenuCtrl.addEventListener("click", () => {
      console.log("The hero title from click", heading);
      let tl = gsap.timeline({
        onComplete: () => (this.isAnimating = false),
      });
      if (this.isAnimating) return;
      this.isAnimating = true;
      gsap.set(document.body, { overflow: "hidden" });
      tl.set(this.DOM.overlayPath, {
        attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
        fill: "var(--color-dark)",
      })
        .to(
          this.DOM.overlayPath,
          {
            duration: 0.8,
            ease: "power2.in",
            attr: {
              d: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
            },
          },
          0
        )
        .to(this.DOM.overlayPath, {
          duration: 0.3,
          ease: "power2",
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        })

        // Now reveal
        .set(this.DOM.menuWrap, {
          display: "flex",
        })
        .set([this.DOM.navLinks, this.DOM.navSocialLink, this.DOM.footer], {
          opacity: 0,
          y: 200,
        })
        .set(this.DOM.overlayPath, {
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
        })
        .to(this.DOM.overlayPath, {
          duration: 0.3,
          ease: "power2.in",
          attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
        })
        .to(this.DOM.overlayPath, {
          duration: 0.8,
          ease: "power4",
          attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        })
        .to(
          [this.DOM.navLinks, this.DOM.navSocialLink, this.DOM.footer],
          {
            delay: -0.6,
            duration: 0.7,
            opacity: 1,
            stagger: 0.05,
            ease: "power3.out",
            y: 0,
            onComplete: () => {
              console.log("Killed");
              // tl.kill();
            },
          },
          ">-=0.5"
        );
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
            console.log(
              "This is always consoled but this animation doesn't run after there is a transition",
              heading
            );
          },
        },
        0.5
      );
    });
  }
}
