import { getRandomInteger } from '../utils.js';
//FIXME: Поменять наименования в соответствии с критериями.
//TODO: Раскидать по модулям
const newFileElement = document.querySelector('input[type="file"]');
const effectsElement = document.querySelectorAll('input[name="effect"]');
const closeNewImgButtonElement = document.querySelector('#upload-cancel');

const newImgPreviewElement = document.querySelector('.img-upload__preview');
const newImgOverlayElement = document.querySelector('.img-upload__overlay');
const newImgElement = newImgPreviewElement.querySelector('img');

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');

const commentTextElement = document.querySelector('.text__description');


/* Редактирование изображения:
ввод комментария  */
//TODO: Причесать код. Проверить, есть ли реализация приятнее
const addComment = (evt) => {
  const ASSEPT_KEY_CODES = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
  evt.preventDefault();

  let from = evt.currentTarget.selectionStart;
  let to = evt.currentTarget.selectionEnd;
  let text = '';

  /*48-57 цифры
  65-90 буквы
          186-192, 219-222 символы
  32 Пробел */
  if (48 <= evt.keyCode && evt.keyCode <= 57 ||
    65 <= evt.keyCode && evt.keyCode <= 90 ||
    186 <= evt.keyCode && evt.keyCode <= 192 ||
    219 <= evt.keyCode && evt.keyCode <= 222 ||
    evt.keyCode === 32) {
    text = evt.key;
  }
  else if (!ASSEPT_KEY_CODES.includes(evt.key)) {
    return;
  }
  else {
    switch (evt.key) {
      case 'Backspace':
        if (from === to && from > 0) {
          from--;
        }
        break;

      case 'Delete':
        if (from === to) {
          to++;
        }
        break;

      case 'ArrowLeft':
        if (from === to && from > 0) {
          from--;
          to--;
        }
        else {
          to = from;
        }
        break;

      case 'ArrowRight':
        if (from === to) {
          from++;
          to++;
        }
        else {
          from = to;
        }
        break;
    }
  }

  const textBefore = evt.currentTarget.textContent.slice(0, from);
  const textAfter = evt.currentTarget.textContent.slice(to);
  evt.currentTarget.textContent = textBefore + text + textAfter;
  evt.currentTarget.selectionStart = evt.currentTarget.selectionEnd = from + text.length;
};


/* Редактирование изображения:
сброс эффекта  */
const removeEffectsPreview = () => {
  document.querySelectorAll('.effects__radio').forEach((item) => {
    newImgPreviewElement.classList.remove(`effects__preview--${item.value}`);
  });
};


/* Редактирование изображения:
переключение эффекта  */
const selectEffect = (evt) => {
  removeEffectsPreview();
  newImgPreviewElement.classList.add(`effects__preview--${evt.currentTarget.value}`);
};


/* Редактирование изображения:
масштабирование */
const checkValueInScaleControl = (evt) => {
  let value = parseInt(scaleControlValueElement.value, 10);

  switch (evt.target.textContent) {
    case 'Увеличить':
      value += 25;
      break;

    case 'Уменьшить':
      value -= 25;
      break;
  }

  newImgElement.style = `transform: scale(${value / 100})`;
  scaleControlValueElement.value = `${value}%`;

  scaleControlBiggerElement.disabled = !(value < 100);
  scaleControlSmallerElement.disabled = !(value > 25);
};


/* Редактирование изображения:
сбросить изменения  */
const discardChanges = () => {
  // console.log(getRandomInteger(1,20));
  newImgOverlayElement.classList.add('hidden');

  newImgElement.onload = () => {
    URL.revokeObjectURL(newImgElement.src);
  };
  //TODO: Разобраться по поводу пути дефолтного изображдения. Будет ли другой на сервере?
  newImgElement.src = 'img/upload-default-image.jpg';

  /* масштабирование  */
  newImgElement.style = 'transform: scale(1)';
  scaleControlValueElement.value = '100%';
  scaleControlBiggerElement.disabled = true;

  scaleControlBiggerElement.removeEventListener('click', checkValueInScaleControl);
  scaleControlSmallerElement.removeEventListener('click', checkValueInScaleControl);

  /* эффект  */
  document.querySelector('[value="none"]').checked = true;
  effectsElement.forEach((effect) => {
    effect.removeEventListener('change', selectEffect);
  });
  removeEffectsPreview();
};


/* Редактирование изображения:
закрытие модалки */
const closeModal = () => {
  /* Сбросить изменения до дефолтных */
  discardChanges();

  /* закрытие модалки */
  closeNewImgButtonElement.removeEventListener('click', closeModal);
};


/* Редактирование изображения:
загрузить новую фотографию для редактирования */
const loadNewPicture = (evt) => {
  const ACCEPT = ['image/png', 'image/jpg', 'image/jpeg'];
  const file = evt.target.files[0];

  if (ACCEPT.includes(file.type)) {
    newImgElement.src = URL.createObjectURL(file);
    URL.revokeObjectURL(file);
    scaleControlBiggerElement.disabled = true;
    newImgOverlayElement.classList.remove('hidden');

    /* масштабирование  */
    scaleControlBiggerElement.addEventListener('click', checkValueInScaleControl);
    scaleControlSmallerElement.addEventListener('click', checkValueInScaleControl);

    /* выбор эффекта */
    effectsElement.forEach((effect) => {
      effect.addEventListener('change', selectEffect);
    });


    /* добавить комментарий */
    commentTextElement.addEventListener('click', () => {
      commentTextElement.addEventListener('keydown', addComment);
    });

    /* закрытие модалки */
    closeNewImgButtonElement.addEventListener('click', closeModal);
  }
  else {
    //TODO: Обработать ошибку, если пользователь выберет неподходящий формат.
    /* ожидание загрузки  */
  }

};


const uploadNewPicture = () => {
  newFileElement.addEventListener('change', loadNewPicture);
};


export { uploadNewPicture };
