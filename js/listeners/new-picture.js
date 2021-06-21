//FIXME: Поменять наименования в соответствии с критериями.
//TODO: Раскидать по модулям
const newFileElement = document.querySelector('input[type="file"]');

const newImgCloseButtonElement = document.querySelector('#upload-cancel');
const newImgPreviewElement = document.querySelector('.img-upload__preview');
const newImgOverlayElement = document.querySelector('.img-upload__overlay');
const newImgElement = newImgPreviewElement.querySelector('img');

const effectsElement = document.querySelectorAll('input[name="effect"]');

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');


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
  newImgCloseButtonElement.removeEventListener('click', closeModal);
};


/* Редактирование изображения:
загрузить новую фотографию для редактирования */
const loadNewPicture = (evt) => {
  const ACCEPT = ['image/png', 'image/jpg', 'image/jpeg'];
  const file = evt.target.files[0];

  URL.createObjectURL(file);
  URL.revokeObjectURL(file);

  if (ACCEPT.indexOf(file.type) !== -1) {
    newImgElement.src = URL.createObjectURL(file);
    scaleControlBiggerElement.disabled = true;
    newImgOverlayElement.classList.remove('hidden');

    /* масштабирование  */
    scaleControlBiggerElement.addEventListener('click', checkValueInScaleControl);
    scaleControlSmallerElement.addEventListener('click', checkValueInScaleControl);

    /* выбор эффекта */
    effectsElement.forEach((effect) => {
      effect.addEventListener('change', selectEffect);
    });

    /* закрытие модалки */
    newImgCloseButtonElement.addEventListener('click', closeModal);
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