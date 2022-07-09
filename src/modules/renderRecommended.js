import {API_URL} from "./var";
import Swiper, {Scrollbar} from "swiper";


const createRecommendedSlider = (data, id) => {
  const ul = document.createElement('ul');
  ul.className = 'swiper-wrapper recommended__thumbs';

  const recommendedSlides = data.map(item => {
    if (id != item.id) {
      const li = document.createElement('li');
      li.className = 'swiper-slide';
      li.innerHTML = `
      <article class="goods-item">
                <a href="card.html?id=${item.id}" class="goods-item__link">
                  <img  class="goods-item__image"
                    src="${API_URL}${item.images.present}"
                    alt="${item.title}"
                    width="340"
                    height="340">
                  <h3 class="goods-item__title">${item.title}</h3>
                </a>

                <div class="goods-item__buy">
                  <p class="goods-item__price">${item.price} ₽</p>
                  <button class="goods-item__to-cart" data-id-goods="${item.id}">В корзину</button>
                </div>
    </article>
    `
      return li
    }
    return ''
  });

  ul.append(...recommendedSlides);
  return ul;
}


export const renderRecommended = (data) => {
  const pageURL = new URL(location);
  const id = +pageURL.searchParams.get('id');

  const recommendedSlider = document.querySelector('.recommended__slider');

  const swiperScrollbar = document.createElement('div');
  swiperScrollbar.className = 'swiper-scrollbar';

  recommendedSlider.append(createRecommendedSlider(data, id), swiperScrollbar);


  const swiper3 = new Swiper(recommendedSlider, {
    spaceBetween: 2,
    slidesPerView: 10,

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      560: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1600: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    },

    scrollbar: {
      el: swiperScrollbar,
      draggable: true,
    },
    modules: [Scrollbar]
  });
}


