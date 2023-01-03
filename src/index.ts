import "./design/index.scss";

import { getIngredientsAfterDelay } from "./examples/get-ingredients";
import { replaceHeroListComponent, showFetching, showMessage } from "./lib/dom";
import { getHeroTreeCallback } from "./lib/data/callback";
import { Hero } from "./lib/data/interfaces";

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

  getHeroTreeCallback(
    searchEmailElement.value,
    function (hero: Hero) {
      replaceHeroListComponent(hero);
    },
    (errorMsg: string) => {
      console.log(errorMsg);
      showMessage(errorMsg);
      replaceHeroListComponent();
    }
  );
}
