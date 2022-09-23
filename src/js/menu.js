import { gsap } from "gsap";
import image1 from "../assets/img/23.jpg";
import image2 from "../assets/img/13.jpg";
import image3 from "../assets/img/14.jpg";

export class Menu {
  DOM = {
    el: null,
    menuWrap: document.querySelector(".menu-wrap"),
    headerWrap: document.querySelector("nav.header"),
    navLinks: document.querySelectorAll(".nav__link"),
    navSocialLink: document.querySelectorAll(".socials__links--horizontal"),
    footer: document.querySelector(".menu-wrap--footer"),
    overlayPath: document.querySelector(".overlay__path"),
    openMenuCtrl: document.querySelector("button.button-menu"),
    closeMenuCtrl: document.querySelector("button.button-close"),
    navImg: document.querySelector(".menu-wrap .hidden-img img"),
    hideImg: document.querySelector(".menu-wrap .hidden-img"),
    make: window.location.href,
  };

  isAnimating = false;

  /**
   * Constructor.
   * @param {Element} DOM_el - main item .menu wrap element
   */

  constructor(DOM_el) {
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
      gsap
        .timeline({
          onComplete: () => (this.isAnimating = false),
          delay: -0.4,
        })
        .set(this.DOM.overlayPath, {
          attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
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
        });
    });
    this.DOM.openMenuCtrl.addEventListener("click", () => {
      if (this.isAnimating) return;
      this.isAnimating = true;
      gsap.set(document.body, { overflow: "hidden" });
      gsap
        .timeline({
          onComplete: () => (this.isAnimating = false),
        })
        .set(this.DOM.overlayPath, {
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
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
          },
          ">-=0.5"
        );
    });
  }
}
