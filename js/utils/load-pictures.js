
const REQUEST_URL = 'https://23.javascript.pages.academy/kekstagram/data';
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

/* Загрузка фотографий других пользователей:
запрос к серверу сервера  */
const loadUsersPictures = () => {
  const request = new XMLHttpRequest();
  request.open('GET', REQUEST_URL); request.responseType = 'json';
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      photos = request.response;
      addImgInDocument();
    }
    else {
      const errorMessage = 'Ошибка запроса:\nНевозможно загрузить данные.\nПовторите попытку позже или обратитесь в техническую поддержку';
      const buttonMessage = 'Понятненько';
      addErrorMessage(errorMessage, buttonMessage);
    }
  };
};

export { loadUsersPictures, photos };
