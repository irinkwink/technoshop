import {showPopUp} from "./popUp";

export const toggleSubmitButton = () => {
  const submitButton = document.querySelector('.total__submit');
  submitButton.classList.toggle('total__submit_inactive');
}

export const cartSubmitOrder = () => {
  const cartSubmit = document.querySelector('.total__order');

  cartSubmit.addEventListener('submit', (e) => {
    e.preventDefault();

    const cartGoods = localStorage.getItem('cart-ts') ?
      JSON.parse(localStorage.getItem('cart-ts')) :
      {};

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Order',
        body: cartGoods,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        showPopUp('ok');
        localStorage.removeItem('cart-ts');
        console.log(localStorage)
        return console.log(json)
      });


  })
}
