import {API_URI} from "./var";
import Swiper, {Scrollbar, Thumbs} from "swiper";

const createCardImageSlider = (largeImages) => {
  const ul = document.createElement('ul');
  ul.className = 'swiper-wrapper';

  const cardImageSlides = largeImages.map(url => {
    const li = document.createElement('li');
    li.className = 'swiper-slide';
    const img = new Image();
    img.src = `${API_URI}${url}`;
    li.append(img);
    return li
  })

  ul.append(...cardImageSlides);
  return ul;
}

const createCardImageThumbsSlider = (smallImages) => {
  const ul = document.createElement('ul');
  ul.className = 'swiper-wrapper card__thumbs';

  const cardImageSlides = smallImages.map(url => {
    const li = document.createElement('li');
    li.className = 'swiper-slide card__thumb';
    const img = new Image();
    img.src = `${API_URI}${url}`;
    li.append(img);
    return li
  })

  ul.append(...cardImageSlides);
  return ul;
}

const createParams = (params) => {
  const list = [];
  for (const key in params) {
    const li = document.createElement('li');
    li.className = 'card__params-item';
    li.innerHTML = `
      <span className="card__params-title">${key}:</span>
      <span className="card__params-value">${params[key]}</span>
    `;
    list.push(li)
  }
  return list;
}


const createDescription = (description) => {
  return description.map(item => {
    const p = document.createElement('p');
    p.innerHTML = item;
    return p;
  });
}

export const renderItem = (item) => {

  const cardImage = document.querySelector('.card__image');

  cardImage.append(createCardImageSlider(item.images.large));

  const cardSliderThumb = document.querySelector('.card__slider-thumb');

  if (item.images.small.length > 1) {
    const swiperScrollbar = document.createElement('div');
    swiperScrollbar.className = 'swiper-scrollbar';

    cardSliderThumb.append(createCardImageThumbsSlider(item.images.small), swiperScrollbar);

    const thumbSlider = new Swiper(cardSliderThumb, {
      spaceBetween: 15,
      slidesPerView: 3,

      breakpoints: {
        560: {
          spaceBetween: 20,
        },
        960: {
          spaceBetween: 27,
        },
        1200: {
          spaceBetween: 44,
        },
      },

      scrollbar: {
        el: swiperScrollbar,
        draggable: true,
      },
      modules: [Scrollbar]
    });

    const imageSlider = new Swiper(cardImage, {
      spaceBetween: 10,
      slidesPerView: 1,
      thumbs: {
        swiper: thumbSlider,
        slideThumbActiveClass: 'card__thumb_active',
      },
      modules: [Thumbs],
    });

  } else {
    cardSliderThumb.remove();
  }

  const cardTitle = document.querySelector('.card__title');
  cardTitle.textContent = item.title;

  const cardVendorCode = document.querySelector('.card__vendor-code');
  cardVendorCode.textContent = `Артикул: ${item.id}`;

  const cardPrice = document.querySelector('.card__price');
  cardPrice.textContent = new Intl.NumberFormat('ru-Ru', {
    style: 'currency', currency: 'RUB', maximumFractionDigits: 0,
  }).format(item.price)

  const cardAddCart = document.querySelector('.card__add-cart');
  cardAddCart.dataset.idGoods = item.id;

  const cardParamsList = document.querySelector('.card__params-list');
  cardParamsList.append(...createParams(item.characteristic));

  const cardDescriptionText = document.querySelector('.card__description-text');
  cardDescriptionText.append(...createDescription(item.description));



}


