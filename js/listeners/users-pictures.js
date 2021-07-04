import { photos } from '../utils/load-pictures.js';
import { isEscEvent } from '../utils/utils.js';

const IMG_WIDTH = 35;
const IMG_HEIGHT = 35;
const COMMENT_STEP = 5;

const picturesListElement = document.querySelector('.pictures');

const bigPictureElement = document.querySelector('.big-picture');
const bigImgElement = bigPictureElement.querySelector('img');
const bigImgLikesElement = document.querySelector('.likes-count');
const bigImgDescriptionElement = document.querySelector('.social__caption');
const bigImgCloseButtonElement = document.querySelector('#picture-cancel');

const commentsListCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const commentsListElement = document.querySelector('.social__comments');

let maxCommentsCount = 5;
let currentOpenPhoto;

/* Просмотр фотографии:
очистка комментариев со страницы*/
const removeCommentsOnPage = () => {
  while (commentsListElement.firstChild) {
    commentsListElement.removeChild(commentsListElement.firstChild);
  }
  maxCommentsCount = COMMENT_STEP;
};

/* Просмотр фотографии:
добавить комментарии */
const addCommentOnPage = (comment) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = IMG_WIDTH;
  img.height = IMG_HEIGHT;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(p);
  commentsListElement.appendChild(li);
};

/* Просмотр фотографии:
показать больше комментариев */
const clickShowMoreComments = () => {
  const count = Object.keys(currentOpenPhoto.comments).length;
  let showCommentsCount = commentsListElement.childElementCount;
  let maxCount = maxCommentsCount;

  if (count <= maxCommentsCount) {
    maxCount = count;
    commentsLoaderElement.classList.add('hidden');
  }

  for (let index = showCommentsCount; index < maxCount; index++) {
    addCommentOnPage(currentOpenPhoto.comments[index]);
    showCommentsCount++;
  }

  maxCommentsCount += COMMENT_STEP;
  commentsListCountElement.innerHTML = `${showCommentsCount} из <span class="comments-count">${count}</span> комментариев`;
};

/* Просмотр фотографии:
закрытие модалки */
const clickCloseModalButton = (evt) => {
  if (isEscEvent(evt) || evt.currentTarget === bigImgCloseButtonElement) {
    if (!bigPictureElement.classList.contains('.hidden')) {
      bigPictureElement.classList.add('hidden');
      commentsLoaderElement.classList.remove('hidden');
      document.body.classList.remove('modal-open');

      removeCommentsOnPage();

      commentsLoaderElement.removeEventListener('click', clickShowMoreComments);
      bigImgCloseButtonElement.removeEventListener('click', clickCloseModalButton);
      document.removeEventListener('keydown', clickCloseModalButton);
    }
  }
};

/* Просмотр фотографии:
открытие большой фотографии */
const clickAnotherUserPicture = (evt) => {
  const id = parseInt(evt.target.parentNode.id, 10);
  currentOpenPhoto = photos.find((photo) => photo.id === id);

  document.body.classList.add('modal-open');

  bigPictureElement.classList.remove('hidden');
  bigImgElement.src = currentOpenPhoto.url;
  bigImgElement.alt = currentOpenPhoto.description;
  bigImgLikesElement.textContent = currentOpenPhoto.likes;
  bigImgDescriptionElement.textContent = currentOpenPhoto.description;

  clickShowMoreComments();

  bigImgCloseButtonElement.addEventListener('click', clickCloseModalButton);
  commentsLoaderElement.addEventListener('click', clickShowMoreComments);
  document.addEventListener('keydown', clickCloseModalButton);

};

/* Делегирование:
добавление обработчика не на каждое изображение, а на родителя */
const showFullPicture = () => {
  picturesListElement.addEventListener('click', (evt) => {
    const target = evt.target.parentNode;
    if (target.tagName === 'A') {
      clickAnotherUserPicture(evt);
    }
  });
};

removeCommentsOnPage();

export { showFullPicture };
