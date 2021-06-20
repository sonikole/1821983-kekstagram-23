import { generatePhotos } from './data.js';
import { generateUsersPictures } from './generate-data.js';


const PHOTOS_COUNT = 21;
const PHOTOS = generatePhotos(PHOTOS_COUNT);
generateUsersPictures(PHOTOS);

export { PHOTOS };

