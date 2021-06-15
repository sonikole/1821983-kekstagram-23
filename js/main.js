import { generatePhotos } from './data.js';

//FIXME: Поменять на верхний регистр.
const cancelOnClick = document.querySelector('.cancel');
const picture = document.querySelector('.img-upload__preview');
const overlay = document.querySelector('.img-upload__overlay');
const img = picture.querySelector('img');


window.addEventListener('load', () => {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    //TODO: Обработать ошибку, если пользователь выберет неподходящий формат.
    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(this.files[0]);

    overlay.classList.remove('hidden');
  });
});


cancelOnClick.addEventListener('click', () => {
  overlay.classList.add('hidden');

  img.onload = () => {
    URL.revokeObjectURL(img.src);
  };
  //FIXME: Разобраться по поводу пути дефолтного изображдения. Будет ли другой на сервере?
  img.src = 'img/upload-default-image.jpg';

});
