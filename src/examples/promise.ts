import { heroes } from "./heroes";
import { Hero } from "../lib";

const delay: (ms: number) => Promise<void> = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getHeroesAsync: () => Promise<Hero[]> = () =>
  new Promise<Hero[]>((resolve) => resolve(heroes));

const getHeroesEmpty = () => Promise.resolve([]);

/**
 * Get the heroes via a Promise
 * @returns
 */
export const getHeroesViaPromise = function () {
  return delay(1000).then(() => getHeroesAsync());
};

export const getHeroesViaNewPromise: () => Promise<Hero[]> = function () {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    delay(1000)
      .then(() => getHeroesAsync())
      .then((heros: Hero[]) => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error("Oh! errors encountered"));
        }
      });
  });

  return newPromise;
};

export const getHeroesViaPromiseRejectShorter: () => Promise<Hero[]> =
  function () {
    const getHeroesOrDoesIt = () =>
      Promise.reject("bad error occurred getting the heroes");

    return delay(1000).then(getHeroesOrDoesIt);
  };
