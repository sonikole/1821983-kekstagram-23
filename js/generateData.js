import { generatePhotos } from './data.js';

const generateUsersPictures = (PHOTOS_COUNT) => {

  const photos = generatePhotos(PHOTOS_COUNT);
  const template = document.getElementById('picture');
  const element = template.content.querySelector('.picture');

  const container = document.querySelector('.pictures');

  for (let i = 0; i < photos.length; i++) {
    const clonedElement = element.cloneNode(true);
    clonedElement.querySelector('.picture__img').src = photos[i].url;
    clonedElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
    clonedElement.querySelector('.picture__likes').textContent = photos[i].likes;
    container.appendChild(clonedElement);
  }
};

export { generateUsersPictures };
