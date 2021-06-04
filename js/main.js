/* eslint-disable id-length */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const MAX_COMMENT_LENGHT = 140;
const PHOTO_COUNT = 25;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Владимир',
  'Илларион',
  'Евгений',
  'Герасим',
  'Григорий',
  'Владимир',
  'Георгий',
  'Прохор',
  'Тимофей',
  'Павел'];

const SURNAMES = [
  'Евдокимов',
  'Евдокимов',
  'Мясников',
  'Фомичёв',
  'Мельников',
  'Буров',
  'Меркушев',
  'Белов',
  'Стрелков',
  'Калашников',
  'Журавлёв'];

const DESCRIPTIONS = [
  'Пока мушкетеры не пожалел для друга.',
  'Софьи и на кота и молчалина произошел под.',
  'Пернатый друг хомячок сидело невиданное зрелище была истинно русской.',
  'Вспоминал мать индии, начиная с толку иванушку кота и часто ходила.',
  'Так сделать! длинными зимними холодными вечерами она.',
  'Кроме слова дура здесь была маша.',
  'Успехи пьера безухова в комнате громко тикали солнечные часы женщина.',
  'Гордая и в клетке сидит мой пернатый друг хомячок первые.',
  'Тучи выглянул луч солнца и задушило.',
  'Природу и задушило дездемону дятел уселся и поняли: здесь была.',
];

/* Функция, возвращающая случайное целое число из переданного диапазона включительно. */
const getRandomInteger = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    console.error('Ошибка: Минимальное и максимальное значения должны быть числами:\nmin = %s (%s)\nmax = %s (%s)', min, typeof min, max, typeof max);
  }
  else if (min === max) {
    console.error('Ошибка: Минимальное значение не должно быть равно максимальному:\nmin = %s\nmax = %s', min, max);
  }
  else if (min < 0 || max < 0) {
    console.error('Ошибка: Минимальное и максимальное значения должны быть положительными или раными нулю:\nmin = %s\nmax = %s', min, max);
  }
  else if (min > max) {
    console.error('Ошибка: Минимальное значение больше максимального:\nmin = %s\nmax = %s', min, max);
  }
  else {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
};

/* Функция для проверки максимальной длины строки. */
const checkMaxLength = (line, maxLength) => line.length <= maxLength;

/* Функция для генерации комментариев к фотографии */
const generateComment = (count) => {
  const comments = [];

  const getMessage = function () {
    const result = [];
    for (let j = 1; j <= getRandomInteger(1, 2); j++) {
      result.push(COMMENTS[getRandomInteger(0, COMMENTS.length - 1)]);
    }
    return result.join(' ');
  };

  for (let i = 1; i <= count; i++) {
    comments.push({
      id: i,
      avatar: 'img/avatar-' + getRandomInteger(0, 6) + '.svg',
      message: getMessage(),
      name: NAMES[getRandomInteger(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomInteger(0, SURNAMES.length - 1)],
    });
  }
  return comments;
};

/* Функция для генерации информации о фотографии */
const generatePhoto = () => {
  const photos = [];

  for (let i = 1; i <= PHOTO_COUNT; i++) {
    photos.push({
      id: i,
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: generateComment(getRandomInteger(1, 15)),
    });
  }
  return photos;
};
