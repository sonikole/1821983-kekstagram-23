import { generatePhotos } from './data.js';
import { generateUsersPictures } from './generate-data.js';
import { getRandomInteger } from './utils.js';

const PHOTOS_COUNT = 21;
const PHOTOS = generatePhotos(PHOTOS_COUNT);
generateUsersPictures(PHOTOS);


//FIXME: Поменять наименования в соответствии с критериями.
//TODO: Раскидать по модулям
const cancel = document.querySelector('.cancel');
const picture = document.querySelector('.img-upload__preview');
const overlay = document.querySelector('.img-upload__overlay');
const img = picture.querySelector('img');
const effects = document.querySelectorAll('input[name="effect"]');
const newFileElement = document.querySelector('input[type="file"]');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');


/* Редактирование изображения:
сброс эффекта  */
const removeEffectsPreview = () => {
  document.querySelectorAll('.effects__radio').forEach((item) => {
    picture.classList.remove(`effects__preview--${item.value}`);
  });
};

/* Редактирование изображения:
переключение эффекта  */
const selectEffect = (evt) => {
  removeEffectsPreview();
  picture.classList.add(`effects__preview--${evt.currentTarget.value}`);
};


/* Редактирование изображения:
масштабирование */
const checkValueInScaleControl = (evt) => {
  let value = parseInt(scaleControlValue.value, 10);

  switch (evt.target.textContent) {
    case 'Увеличить':
      value += 25;
      break;

    case 'Уменьшить':
      value -= 25;
      break;

    default:
      value = 100;
      break;
  }

  img.style = `transform: scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;

  scaleControlBigger.disabled = !(value < 100);
  scaleControlSmaller.disabled = !(value > 25);
};


/* Редактирование изображения:
закрытие модалки */
const closeModal = () => {
  // console.log(getRandomInteger(1,20));
  overlay.classList.add('hidden');

  document.querySelector('[value="none"]').checked = true;

  img.onload = () => {
    URL.revokeObjectURL(img.src);
  };
  //FIXME: Разобраться по поводу пути дефолтного изображдения. Будет ли другой на сервере?
  img.src = 'img/upload-default-image.jpg';

  /* увеличение масштаба  */
  scaleControlBigger.removeEventListener('click', checkValueInScaleControl);

  /* уменьшение масштаба  */
  scaleControlSmaller.removeEventListener('click', checkValueInScaleControl);

  /* выбор эффекта */
  for (let i = 0; i < effects.length; i++) {
    effects[i].removeEventListener('change', selectEffect);
  }
  removeEffectsPreview();

  /* закрытие модалки */
  cancel.removeEventListener('click', closeModal);

  // newFileElement.addEventListener('change', addNewPicture);

};


const addNewPicture = (evt) => {
  const ACCEPT = ['image/png', 'image/jpg', 'image/jpeg'];
  const file = evt.target.files[0];

  URL.createObjectURL(file);
  URL.revokeObjectURL(file);

  if (ACCEPT.indexOf(file.type) !== -1) {
    img.src = URL.createObjectURL(file);

    overlay.classList.remove('hidden');
    scaleControlBigger.disabled = true;

    /* увеличение масштаба  */
    scaleControlBigger.addEventListener('click', checkValueInScaleControl);

    /* уменьшение масштаба  */
    scaleControlSmaller.addEventListener('click', checkValueInScaleControl);

    /* выбор эффекта */
    for (let i = 0; i < effects.length; i++) {
      effects[i].addEventListener('change', selectEffect);
    }

    /* закрытие модалки */
    cancel.addEventListener('click', closeModal);

    /* выбор изображения из файла  */
    // newFileElement.removeEventListener('change', addNewPicture);


  }
  else {
    //TODO: Обработать ошибку, если пользователь выберет неподходящий формат.
    /* ожидание загрузки  */
  }

};

const uploadFile = () => {
  newFileElement.addEventListener('change', addNewPicture);
};


uploadFile();

export { PHOTOS };
