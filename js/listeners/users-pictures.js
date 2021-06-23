import { PHOTOS } from '../main.js';
import { isEscEvent } from '../utils.js';

//TODO: Будут использоваться в других методах
const picturesListElement = document.querySelector('.pictures');

const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('img');
const bigImgLikesElement = document.querySelector('.likes-count');
const bigImgDescriptionElement = document.querySelector('.social__caption');
const bigImgCloseButtonElement = document.querySelector('#picture-cancel');

const commentsListCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');

let maxCommentsCount = 5; //TODO: Будет меняться. По ТЗ должно показываться изначально 5 комментариев, потом загружаться по +5


/* Просмотр фотографии:
добавление комментариев других пользователей */
function loadBigImgComments(comments) {
  const count = Object.keys(comments).length;
  const maxCount = count < maxCommentsCount ? count : maxCommentsCount;

  commentsListElement.innerHTML = '';

  //TODO: По ТЗ должна быть реализация. в ДЗ пока выключено
  commentsListCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  for (let index = 0; index < maxCount; index++) {

    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comments[index].avatar;
    img.alt = comments[index].name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comments[index].message;

    li.appendChild(img);
    li.appendChild(p);
    commentsListElement.appendChild(li);
  }
}


/* Просмотр фотографии:
закрытие модалки */
const onCloseModalButton = (evt) => {
  if (isEscEvent(evt) || evt.currentTarget === bigImgCloseButtonElement) {
    if (!bigPictureElement.classList.contains('.hidden')) {
      bigPictureElement.classList.add('hidden');
      document.body.classList.remove('modal-open');
      maxCommentsCount = 5;

      bigImgCloseButtonElement.removeEventListener('click', onCloseModalButton);
      document.removeEventListener('keydown', onCloseModalButton);
    }
  }
};


/* Просмотр фотографии:
открытие большой фотографии */
const onAnotherUserPicture = (picture) => {

  const values = PHOTOS[picture.getAttribute('id')];

  document.body.classList.add('modal-open');

  bigPictureElement.classList.remove('hidden');
  bigImgElement.src = values.url;
  bigImgElement.alt = values.description;
  bigImgLikesElement.textContent = values.likes;
  bigImgDescriptionElement.textContent = values.description;

  loadBigImgComments(values.comments);

  //add Listeners
  bigImgCloseButtonElement.addEventListener('click', onCloseModalButton);
  document.addEventListener('keydown', onCloseModalButton);

};


/* Делегирование:
добавление обработчика не на каждое изображение, а на родителя */
const showFullPicture = () => {
  picturesListElement.addEventListener('click', (evt) => {
    const target = evt.target.parentNode;
    if (target.tagName === 'A') {
      onAnotherUserPicture(target);
    }
  });
};

export { showFullPicture };
