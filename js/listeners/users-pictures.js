import { PHOTOS } from '../main.js';
const ESCAPE = 27;

//TODO: Будут использоваться в других методах
const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('img');
const bigImgLikesElement = document.querySelector('.likes-count');
const bigImgInfoElement = document.querySelector('.social__header');

const commentsListCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');

const closeBigImgButtonElement = document.querySelector('#picture-cancel');

let maxCommentsCount = 5; //TODO: Будет меняться. По ТЗ должно показываться изначально 5 комментариев, потом загружаться по +5

/* Просмотр фотографии:
закрытие модалки */
const closeModal = (evt) => {
  if (evt.keyCode === ESCAPE || evt.keyCode === undefined) {
    if (!bigPictureElement.classList.contains('.hidden')) {
      bigPictureElement.classList.add('hidden');
      document.body.classList.remove('modal-open');
      maxCommentsCount = 5;

      closeBigImgButtonElement.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
    }
  }
};


/* Просмотр фотографии:
добавление комментариев других пользователей */
const loadCommentsForBigPicture = (comments) => {
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
};


/* Просмотр фотографии:
открытие большой фотографии */
const openBigPicture = (evt) => {

  const values = PHOTOS[evt.currentTarget.getAttribute('id')];

  document.body.classList.add('modal-open');

  bigPictureElement.classList.remove('hidden');
  bigImgElement.src = values.url;
  bigImgElement.alt = values.description;
  bigImgLikesElement.textContent = values.likes;
  bigImgInfoElement.querySelector('.social__caption').textContent = values.description;

  loadCommentsForBigPicture(values.comments);

  //add Listeners
  closeBigImgButtonElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);

};


const showFullPicture = (picture) => {
  picture.addEventListener('click', openBigPicture);
};


export { showFullPicture };
