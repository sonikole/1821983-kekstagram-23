import { generatePhotos } from './data.js';

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
