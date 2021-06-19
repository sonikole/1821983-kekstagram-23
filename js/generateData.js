import { generatePhotos } from './data.js';

const generateUsersPictures = (PHOTOS_COUNT) => {

  const photos = generatePhotos(PHOTOS_COUNT);
  const template = document.getElementById('picture');
  const element = template.content.querySelector('.picture');

  const container = document.querySelector('.pictures');

  for (let index = 0; index < photos.length; index++) {
    const clonedElement = element.cloneNode(true);
    clonedElement.querySelector('.picture__img').src = photos[index].url;
    clonedElement.querySelector('.picture__comments').textContent = photos[index].comments.length;
    clonedElement.querySelector('.picture__likes').textContent = photos[index].likes;
    container.appendChild(clonedElement);
  }
};

export { generateUsersPictures };
