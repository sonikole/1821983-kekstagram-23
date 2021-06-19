import {getRandomInteger} from './utils.js';

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

  for (let index = 1; index <= count; index++) {
    comments.push({
      id: index,
      avatar: `img/avatar-${  getRandomInteger(1, 6)  }.svg`,
      message: getMessage(),
      name: `${NAMES[getRandomInteger(0, NAMES.length - 1)]  } ${  SURNAMES[getRandomInteger(0, SURNAMES.length - 1)]}`,
    });
  }
  return comments;
};

/* Функция для генерации информации о фотографии */
const generatePhotos = (PHOTO_COUNT) => {
  const photos = [];

  for (let index = 1; index <= PHOTO_COUNT; index++) {
    photos.push({
      id: index,
      url: `photos/${  index  }.jpg`,
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInteger(15, 200),
      comments: generateComment(getRandomInteger(1, 15)),
    });
  }
  return photos;
};

export { generatePhotos };
