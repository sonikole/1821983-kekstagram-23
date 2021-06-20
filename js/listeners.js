import { PHOTOS } from './main.js';
const ESCAPE = 27;

//TODO: Будут использоваться в других методах
const bigPicture = document.querySelector('.big-picture');
const bigImg = bigPicture.querySelector('img');
const bigImgLikes = document.querySelector('.likes-count');
const bigImgInfo = document.querySelector('.social__header');
const commentsListCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');
const closeButton = document.querySelector('#picture-cancel');

//TODO: Будет меняться. По ТЗ должно показываться изначально 5 комментариев, потом загружаться по +5
let maxCommentsCount = 5;

/* Функция для закрытия большой фотографии  */
const closeModalBigImg = () => {
  maxCommentsCount = 5;
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeModalBigImg);
  document.removeEventListener('keydown', closeModalBigImg);
};

/* Функция для добавления комментариев других пользователей под открытую фотографию */
const showComments = (comments) => {
  const count = Object.keys(comments).length;
  const maxCount = count < maxCommentsCount ? count : maxCommentsCount;

  commentsList.innerHTML = '';

  //TODO: По ТЗ должна быть реализация. в ДЗ пока выключено
  commentsListCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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
    commentsList.appendChild(li);
  }
};

/* Функция для открытия большой фотографии  */
const showFullPicture = (picture) => {
  picture.addEventListener('click', () => {

    const values = PHOTOS[picture.getAttribute('id')];

    document.body.classList.add('modal-open');

    bigPicture.classList.remove('hidden');
    bigImg.src = values.url;
    bigImg.alt = values.description;
    bigImgLikes.textContent = values.likes;
    bigImgInfo.querySelector('.social__caption').textContent = values.description;

    showComments(values.comments);

    //add Listeners
    closeButton.addEventListener('click', closeModalBigImg);

    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === ESCAPE) {
        if (!bigPicture.classList.contains('.hidden')) {
          closeModalBigImg();
        }
      }
    });
  });
};

export { showFullPicture };
