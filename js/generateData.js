import { showFullPicture } from './listeners.js';

/* Функция для добавлении фотографий других пользователей на главнй экран */
const generateUsersPictures = (photos) => {

  const template = document.getElementById('picture');
  const element = template.content.querySelector('.picture');
  const container = document.querySelector('.pictures');

  for (let index = 0; index < photos.length; index++) {
    const clonedElement = element.cloneNode(true);
    clonedElement.id = index; //TODO: Чтобы ориентироваться в шаблонах, добавляю id фотографии
    clonedElement.querySelector('.picture__img').src = photos[index].url;
    clonedElement.querySelector('.picture__img').alt = photos[index].description;
    clonedElement.querySelector('.picture__comments').textContent = photos[index].comments.length;
    clonedElement.querySelector('.picture__likes').textContent = photos[index].likes;
    showFullPicture(clonedElement);
    container.appendChild(clonedElement);
  }
};

export { generateUsersPictures };
