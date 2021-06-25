import { isEscEvent, isActiveElement, FILTERS_VALUES } from '../utils/utils.js';
import { isValidNewPicture, isValidHashTag } from '../utils/forms-validate.js';

//TODO: Раскидать по модулям, если необходимо
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

/* Редактирование изображения:
ввод хеш-тег  */
function addHashTag(evt) {
  const regex = /[^A-zА-я0-9 ]/g;
  let str = evt.currentTarget.value;
  str = str.replace(regex, '');

  const tagged = str.replace(/#/g, '').replace(/([^" "]+)/g, '#$1');
  evt.currentTarget.value = tagged;
  isValidHashTag(tagged);
}

/* Редактирование изображения:
ввод описания к фотографии */
function addDescription(evt) {
  //TODO: Валидация
  evt.currentTarget.textContent = evt.currentTarget.value;
}

/* Глубина фильтра изображения:
обновить значения глубины эффекта  */
function updateEffectDepthValue() {
  if (currentFilter === 'none') {
    newImgElement.style.filter = currentFilter;
  }
  else {
    const filterType = FILTERS_VALUES[currentFilter];
    effectValueElement.value = sliderElement.noUiSlider.get();
    newImgElement.style.filter = `${filterType.filterName}(${effectValueElement.value}${filterType.filterValueType})`;
  }
}

/* Глубина фильтра изображения:
создание слайдера  */
function createEffectSlider() {
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
}

/* Редактирование изображения:
сброс эффекта  */
function removeEffectsPreview() {
  document.querySelectorAll('.effects__radio').forEach((item) => {
    newImgElement.classList.remove(`effects__preview--${item.value}`);
  });
  updateEffectDepthValue();
}




/* Редактирование изображения:
сбросить значения полей до дефолтных */
function setDefaultValues() {
  //TODO: Разобраться по поводу пути дефолтного изображдения. Будет ли другой на сервере?
  newImgElement.src = 'img/upload-default-image.jpg';

  /* масштабирование  */
  newImgElement.style = 'transform: scale(1)';
  currentFilter = 'none';
  scaleControlValueElement.value = '100%';
  scaleControlBiggerElement.disabled = true;

  /* описание к фотографии */
  descriptionElement.textContent = '';

  /* хеш-теги */
  hashTagElement.value = '';

  /* эффект  */
  document.querySelector('[value="none"]').checked = true;
  removeEffectsPreview();
  sliderElement.noUiSlider.destroy();

  /* сбросить изображение  */
  newImgInputElement.value = null;
}


/* Отправить:
Валидация текстовых полей перед отправкой формы */
function onSubmitPicture() {
  let isValide = true;

  hashTagElement.addEventListener('invalid', () => {
    isValide = false;
    hashTagElement.classList.add('error_hashtags');
    setTimeout(() => {
      hashTagElement.classList.remove('error_hashtags');
    }, 500);
  });

  if (isValide) {
    //TODO: разобраться с отправкой формы
    setDefaultValues();
    newImgSubmitElement.removeEventListener('click', onSubmitPicture);

  }
}

/* Редактирование изображения:
переключение эффекта  */
const onEffectButton = (evt) => {

  currentFilter = evt.currentTarget.value;
  if (currentFilter !== 'none') {
    sliderElement.classList.remove('hidden');

    sliderElement.noUiSlider.updateOptions({
      start: [FILTERS_VALUES[currentFilter].filterMaxValue],
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
const onScaleControlButton = (evt) => {
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
закрытие модалки */
const onCloseModalButton = (evt) => {

  //если фокусировка на комментарии или хештеге
  const isActive = isActiveElement(descriptionElement) || isActiveElement(hashTagElement);

  if (isEscEvent(evt) && !isActive
    || evt.currentTarget === newImgCloseElement) {

    newImgOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    setDefaultValues();

    newImgSubmitElement.removeEventListener('click', onSubmitPicture);
    scaleControlBiggerElement.removeEventListener('click', onScaleControlButton);/* масштабирование + */
    scaleControlSmallerElement.removeEventListener('click', onScaleControlButton);/* масштабирование - */
    descriptionElement.removeEventListener('keyup', addDescription);/* описание к фотографии */
    hashTagElement.removeEventListener('keyup', addHashTag);/* хеш-теги */
    effectsElement.forEach((effect) => {
      effect.removeEventListener('change', onEffectButton);/* эффект  */
    });
    newImgCloseElement.removeEventListener('click', onCloseModalButton); /* закрытие модалки */
    document.removeEventListener('keydown', onCloseModalButton); /* закрытие модалки */
  }
};


/* Редактирование изображения:
загрузить новую фотографию для редактирования */
const onLoadNewPicture = () => {
  const curFile = newImgInputElement.files[0];
  const isValid = isValidNewPicture(curFile);

  if (isValid) {
    newImgElement.src = URL.createObjectURL(curFile);
    URL.revokeObjectURL(curFile);

    scaleControlBiggerElement.disabled = true;
    newImgOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    createEffectSlider();

    effectsElement.forEach((effect) => {
      effect.addEventListener('change', onEffectButton); /* выбор эффекта */
    });
    scaleControlBiggerElement.addEventListener('click', onScaleControlButton);/* масштабирование + */
    scaleControlSmallerElement.addEventListener('click', onScaleControlButton);/* масштабирование - */
    descriptionElement.addEventListener('keyup', addDescription);/* добавить описание к фотографии */
    hashTagElement.addEventListener('keyup', addHashTag); /* добавить хеш-теги */
    newImgCloseElement.addEventListener('click', onCloseModalButton);/* закрытие модалки */
    document.addEventListener('keydown', onCloseModalButton);/* закрытие модалки */
    newImgSubmitElement.addEventListener('click', onSubmitPicture);/* отправить изображение */
  }
};

const uploadNewPicture = () => {
  newImgInputElement.addEventListener('change', () => {
    onLoadNewPicture();
  });
};

export { uploadNewPicture };
