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
    card: null,
    accordionItems: null,
    workImgWrapper: null,
    workImg: null,
    workAccordion: null,
  };

  constructor() {
    this.DOM.heading = document.querySelector(".hero__title");
    this.DOM.char = document.querySelector("span.char");
    this.DOM.moresection = document.querySelectorAll(".hero__more--section");
    this.DOM.workhero = document.querySelectorAll("#work-hero");
    this.DOM.card = document.querySelectorAll(".card");
    this.DOM.accordionItems = document.querySelectorAll(".work__section--list");
    this.DOM.workImgWrapper = document.querySelector(".work__section--image");
    this.DOM.workImg = document.querySelector(".work__section--image img");
    this.DOM.workAccordion = document.querySelectorAll(".work__section--list");
  }
}
