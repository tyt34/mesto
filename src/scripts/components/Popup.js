import {selPopupOpen, selPopupClose, classForPopupOpen, classPopupClose} from '../utils/constants.js';

export default class Popup {
  constructor(selector) {
    this._selector = document.getElementById(selector)
  }

  open() {
    this._selector.classList.add(classForPopupOpen)
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    const openedPopup = document.querySelector(selPopupOpen)
    openedPopup.classList.remove(classForPopupOpen)
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      event.preventDefault()
      const openedPopup = document.querySelector(selPopupOpen) // найти открытый попап
      openedPopup.classList.remove(classForPopupOpen)
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  setEventListeners() {
    const buttonForClose = this._selector.querySelector(selPopupClose)
    buttonForClose.addEventListener('click', (evt) => {
      this.close()
		});
  }
}
