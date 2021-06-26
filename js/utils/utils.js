/* eslint-disable no-console */
const FILTERS_VALUES =
{
  'none':
  {
    filter: null,
  },
  'chrome':
  {
    filterName: 'grayscale',
    filterStep: 0.1,
    filterMinValue: 0,
    filterMaxValue: 1,
    filterValueType: '',
  },
  'sepia':
  {
    filterName: 'sepia',
    filterStep: 0.1,
    filterMinValue: 0,
    filterMaxValue: 1,
    filterValueType: '',
  },
  'marvin':
  {
    filterName: 'invert',
    filterStep: 1,
    filterMinValue: 0,
    filterMaxValue: 100,
    filterValueType: '%',
  },
  'phobos':
  {
    filterName: 'blur',
    filterStep: 0.1,
    filterMinValue: 0,
    filterMaxValue: 3,
    filterValueType: 'px',
  },
  'heat':
  {
    filterName: 'brightness',
    filterStep: 0.1,
    filterMinValue: 1,
    filterMaxValue: 3,
    filterValueType: '',
  },
};


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


const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const isActiveElement = (element) => (document.activeElement === element);

export { getRandomInteger, isEscEvent, isActiveElement, FILTERS_VALUES };
