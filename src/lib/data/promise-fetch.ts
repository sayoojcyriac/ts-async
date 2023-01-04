import axios, { AxiosResponse, AxiosError } from "axios";
import { Order, Callback, CallbackError, Hero, AccountRep } from "./interfaces";
import { apiUrl, parseList } from "./api-utils";

const getHeroTreePromise = function (searchEmail: string) {
  let hero: Hero;

  return getHeroPromise(searchEmail)
    .then((h: Hero) => {
      hero = h;
      throw new Error("Oh! No! not allowed!!");
      //return hero;
    })
    .then((hero: Hero) =>
      Promise.all([getOrderPromise(hero.id), getAccountRepPromise(hero.id)])
    )
    .then((result: [Order[], AccountRep[]]) => mergeData(result));

  function mergeData(result: [Order[], AccountRep[]]): Hero {
    const [orders, accountreps] = result;
    if (orders) {
      hero.orders = orders;
    }

    if (accountreps) {
      hero.accountRep = accountreps[0];
    }

    return hero;
  }
};

const getHeroPromise = (email: string): Promise<Hero> => {
  return axios
    .get<Hero[]>(`${apiUrl}/heroes?email=${email}`)
    .then((response: AxiosResponse<Hero[]>) => {
      const data = parseList<Hero>(response);
      const hero = data[0];
      return hero;
    })
    .catch((error: AxiosError) => handleErrors(error, "Heros"));
};

const getOrderPromise = function (heroId: number): Promise<Order[]> {
  return axios
    .get<Order[]>(`${apiUrl}/orders/${heroId}`)
    .then((response: AxiosResponse<Order[]>) => parseList<Order>(response))
    .catch((error: AxiosError) => handleErrors(error, "Orders"));
};

const getAccountRepPromise = function (heroId: number): Promise<AccountRep[]> {
  return axios
    .get<AccountRep[]>(`${apiUrl}/accountreps/${heroId}`)
    .then((response: AxiosResponse<AccountRep[]>) =>
      parseList<AccountRep>(response)
    )
    .catch((error: AxiosError) => handleErrors(error, "AccountRep"));
};

function handleErrors(error: AxiosError, operation: string) {
  console.error(`Async data fetch error: ${error.message}`);
  //throw new Error("Oh! No! Something is bad!");
  return Promise.reject(`Error occurred while fetching the ${operation}`);
}

export { getHeroTreePromise };
