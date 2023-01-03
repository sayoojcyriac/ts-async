import axios, { AxiosResponse, AxiosError } from "axios";
import { Order, Callback, CallbackError, Hero, AccountRep } from "./interfaces";
import { apiUrl, parseList } from "./api-utils";

const getHeroTreeCallback = function (
  email: string,
  callback: Callback<Hero>,
  callbackError?: CallbackError
) {
  getHeroCallback(
    email,
    (hero) => {
      getOrdersCallback(
        hero.id,
        (orders) => {
          hero.orders = orders;

          getAccountRepCallback(
            hero.id,
            (accountRep) => {
              hero.accountRep = accountRep;
              callback(hero);
            },
            (error) => callbackError(error)
          );
        },
        (error) => callbackError(error)
      );
    },
    (error) => callbackError(error)
  );
};

const getHeroCallback = function (
  email: string,
  callback: Callback<Hero>,
  callbackError?: CallbackError
) {
  axios
    .get<Hero[]>(`${apiUrl}/heroes?email=${email}`)
    .then((response: AxiosResponse<Hero[]>) => {
      const data = parseList<Hero>(response);
      const hero = data[0];
      callback(hero);
    })
    .catch((error: AxiosError) => {
      console.error(`Async data error: ${error.message}`);
      callbackError(`Error occurred while fetching the Hero`);
    });
};

const getOrdersCallback = function (
  heroId: number,
  callback: Callback<Order[]>,
  callbackError?: CallbackError
) {
  const url = heroId ? `${apiUrl}/orders/${heroId}` : `${apiUrl}/orders`;
  axios
    .get(url)
    .then((response: AxiosResponse<Order[]>) => {
      const orders = parseList<Order>(response);
      callback(orders);
    })
    .catch((error: AxiosError) => {
      console.error(`Async data error: ${error.message}`);
      callbackError(`Error occurred while fetching the Orders`);
    });
};

const getAccountRepCallback = function (
  heroId: number,
  callback: Callback<AccountRep>,
  callbackError?: CallbackError
) {
  const url = `${apiUrl}/accountreps/${heroId}`;
  axios
    .get(url)
    .then((reponse: AxiosResponse<AccountRep>) => {
      const accountreps = parseList<AccountRep>(reponse);
      const accountRep = accountreps[0];
      callback(accountRep);
    })
    .catch((error: AxiosError) => {
      console.error(`Async data error: ${error.message}`);
      callbackError(`Error occurred while fetching the AccountRep`);
    });
};

export { getHeroTreeCallback };
