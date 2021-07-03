import { showFullPicture } from '../listeners/users-pictures.js';
import { addErrorMessage } from './messages.js';

const URL_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const ACTIVE_CLASS = 'img-filters__button--active';
const STATUS_OK = 200;
const TYPE_JSON = 'json';

const imgFilters = document.querySelector('.img-filters');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
let photos;

/* Загрузка фотографий других пользователей:
добавление фотографий других пользователей на главнй экран  */
const addImgInDocument = (currentPhotos) => {
  setTimeout(() => {
    const containerElement = document.querySelector('.pictures');
    const templateElement = document.querySelector('#picture');
    const elementElement = templateElement.content.querySelector('.picture');

    while (containerElement.querySelector('A')) {
      containerElement.removeChild(containerElement.querySelector('A'));
    }

    for (let index = 0; index < currentPhotos.length; index++) {
      const clonedElement = elementElement.cloneNode(true);
      clonedElement.id = currentPhotos[index].id;
      clonedElement.querySelector('.picture__img').src = currentPhotos[index].url;
      clonedElement.querySelector('.picture__img').alt = currentPhotos[index].description;
      clonedElement.querySelector('.picture__comments').textContent = currentPhotos[index].comments.length;
      clonedElement.querySelector('.picture__likes').textContent = currentPhotos[index].likes;

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
  const copyPhotos = photos.slice();
  copyPhotos.sort((a, b) => (a.id - b.id));
  addImgInDocument(copyPhotos);
};

/* Фильтрация:
рандомная фильтрация */
const onRandomFilter = () => {
  removeActiveFilter();
  randomFilter.classList.add(ACTIVE_CLASS);
  randomFilter.disabled = true;
  const copyPhotos = photos.slice();
  copyPhotos.sort(() => Math.random() - 0.5);
  addImgInDocument(copyPhotos);
};

/* Фильтрация:
обсуждаемая фильтрация */
const onDiscussedFilter = () => {
  removeActiveFilter();
  discussedFilter.classList.add(ACTIVE_CLASS);
  discussedFilter.disabled = true;
  const copyPhotos = photos.slice();
  copyPhotos.sort((a, b) => (b.comments.length - a.comments.length));
  addImgInDocument(copyPhotos);
};

/* Фильтрация:
включаем фильтрацию */
const showFilterUsersPictures = () => {
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

      addImgInDocument(photos);
      showFullPicture();
      showFilterUsersPictures();
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
