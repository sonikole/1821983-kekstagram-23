import { generatePhotos } from './data.js';
import { generateUsersPictures } from './generate-data.js';
import { uploadNewPicture } from './listeners/new-picture.js';
import { showFullPicture } from './listeners/users-pictures.js';

const PHOTOS_COUNT = 21;
const PHOTOS = generatePhotos(PHOTOS_COUNT);
generateUsersPictures(PHOTOS);

showFullPicture();
uploadNewPicture();

export { PHOTOS };
