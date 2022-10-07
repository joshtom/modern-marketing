/**
 * Class representing a hero item (.hero__title).
 */
export class heroItem {
  // DOM elements
  DOM = {
    heading: null,
    char: null,
    moresection: null,
    workhero: null,
    workherotext: null,
    card: null,
    accordionItems: null,
    workImgWrapper: null,
    workImg: null,
    workAccordion: null,
    workHeader: null,
    loader: {
      loaderText: null,
    },
  };

  constructor() {
    this.DOM.heading = document.querySelector(".hero__title");
    this.DOM.char = document.querySelectorAll("span.char");
    this.DOM.moresection = document.querySelectorAll(".hero__more--section");
    this.DOM.workhero = document.querySelector("#work-hero");
    this.DOM.workherotext = document.querySelector("#work-hero-text");
    this.DOM.card = document.querySelectorAll(".card");
    this.DOM.accordionItems = document.querySelectorAll(".work__section--list");
    this.DOM.workImgWrapper = document.querySelector(".work__section--image");
    this.DOM.workImg = document.querySelector(".work__section--image img");
    this.DOM.workAccordion = document.querySelectorAll(".work__section--list");
    this.DOM.workHeader = document.querySelector(".work__header");
  }
}
