import { PHOTOS } from './main.js';
const ESCAPE = 27;

//TODO: Будут использоваться в других методах
const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('img');
const bigImgLikesElement = document.querySelector('.likes-count');
const bigImgInfoElement = document.querySelector('.social__header');
const commentsListCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');
const closeButtonElement = document.querySelector('#picture-cancel');

//TODO: Будет меняться. По ТЗ должно показываться изначально 5 комментариев, потом загружаться по +5
let maxCommentsCount = 5;

/* Функция для закрытия большой фотографии  */
const closeModalBigImg = () => {
  maxCommentsCount = 5;
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButtonElement.removeEventListener('click', closeModalBigImg);
  document.removeEventListener('keydown', closeModalBigImg);
};

/* Функция для добавления комментариев других пользователей под открытую фотографию */
const showComments = (comments) => {
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

/* Функция для открытия большой фотографии  */
const showFullPicture = (picture) => {
  picture.addEventListener('click', () => {

    const values = PHOTOS[picture.getAttribute('id')];

    document.body.classList.add('modal-open');

    bigPictureElement.classList.remove('hidden');
    bigImgElement.src = values.url;
    bigImgElement.alt = values.description;
    bigImgLikesElement.textContent = values.likes;
    bigImgInfoElement.querySelector('.social__caption').textContent = values.description;

    showComments(values.comments);

    //add Listeners
    closeButtonElement.addEventListener('click', closeModalBigImg);

    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === ESCAPE) {
        if (!bigPictureElement.classList.contains('.hidden')) {
          closeModalBigImg();
        }
      }
    });
  });
};

export { showFullPicture };
