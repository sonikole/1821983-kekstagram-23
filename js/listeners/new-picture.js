import { isEscEvent, isActiveElement, FILTERS_VALUES } from '../utils/utils.js';
import { isValidNewPicture, isValidHashTag } from '../utils/forms-validate.js';
import { addErrorMessage, addSuccessMessage } from '../utils/messages.js';

const URL_SEND = 'https://23.javascript.pages.academy/kekstagram';
const STATUS_OK = 200;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const newImgInputElement = document.querySelector('.img-upload__input');
const newImgCloseElement = document.querySelector('.img-upload__cancel');
const newImgSubmitElement = document.querySelector('.img-upload__submit');

const newImgPreviewElement = document.querySelector('.img-upload__preview');
const newImgOverlayElement = document.querySelector('.img-upload__overlay');
const newImgElement = newImgPreviewElement.querySelector('img');

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');

const descriptionElement = document.querySelector('.text__description');
const hashTagElement = document.querySelector('.text__hashtags');

const sliderElement = document.querySelector('.effect-level');
const effectsElement = document.querySelectorAll('input[name="effect"]');
const effectValueElement = document.querySelector('.effect-level__value');

let currentFilter = 'none';
let curFile;

/* Редактирование изображения:
ввод хеш-тег  */
const addHashTag = (evt) => {
  const regex = /[^A-zА-я0-9 ]/g;
  let str = evt.currentTarget.value;
  str = str.replace(regex, '');

  const tagged = str.replace(/#/g, '').replace(/([^" "]+)/g, '#$1');
  evt.currentTarget.value = tagged;
  isValidHashTag(tagged);
};

/* Редактирование изображения:
ввод описания к фотографии */
const addDescription = (evt) => {
  evt.currentTarget.textContent = evt.currentTarget.value;
};

/* Глубина фильтра изображения:
обновить значения глубины эффекта  */
const updateEffectDepthValue = () => {
  if (currentFilter === 'none') {
    newImgElement.style.filter = currentFilter;
  }
  else {
    const filterType = FILTERS_VALUES[currentFilter];
    effectValueElement.value = sliderElement.noUiSlider.get();
    newImgElement.style.filter = `${filterType.filterName}(${effectValueElement.value}${filterType.filterValueType})`;
  }
};

/* Глубина фильтра изображения:
создание слайдера  */
const createEffectSlider = () => {
  const settings = {
    start: 0,
    connect: 'lower',
    tooltips: true,
    range: {
      min: 0,
      max: 10,
    },
    pips: {
      mode: 'range',
      density: 3,
    },
  };

  noUiSlider.create(sliderElement, settings);
  sliderElement.noUiSlider.on('slide', () => {
    updateEffectDepthValue();
  });
  sliderElement.classList.add('hidden');
};

/* Редактирование изображения:
сброс эффекта  */
const removeEffectsPreview = () => {
  document.querySelectorAll('.effects__radio').forEach((item) => {
    newImgElement.classList.remove(`effects__preview--${item.value}`);
  });
  updateEffectDepthValue();
};

/* Редактирование изображения:
сбросить значения полей до дефолтных */
const setDefaultValues = () => {
  newImgElement.src = 'img/upload-default-image.jpg';

  /* масштабирование  */
  newImgElement.style = 'transform: scale(1)';
  currentFilter = 'none';
  scaleControlValueElement.value = `${SCALE_MAX}%`;
  scaleControlBiggerElement.disabled = true;

  /* описание к фотографии */
  descriptionElement.textContent = '';
  descriptionElement.value = '';

  /* хеш-теги */
  hashTagElement.value = '';
  hashTagElement.setCustomValidity('');

  /* эффект  */
  document.querySelector('[value="none"]').checked = true;
  removeEffectsPreview();
  sliderElement.noUiSlider.destroy();

  /* сбросить изображение  */
  newImgInputElement.value = null;
};

/* Редактирование изображения:
переключение эффекта  */
const clickEffectButton = (evt) => {
  currentFilter = evt.currentTarget.value;
  if (currentFilter !== 'none') {
    sliderElement.classList.remove('hidden');

    sliderElement.noUiSlider.updateOptions({
      start: FILTERS_VALUES[currentFilter].filterMaxValue,
      step: FILTERS_VALUES[currentFilter].filterStep,
      range: {
        min: FILTERS_VALUES[currentFilter].filterMinValue,
        max: FILTERS_VALUES[currentFilter].filterMaxValue,
      },

    });
  }
  else {
    sliderElement.classList.add('hidden');
  }
  removeEffectsPreview();
  newImgElement.classList.add(`effects__preview--${evt.currentTarget.value}`);
};

/* Редактирование изображения:
масштабирование */
const clickScaleControlButton = (evt) => {
  let value = parseInt(scaleControlValueElement.value, 10);
  switch (evt.target.textContent) {
    case 'Увеличить':
      value += SCALE_STEP;
      break;

    case 'Уменьшить':
      value -= SCALE_STEP;
      break;
  }

  newImgElement.style = `transform: scale(${value / 100})`;
  scaleControlValueElement.value = `${value}%`;

  scaleControlBiggerElement.disabled = !(value < SCALE_MAX);
  scaleControlSmallerElement.disabled = !(value > SCALE_MIN);
};

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
  }
};

/* Редактирование изображения:
закрытие модалки */
const clickCloseModalButton = (evt) => {
  //если фокусировка на комментарии или хештеге
  const isActive = isActiveElement(descriptionElement) || isActiveElement(hashTagElement);

  if (isEscEvent(evt) && !isActive
    || evt.currentTarget === newImgCloseElement) {
    closeModal();
  }
};

/* Редактирование изображения:
закрытие модалки и сброс настроек */
function closeModal() {
  setDefaultValues();

  newImgOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  newImgSubmitElement.removeEventListener('click', clickSubmitButton);
  scaleControlBiggerElement.removeEventListener('click', clickScaleControlButton); /* масштабирование + */
  scaleControlSmallerElement.removeEventListener('click', clickScaleControlButton); /* масштабирование - */
  descriptionElement.removeEventListener('keyup', addDescription);/* описание к фотографии */
  hashTagElement.removeEventListener('keyup', addHashTag); /* хеш-теги */
  effectsElement.forEach((effect) => {
    effect.removeEventListener('change', clickEffectButton); /* эффект  */
  });
  newImgCloseElement.removeEventListener('click', clickCloseModalButton); /* закрытие модалки */
  document.removeEventListener('keydown', clickCloseModalButton); /* закрытие модалки */
}

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

export { uploadNewPicture };
