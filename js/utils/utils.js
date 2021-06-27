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

const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

const isActiveElement = (element) => (document.activeElement === element);

export { isEscEvent, isActiveElement, FILTERS_VALUES };
