import "./design/index.scss";

import { getIngredientsAfterDelay } from "./examples/get-ingredients";

import { showMessage } from "./lib/dom";

console.log("Hello TS Async...");

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
