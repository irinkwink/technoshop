import {API_URL} from "./var";

export const getGoods = () => {
  const pageURL = new URL(location);

  const url = new URL(`${API_URL}api/goods`);

  for (const [name, value] of pageURL.searchParams.entries()) {
    url.searchParams.set(name, value);
  }

  return fetch(url).then(response => response.json())
}

export const getGoodsItem = (id) =>
  fetch(`${API_URL}api/goods/${id}`)
    .then(response => response.json());


export const getCategory = () =>
  fetch(`${API_URL}api/category`)
    .then(response => response.json())


export const getCartGoods = (cartGoods) => {
  let value = [];

  for (const cartGoodsKey in cartGoods) {
    value.push(cartGoodsKey);
  }

  const url = new URL(`${API_URL}api/goods`);
  url.searchParams.set('list', value);

  return fetch(url).then(response => response.json())
}
