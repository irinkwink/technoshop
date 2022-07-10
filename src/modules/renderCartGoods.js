import {API_URL} from "./var";

export const renderCartGoods = (wrapper, goods, cartGoods) => {
  wrapper.textContent = '';

  if (!goods.length) {
    wrapper.innerHTML = '<h2 class="cart-goods__message">В корзине  пока нет товаров</h2>'
  }

  const cards = goods.map(item => {
    const li = document.createElement('li');
    li.className = 'cart-goods__item item';

    li.innerHTML = `
      <img class="item__img"
           src="${API_URL}${item.images.present}"
           alt="${item.title}" >
      <div class="item__detail">
        <h4 class="item__title">${item.title}</h4>
        <p class="item__vendor-code">Артикул: ${item.id}</p>
      </div>

      <div class="item__control">
        <div class="item__count">
          <button class="item__btn item__btn_dec">–</button>
          <output class="item__number">1</output>
          <button class="item__btn item__btn_inc">+</button>
        </div>

        <p class="item__price">${item.price} ₽</p>
        <button class="item__remove-cart" >
          <svg>
            <use href="#remove"></use>
          </svg>
        </button>
      </div>
    `;

    return li;
  })

  wrapper.append(...cards);
}
