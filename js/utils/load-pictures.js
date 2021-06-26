
const REQUEST_URL = 'https://23.javascript.pages.academy/kekstagram/data';
let photos;

/* Функция для добавления фотографий других пользователей на главный экран */
const loadUsersPictures = () => {
  const request = new XMLHttpRequest();
  request.open('GET', REQUEST_URL); request.responseType = 'json';
  request.send();
  request.onload = function () {
    photos = request.response;
    const containerElement = document.querySelector('.pictures');
    const templateElement = document.querySelector('#picture');
    const elementElement = templateElement.content.querySelector('.picture');

    for (let index = 0; index < photos.length; index++) {
      const clonedElement = elementElement.cloneNode(true);
      clonedElement.id = photos[index].id;
      clonedElement.querySelector('.picture__img').src = photos[index].url;
      clonedElement.querySelector('.picture__img').alt = photos[index].description;
      clonedElement.querySelector('.picture__comments').textContent = photos[index].comments.length;
      clonedElement.querySelector('.picture__likes').textContent = photos[index].likes;

      containerElement.appendChild(clonedElement);
    }
  };
};

export { loadUsersPictures, photos };
