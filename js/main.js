import { generatePhotos } from './data.js';

//FIXME: Поменять наименования в соответствии с критериями.
//TODO: Раскидать по модулям
const cancelOnClick = document.querySelector('.cancel');
const picture = document.querySelector('.img-upload__preview');
const overlay = document.querySelector('.img-upload__overlay');
const img = picture.querySelector('img');
const effects = document.querySelectorAll('input[name="effect"]');


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
      overlay.classList.remove('hidden');
    }
    else {
      //TODO: Обработать ошибку, если пользователь выберет неподходящий формат.
    }
  });
});


/* Редактирование изображения:
сброс эффекта  */
const removeEffectsPreview = () => {
  for (const effectValue of document.querySelectorAll('.effects__radio')) {
    picture.classList.remove(`effects__preview--${effectValue.value}`);
  }
};


/* Редактирование изображения:
закрытие модалки */
cancelOnClick.addEventListener('click', () => {
  overlay.classList.add('hidden');

  removeEffectsPreview();

  document.querySelector('input[value="none"]').click;

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
