import {getCategory, getGoods} from "./goodsService";
import {renderGoods} from "./renderGoods";
import {startPagination} from "./pagination";
import {hideOverlay, showOverlay} from "./overlay";

const toggleFilter = (filter, catalogFilterBtn, filterTitle) => {
  catalogFilterBtn.addEventListener('click', () => {
    filter.classList.add('filter_show');
    showOverlay();
  });

  filterTitle.addEventListener('click', () => {
    filter.classList.remove('filter_show');
    hideOverlay();
  });
}

export const filter = (goodsList, paginationWrapper) => {
  const filter = document.querySelector('.filter');

  const catalogFilterBtn = document.querySelector('.catalog__filter-btn');

  const filterTitle = document.querySelector('.filter__title');

  const category = document.getElementById('category');

  toggleFilter(filter, catalogFilterBtn, filterTitle);

  getCategory().then(categoryList => {
    for (const categoryListKey in categoryList) {
      const option = document.createElement('option');
      option.value = categoryListKey;
      option.textContent = categoryList[categoryListKey];
      category.append(option);
    }
  });

  const filterForm = document.querySelector('.filter__form');

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkboxes = new Set();

    [...filterForm.elements].forEach(elem => {
      if (elem.type === 'checkbox') {
        checkboxes.add(elem.name)
      }
    })

    const data = {};

    const formData = new FormData(filterForm); //e.target

    for (const [name, value] of formData) {

      if (!value) continue;

      if (checkboxes.has(name)) {
        if (Array.isArray(data[name])) {
          data[name].push(value);
        } else {
          data[name] = [value];
        }
      } else {
        data[name] = value;
      }
    }

    goodsList.innerHTML = `
    <div class="goods__preload">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M91.82 28.18L84.75 35.25C79.0246 29.524 71.4908 25.9603 63.4325 25.1662C55.3741 24.3721 47.2897 26.3966 40.5567 30.8949C33.8237 35.3932 28.8587 42.0869 26.5077 49.8355C24.1567 57.5841 24.5651 65.9082 27.6634 73.3894C30.7617 80.8706 36.3581 87.0461 43.4991 90.8637C50.6402 94.6812 58.884 95.9046 66.8259 94.3254C74.7678 92.7462 81.9165 88.4621 87.0538 82.2031C92.1912 75.9441 94.9994 68.0974 95 60H105C105 70.411 101.39 80.4999 94.7852 88.5476C88.1805 96.5953 78.9897 102.104 68.7787 104.135C58.5678 106.166 47.9685 104.594 38.7869 99.6859C29.6052 94.7781 22.4093 86.8386 18.4253 77.2201C14.4413 67.6015 13.9156 56.8992 16.9378 46.9365C19.96 36.9738 26.3431 28.3673 34.9996 22.5833C43.6561 16.7993 54.0502 14.1958 64.4111 15.2163C74.7719 16.2368 84.4584 20.8183 91.82 28.18V28.18Z" fill="black"/>
       </svg>
    </div>
    `

    const url = new URL(location);

    // ??????????????????????, ???????????????? ???????????? ????????????.
    // ?????????? ???? ?????????????????? ??????????, ?????????? ???????????????????????????????? ??????

    // const search = url.searchParams.get('search');
    // url.search = '';

    for (const key in data) {
      url.searchParams.set(key, data[key]);
    }

    history.pushState(null, null, url);  //????

    getGoods().then(({goods, pages, page}) => {
      hideOverlay();
      filter.classList.remove('filter_show');
      renderGoods(goodsList, goods);
      startPagination(paginationWrapper, pages, page);
    });
  });
}
