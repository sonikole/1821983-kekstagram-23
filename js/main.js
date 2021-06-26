import { loadUsersPictures } from './utils/load-pictures.js';
import { uploadNewPicture } from './listeners/new-picture.js';
import { showFullPicture } from './listeners/users-pictures.js';

loadUsersPictures();
showFullPicture();
uploadNewPicture();
