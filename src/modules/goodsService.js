import {API_URL} from "./var";

export const getGoods = ({page}) => {
  const url = new URL(`${API_URL}api/goods`)

  if (page) url.searchParams.append('page', page);

  return fetch(url).then(response => response.json())
}
