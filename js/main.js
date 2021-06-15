import { generatePhotos } from './data.js';

const cancelOnClick = document.querySelector('.cancel');

window.addEventListener('load', () => {
  document.querySelector('input[type="file"]').addEventListener('change', function () {

    const picture = document.querySelector('.img-upload__preview');
    const overlay = document.querySelector('.img-upload__overlay');
    const img = picture.querySelector('img');

    img.onload = () => {
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(this.files[0]);

    overlay.classList.remove('hidden');
  });
});


cancelOnClick.addEventListener('click', () => {

  const picture = document.querySelector('.img-upload__preview');
  const overlay = document.querySelector('.img-upload__overlay');
  const img = picture.querySelector('img');

  overlay.classList.add('hidden');

  img.onload = () => {
    URL.revokeObjectURL(img.src);
  };
  img.src ='img/upload-default-image.jpg';

});
