import Swiper, {Thumbs, Scrollbar, Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import './index.html';
import './cart.html';
import './card.html';
import './index.scss';

const thumbSlider = new Swiper('.card__slider-thumb', {
  spaceBetween: 40,
  slidesPerView: 3,
  // centeredSlides: true,
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  modules: [Scrollbar]
});

const swiper1 = new Swiper('.card__image', {
  spaceBetween: 10,
  slidesPerView: 1,
  thumbs: {
    swiper: thumbSlider,
    slideThumbActiveClass: 'card__thumb_active',
  },
  modules: [Thumbs],
});

const swiper3 = new Swiper('.recommended__slider', {
  spaceBetween: 30,
  slidesPerView: 5,
  centerInsufficientSlides: true,
  centeredSlides: true,
  centeredSlidesBounds: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  modules: [Navigation],
});
