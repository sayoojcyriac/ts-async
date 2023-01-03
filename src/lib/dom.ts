import { Hero } from "./data/interfaces";

export function getText(
  element: DocumentFragment | HTMLElement,
  selector: string
) {
  return element.querySelector(selector)!.textContent;
}

export function setText(
  element: DocumentFragment | HTMLElement,
  selector: string,
  text: string
) {
  element.querySelector(selector)!.textContent = text.toString();
  return element;
}

export function showMessage(text = "", title = "Info", append = false) {
  const element = document.getElementById("message-box") as any;

  // post non-null assertion operator
  element!.style.visibility = !!text ? "visible" : "hidden";

  let newText = text;
  if (append) {
    let oldText = getText(element, ".message-body");
    newText = `${oldText}\r\n${text}`;
  }

  setText(element, ".message-body", title);
  setText(element, ".message-body", newText);
}

export function showFetching(selector: string) {
  const progressClone = cloneElementsFromTemplate("progress-template");
  const heroPlaceHolder = document.querySelector(selector);
  heroPlaceHolder.replaceWith(progressClone);
}

export function cloneElementsFromTemplate(templateName: string) {
  const template = document.getElementById(templateName) as HTMLTemplateElement;
  const clone = document.importNode(template.content, true);
  return clone;
}

export function replaceHeroListComponent(hero?: Hero) {
  const heroPlaceholder = document.querySelector(".hero-list");
  const el = hero ? createList() : createNoneFound();

  heroPlaceholder.replaceWith(el);

  function createList() {
    const ul = document.createElement("ul");
    ul.classList.add("list", "hero-list");
    ul.appendChild(createHeroCardFromTemplate(hero));
    return ul;
  }

  function createNoneFound() {
    const div = createDiv("hero-list");
    div.innerText = "No heroes found";
    return div;
  }
}

/**
 * Code below here are private functions to this module
 * that support the replaceHeroListComponent function.
 **/

function createHeroCardFromTemplate(hero: Hero) {
  const heroClone = cloneElementsFromTemplate("hero-template");
  setText(heroClone, ".description", hero.description);
  setText(heroClone, ".name", hero.name);
  setText(heroClone, ".email", hero.email);
  heroClone.querySelector(".card").classList.add(hero.name);
  return heroClone;
}

export const createDiv = (...classList: string[]) => {
  const el = document.createElement("div");
  el.classList.add(...classList);
  return el;
};
