import "./design/index.scss";

import { getIngredientsAfterDelay } from "./examples/get-ingredients";
import {
  replaceHeroListComponent,
  showFetching,
  showFetching2,
  showMessage,
} from "./lib/dom";
import { getHeroTreeCallback } from "./lib/data/callback";
import { getHeroTreePromise } from "./lib/data/promise-fetch";
import { Hero } from "./lib/data/interfaces";
import {
  getHeroesViaNewPromise,
  getHeroesViaPromise,
  getHeroesViaPromiseRejectShorter,
} from "./examples/promise";
import { heroes } from "./examples/heroes";

console.log("Hello TS Async...");

/**
 * Search Email
 */
const searchEmailElement = document.getElementById(
  "search-email"
) as HTMLInputElement;
const searchButton = document.querySelector(".search-button");
searchEmailElement.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.code === "Enter") {
    render();
  }
});
searchButton.addEventListener("click", render);

/**
 * Show Ingredients
 *
 * Call a callback function
 * Create a callback function
 */
document
  .querySelector("#show-ingredients")!
  .addEventListener("click", getIngredients);

document
  .getElementById("resolved-promise")
  .addEventListener("click", resolvedPromise);

document
  .getElementById("resolved-using-promise-ctor")
  .addEventListener("click", resolvedUsingPromiseConstructor);

document
  .getElementById("rejected-promise")
  .addEventListener("click", rejectedPromise);

document
  .getElementById("rejected-promise-shorter")
  .addEventListener("click", rejectedPromiseShorter);

function wrapUp() {
  showFetching2(false);
}

function resolvedPromise() {
  showFetching2();
  showMessage();

  getHeroesViaPromise().then(showHeros).finally(wrapUp);
}

function showHeros(heroes: Hero[]) {
  console.table(heroes);
  showMessage(`Returned ${heroes.length} heroes`);
  heroes.forEach((hero) => showMessage(JSON.stringify(hero), "heroes", true));
}

function resolvedUsingPromiseConstructor() {
  showFetching2();
  showMessage();

  getHeroesViaNewPromise().then(showHeros).finally(wrapUp);
}

function rejectedPromise() {}

function rejectedPromiseShorter() {
  showFetching2();
  showMessage();

  getHeroesViaPromiseRejectShorter()
    .then(showHeros)
    .catch(handleErrors)
    .finally(wrapUp);
}

function handleErrors(error: any) {
  console.error("Oh no! rejected promise!");
  console.error(error);
  showMessage(`Something bad happened`, "Error");
}

function getIngredients() {
  showMessage("Ingredients for baking amazing cookies:", "Ingredients");

  getIngredientsAfterDelay(1500, showIngredients);

  function showIngredients(ingredients: string[]) {
    ingredients.forEach((ingredient) => {
      showMessage(` ${ingredient}`, "Ingredients", true);
    });
  }
}

/**
 * Render the heros list
 */
async function render() {
  showMessage();
  showFetching(".hero-list");

  // Callback way!!!
  /*getHeroTreeCallback(
    searchEmailElement.value,
    function (hero: Hero) {
      replaceHeroListComponent(hero);
    },
    (errorMsg: string) => {
      console.log(errorMsg);
      showMessage(errorMsg);
      replaceHeroListComponent();
    }
  );*/

  // Promise Way!!!!
  getHeroTreePromise(searchEmailElement.value)
    .then((hero: Hero) => replaceHeroListComponent(hero))
    .catch((error: any) => {
      console.log(error);
      showMessage(error);
      replaceHeroListComponent();
    })
    .finally(wrapUp);
}
