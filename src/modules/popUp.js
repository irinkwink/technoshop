import {hideOverlay, showOverlay} from "./overlay";

const popUp = document.createElement('div');

export const showPopUp = (state) => {
 const overlay = showOverlay();
 document.body.classList.add('hidden');
 popUp.className = 'pop-up';

 if (state === 'ok') {
   popUp.innerHTML = `
    <p class="pop-up__title">Ваш заказ успешно отправлен</p>
    <p class="pop-up__description">Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</p>
    <div class="pop-up__img pop-up__img_ok"></div>
 `;
 } else {
   popUp.innerHTML = `
    <p class="pop-up__title">Упс... Что-то пошло не так</p>
    <p class="pop-up__description">Не удалось отправить заказ. Пожалуйста, повторите отправку еще раз</p>
    <div class="pop-up__img pop-up__img_error"></div>
 `;
 }

 overlay.append(popUp);

 popUp.addEventListener('click', () => {
   hideOverlay();
   document.body.classList.remove('hidden');
 })
}

