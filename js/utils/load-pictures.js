import { showFullPicture } from '../listeners/users-pictures.js';

const URL_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const ACTIVE_CLASS = 'img-filters__button--active';
const STATUS_OK = 200;
const TYPE_JSON = 'json';

const imgFilters = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
let photos;

/* Оповещение:
неуспешная загрузка фотографий с сервера  */
const addErrorMessage = (errorMessage, buttonMessage) => {
  const templateErrorElement = document.querySelector('#error');
  const elementElement = templateErrorElement.content.querySelector('.error');
  const clonedElement = elementElement.cloneNode(true);
  clonedElement.querySelector('.error__title').innerText = errorMessage;
  clonedElement.querySelector('.error__button').textContent = buttonMessage;
  document.body.appendChild(clonedElement);

  const errorButtonElement = document.querySelector('.error__button');

  errorButtonElement.addEventListener('click', () => {
    document.body.removeChild(clonedElement);
  }, { once: true });
};

/* Загрузка фотографий других пользователей:
добавление фотографий других пользователей на главнй экран  */
const addImgInDocument = () => {
  setTimeout(() => {
    const containerElement = document.querySelector('.pictures');
    const templateElement = document.querySelector('#picture');
    const elementElement = templateElement.content.querySelector('.picture');

    while (containerElement.querySelector('A')) {
      containerElement.removeChild(containerElement.querySelector('A'));
    }

    for (let index = 0; index < photos.length; index++) {
      const clonedElement = elementElement.cloneNode(true);
      clonedElement.id = photos[index].id;
      clonedElement.querySelector('.picture__img').src = photos[index].url;
      clonedElement.querySelector('.picture__img').alt = photos[index].description;
      clonedElement.querySelector('.picture__comments').textContent = photos[index].comments.length;
      clonedElement.querySelector('.picture__likes').textContent = photos[index].likes;

      containerElement.appendChild(clonedElement);
    }
  }, 500);
};

/* Фильтрация:
очистка активной фильтрации при переключении */
const removeActiveFilter = () => {
  imgFilters.querySelector(`.${ACTIVE_CLASS}`).disabled = false;
  imgFilters.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
};

/* Фильтрация:
дефолтная фильтрация */
const onDefaultFilter = () => {
  removeActiveFilter();
  defaultFilter.classList.add(ACTIVE_CLASS);
  defaultFilter.disabled = true;
  photos.sort((a, b) => (a.id - b.id));
  addImgInDocument();
};

/* Фильтрация:
рандомная фильтрация */
const onRandomFilter = () => {
  removeActiveFilter();
  randomFilter.classList.add(ACTIVE_CLASS);
  randomFilter.disabled = true;
  photos.sort(() => Math.random() - 0.5);
  addImgInDocument();
};

/* Фильтрация:
обсуждаемая фильтрация */
const onDiscussedFilter = () => {
  removeActiveFilter();
  discussedFilter.classList.add(ACTIVE_CLASS);
  discussedFilter.disabled = true;
  photos.sort((a, b) => (b.comments.length - a.comments.length));
  addImgInDocument();
};

/* Фильтрация:
включаем фильтрацию */
const filterUsersPictures = () => {
  imgFilters.classList.remove('img-filters--inactive');

  defaultFilter.addEventListener('click', onDefaultFilter);
  randomFilter.addEventListener('click', onRandomFilter);
  discussedFilter.addEventListener('click', onDiscussedFilter);
};

/* Загрузка фотографий других пользователей:
запрос к серверу сервера  */
const loadUsersPictures = () => {
  const request = new XMLHttpRequest();

  request.open('GET', URL_DATA);
  request.responseType = TYPE_JSON;

  request.addEventListener('load', () => {
    if (request.status === STATUS_OK) {
      photos = request.response;

      addImgInDocument();
      showFullPicture();
      filterUsersPictures();
    }
    else {
      const errorMessage = 'Ошибка запроса:\nНевозможно загрузить данные.\nПовторите попытку позже или обратитесь в техническую поддержку';
      const buttonMessage = 'Понятненько';
      addErrorMessage(errorMessage, buttonMessage);
    }
  });

  request.send();
};

export { loadUsersPictures, photos };
