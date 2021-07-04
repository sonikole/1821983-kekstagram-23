

import { isEscEvent, isActiveElement } from '../utils/utils.js';

let messageSectionElement;
let messageInnerElement;
let messageButtonElement;

/* Оповещение:
закрытие сообщения */
const clickCloseMessage = (evt) => {
  const target = evt.target;
  const itsSection = target === messageInnerElement || messageInnerElement.contains(target);

  if (isEscEvent(evt) || isActiveElement(messageButtonElement) || !itsSection) {

    document.body.removeChild(messageSectionElement);

    messageButtonElement.removeEventListener('click', clickCloseMessage);
    document.removeEventListener('keydown', clickCloseMessage);
    document.removeEventListener('click', clickCloseMessage);
  }
};

/* Оповещение:
сообщение об успехе */
const addSuccessMessage = () => {
  const templateSuccessElement = document.querySelector('#success');
  const elementElement = templateSuccessElement.content.querySelector('.success');
  const clonedElement = elementElement.cloneNode(true);
  document.body.appendChild(clonedElement);

  messageSectionElement = document.querySelector('.success');
  messageInnerElement = document.querySelector('.success__inner');
  messageButtonElement = document.querySelector('.success__button');

  messageButtonElement.addEventListener('click', clickCloseMessage);
  document.addEventListener('keydown', clickCloseMessage);
  document.addEventListener('click', clickCloseMessage);
};

/* Оповещение:
сообщение об ошибке */
const addErrorMessage = (errorMessage, buttonMessage) => {
  const templateErrorElement = document.querySelector('#error');
  const elementElement = templateErrorElement.content.querySelector('.error');
  const clonedElement = elementElement.cloneNode(true);

  if (errorMessage !== undefined) {
    clonedElement.querySelector('.error__title').innerText = errorMessage;
  }
  if (buttonMessage !== undefined) {
    clonedElement.querySelector('.error__button').textContent = buttonMessage;
  }
  document.body.appendChild(clonedElement);

  messageSectionElement = document.querySelector('.error');
  messageInnerElement = document.querySelector('.error__inner');
  messageButtonElement = document.querySelector('.error__button');

  messageButtonElement.addEventListener('click', clickCloseMessage);
  document.addEventListener('keydown', clickCloseMessage);
  document.addEventListener('click', clickCloseMessage);
};

export { addErrorMessage,  addSuccessMessage};
