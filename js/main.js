import { generatePhotos } from './data.js';

//FIXME: Поменять наименования в соответствии с критериями.
//TODO: Раскидать по модулям
const cancel = document.querySelector('.cancel');
const picture = document.querySelector('.img-upload__preview');
const overlay = document.querySelector('.img-upload__overlay');
const img = picture.querySelector('img');
const effects = document.querySelectorAll('input[name="effect"]');




/* Редактирование изображения:
сброс эффекта  */
const removeEffectsPreview = () => {
  document.querySelectorAll('.effects__radio').forEach((item) => {
    picture.classList.remove(`effects__preview--${item.value}`);
  });
};


/* Редактирование изображения:
закрытие модалки */
cancel.addEventListener('click', () => {
  overlay.classList.add('hidden');

  removeEffectsPreview();

  effects.querySelector('[value="none"]').click;

  img.onload = () => {
    URL.revokeObjectURL(img.src);
  };
  //FIXME: Разобраться по поводу пути дефолтного изображдения. Будет ли другой на сервере?
  img.src = 'img/upload-default-image.jpg';

});


/* Редактирование изображения:
выбор эффекта */
for (let i = 0; i < effects.length; i++) {
  effects[i].addEventListener('change', function () {

    removeEffectsPreview();

    picture.classList.add(`effects__preview--${this.value}`);
  });
}


const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const checkValueInScaleControl = (type = null) => {
  let value = parseInt(scaleControlValue.value, 10);

  switch (type) {
    case 'sum':
      value += 25;
      break;

    case 'minus':
      value -= 25;
      break;

    default:
      value = 100;
      break;
  }

  scaleControlValue.value = `${value}%`;

  scaleControlBigger.disabled = !(value < 100);
  scaleControlSmaller.disabled = !(value > 25);
};


/* Редактирование изображения:
увеличение масштаба  */
scaleControlBigger.addEventListener('click', () => {
  checkValueInScaleControl('sum');

});

/* Редактирование изображения:
уменьшение масштаба  */
scaleControlSmaller.addEventListener('click', () => {
  checkValueInScaleControl('minus');
});


/* Редактирование изображения:
выбор изображения из файла  */
window.addEventListener('load', () => {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    const ACCEPT = ['image/png', 'image/jpg', 'image/jpeg'];

    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };

    if (ACCEPT.indexOf(this.files[0].type) !== -1) {
      img.src = URL.createObjectURL(this.files[0]);

      checkValueInScaleControl();
      overlay.classList.remove('hidden');
    }
    else {
      //TODO: Обработать ошибку, если пользователь выберет неподходящий формат.
    }
  });
});
