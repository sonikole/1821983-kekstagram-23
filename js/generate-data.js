import { showFullPicture } from './listeners.js';

/* Функция для добавлении фотографий других пользователей на главнй экран */
const generateUsersPictures = (photos) => {

  const containerElement = document.querySelector('.pictures');
  const templateElement = document.querySelector('#picture');
  const elementElement = templateElement.content.querySelector('.picture');

  for (let index = 0; index < photos.length; index++) {
    const clonedElement = elementElement.cloneNode(true);
    clonedElement.id = index; //TODO: Чтобы ориентироваться в шаблонах, добавляю id фотографии
    clonedElement.querySelector('.picture__img').src = photos[index].url;
    clonedElement.querySelector('.picture__img').alt = photos[index].description;
    clonedElement.querySelector('.picture__comments').textContent = photos[index].comments.length;
    clonedElement.querySelector('.picture__likes').textContent = photos[index].likes;
    showFullPicture(clonedElement);
    containerElement.appendChild(clonedElement);
  }
};

export { generateUsersPictures };
