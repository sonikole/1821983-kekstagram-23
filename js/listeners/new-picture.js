
import { isValidNewPicture } from '../utils/forms-validate.js';
import { addErrorMessage, addSuccessMessage } from '../utils/messages.js';
import { closeModal, createEffectSlider, clickEffectButton, clickScaleControlButton, addDescription, addHashTag, clickCloseModalButton } from './change-new-picture.js';

const URL_SEND = 'https://23.javascript.pages.academy/kekstagram';
const STATUS_OK = 200;

const newImgInputElement = document.querySelector('.img-upload__input');
const newImgCloseElement = document.querySelector('.img-upload__cancel');
const newImgSubmitElement = document.querySelector('.img-upload__submit');

const newImgPreviewElement = document.querySelector('.img-upload__preview');
const newImgOverlayElement = document.querySelector('.img-upload__overlay');
const newImgElement = newImgPreviewElement.querySelector('img');

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');

const descriptionElement = document.querySelector('.text__description');
const hashTagElement = document.querySelector('.text__hashtags');

const effectsElement = document.querySelectorAll('input[name="effect"]');

let curFile;

/* Редактирование изображения:
проверить валидность перед отправкой изображения на сервер */
const sentPicture = () => {
  const formElement = document.querySelector('.img-upload__form');
  const formData = new FormData(formElement);

  const request = new XMLHttpRequest();
  request.open('POST', URL_SEND);
  request.addEventListener('load', () => {
    closeModal();

    if (request.status === STATUS_OK) {
      addSuccessMessage();
    }
    else {
      addErrorMessage();
    }
  }, { once: true });

  request.send(formData);
};

/* Редактирование изображения:
валидация текстовых полей перед отправкой формы */
const clickSubmitButton = (evt) => {
  if (!hashTagElement.validity.valid) {
    hashTagElement.classList.add('error_hashtags');
    setTimeout(() => {
      hashTagElement.classList.remove('error_hashtags');
    }, 500);
  }
  else {
    evt.preventDefault();
    sentPicture();
    newImgSubmitElement.removeEventListener('click', clickSubmitButton); /* опубликовать */
    newImgCloseElement.removeEventListener('click', clickCloseModalButton); /* закрытие модалки */
    document.removeEventListener('keydown', clickCloseModalButton); /* закрытие модалки */
  }
};

/* Редактирование изображения:
загрузить новую фотографию для редактирования */
const clickLoadNewPicture = () => {
  curFile = newImgInputElement.files[0];
  const isValid = isValidNewPicture(curFile);

  if (isValid) {
    newImgElement.src = URL.createObjectURL(curFile);
    URL.revokeObjectURL(curFile);

    scaleControlBiggerElement.disabled = true;
    newImgOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    createEffectSlider();

    effectsElement.forEach((effect) => {
      effect.addEventListener('change', clickEffectButton); /* выбор эффекта */
    });
    scaleControlBiggerElement.addEventListener('click', clickScaleControlButton); /* масштабирование + */
    scaleControlSmallerElement.addEventListener('click', clickScaleControlButton); /* масштабирование - */
    descriptionElement.addEventListener('keyup', addDescription); /* добавить описание к фотографии */
    hashTagElement.addEventListener('keyup', addHashTag); /* добавить хеш-теги */
    newImgCloseElement.addEventListener('click', clickCloseModalButton); /* закрытие модалки */
    document.addEventListener('keydown', clickCloseModalButton); /* закрытие модалки */
    newImgSubmitElement.addEventListener('click', clickSubmitButton); /* отправить изображение */
  }
};

const uploadNewPicture = () => {
  newImgInputElement.addEventListener('change', () => {
    clickLoadNewPicture();
  });
};

export { uploadNewPicture, clickSubmitButton };

