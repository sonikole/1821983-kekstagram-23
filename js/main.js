/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// const MAX_COMMENT_LENGHT = 140;

/** Функция, возвращающая случайное целое число из переданного диапазона включительно.*/
const getRandomInteger = (min, max) => {
  if (typeof min !== 'number' && typeof max !== 'number') {
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

/**Функция для проверки максимальной длины строки.*/
const checkMaxLength = (line, maxLength) => line.length <= maxLength;
