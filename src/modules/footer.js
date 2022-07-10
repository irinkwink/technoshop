import {getCategory} from "./goodsService";

export const footerCategory = () => {
  const category = document.getElementById('footer-category');

  getCategory().then(categoryList => {
    for (const categoryListKey in categoryList) {
      const li = document.createElement('li');
      li.className = 'footer__item';
      li.innerHTML = `
        <a href="#" className="footer__link">${categoryList[categoryListKey]}</a>
      `
      category.append(li);
    }
  })
}

// <li className="footer__item">
//   <a href="#" className="footer__link">Смартфоны</a>
// </li>
