const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

const newImgInputElement = document.querySelector('.img-upload__input');
const hashTagElement = document.querySelector('.text__hashtags');

/* Валидация:
тип фотографии  */
const isValidNewPicture = (curFile) => {
  const formats = ['image/jpeg', 'image/jpeg', 'image/png'];
  let isValid = true;

  if (!formats.includes(curFile.type)) {
    newImgInputElement.setCustomValidity('Недопустимый тип изображения');
    isValid = false;
  }
  else {
    newImgInputElement.setCustomValidity('');
  }
  newImgInputElement.reportValidity();
  return isValid;
};

/* Валидация:
хеш-тег  */
const isValidHashTag = (value) => {
  const re = /(([ ](?!\b)|^)(#[A-zА-я0-9]{0,19})(?=[ ]|$)){0,5}/g;
  const hashTags = value.toLowerCase().split([' ']).filter(String);
  const uniqueHashTags = Array.from(new Set(hashTags));
  let isValid = true;
  let message = '';

  if (hashTags.length > MAX_HASHTAG_COUNT) {
    isValid = false;
    message = `(!): количество указанных хеш-тегов (${hashTags.length}) превышает допустимое (${MAX_HASHTAG_COUNT})`;
  }

  //поиск дубликатов
  hashTags.forEach((element) => {
    if (element.length > MAX_HASHTAG_LENGTH) {
      isValid = false;
      message += `\n(!): длина хеш-тега '${element + 1}' превышает допустимое (${MAX_HASHTAG_LENGTH})`;
    }
  });

  if (!hashTags.every((v, i) => v === uniqueHashTags[i])) {
    const duplicates = [];

    for (let i = 0; i < hashTags.length - 1; i++) {
      for (let j = i + 1; j < hashTags.length; j++) {
        if (hashTags[i] === hashTags[j]) {
          duplicates.push(hashTags[i]);
        }
      }
    }
    isValid = false;
    message += `\n(!): запрещены повторяющиеся хеш-теги: "${duplicates.join(', "')}"`;
  }

  if (re.test(value) && isValid) {
    message = '';
  }

  hashTagElement.setCustomValidity(message);
  hashTagElement.reportValidity();
  return isValid;
};

export { isValidNewPicture, isValidHashTag };
