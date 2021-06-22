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

const descriptionElement = document.querySelector('.text__description');
const hashTagElement = document.querySelector('.text__hashtags');

/* Редактирование изображения:
ввод хеш-тег  */
const addHashTag = (evt) => {
  //TODO: добавить валидацию
  const regex = /[^a-zA-Zа-яА-Я0-9 ]/g;
  let str = evt.currentTarget.value;
  str = str.replace(regex, '');

  const tagged = str.replace(/#/g, '').replace(/([^" "]+)/g, '#$1');
  evt.currentTarget.value = tagged;
};


/* Редактирование изображения:
ввод описания к фотографии  */
//TODO: Валидация
const addDescription = (evt) => {
  evt.currentTarget.textContent = evt.currentTarget.value;
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
  newImgOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

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

  /* описание к фотографии */
  descriptionElement.textContent = '';
  descriptionElement.removeEventListener('keyup', addDescription);

  /* хеш-теги */
  hashTagElement.value = '';
  hashTagElement.removeEventListener('keyup', addHashTag);

  /* эффект  */
  document.querySelector('[value="none"]').checked = true;
  effectsElement.forEach((effect) => {
    effect.removeEventListener('change', selectEffect);
  });
  removeEffectsPreview();
};


/* Редактирование изображения:
закрытие модалки */
const closeModal = (evt) => {
  //если фокусировка на комментарии или хештеге, а нажат Escape
  const isActive = (document.activeElement === descriptionElement ||
    document.activeElement === hashTagElement);

  if (evt.key === 'Escape' && !isActive
    || evt.currentTarget === closeNewImgButtonElement) {

    /* Сбросить изменения до дефолтных */
    discardChanges();

    /* закрытие модалки */
    closeNewImgButtonElement.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  }
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
    document.body.classList.add('modal-open');

    /* масштабирование  */
    scaleControlBiggerElement.addEventListener('click', checkValueInScaleControl);
    scaleControlSmallerElement.addEventListener('click', checkValueInScaleControl);

    /* выбор эффекта */
    effectsElement.forEach((effect) => {
      effect.addEventListener('change', selectEffect);
    });


    /* добавить описание к фотографии */
    descriptionElement.addEventListener('keyup', addDescription);

    /* добавить хеш-теги */
    hashTagElement.addEventListener('keyup', addHashTag);

    /* закрытие модалки */
    closeNewImgButtonElement.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
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
