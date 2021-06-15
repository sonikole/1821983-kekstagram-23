import { generatePhotos } from './data.js';

const photos = generatePhotos(10);
photos;


window.addEventListener('load', () => {
  document.querySelector('input[type="file"]').addEventListener('change', function () {
    if (this.files && this.files[0]) {
      const picture = document.querySelector('.img-upload__preview');
      const img = picture.querySelector('img');
      img.onload = () => {
        URL.revokeObjectURL(img.src);  // no longer needed, free memory
      };

      img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }

    const overlay = document.querySelector('.img-upload__overlay');
    overlay.classList.remove('hidden');
  });
});
