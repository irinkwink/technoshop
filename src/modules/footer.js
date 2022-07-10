import {getCategory} from "./goodsService";

export const footerCategory = () => {
  const category = document.getElementById('footer-category');

  const url = new URL(location.origin);

  getCategory().then(categoryList => {
    for (const categoryListKey in categoryList) {
      url.searchParams.set('category', categoryListKey);

      const li = document.createElement('li');
      li.className = 'footer__item';
      li.innerHTML = `
        <a href="${url}" className="footer__link">${categoryList[categoryListKey]}</a>
      `
      category.append(li);
    }
  })
}

// <li className="footer__item">
//   <a href="#" className="footer__link">Смартфоны</a>
// </li>
