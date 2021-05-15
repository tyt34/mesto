import {selPopupOpen, selPopupClose, classForPopupOpen} from '../utils/constants.js';

export default class Popup {
  constructor(selector) {
    this._popup = document.getElementById(selector.data)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add(classForPopupOpen)
    document.addEventListener('keydown', this._handleEscClose)
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(classForPopupOpen)) {
        this.close()
      }
    })

  }

  close() {
    this._popup.classList.remove(classForPopupOpen)
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
    }
  }

  setEventListeners() {
    const buttonForClose = this._popup.querySelector(selPopupClose)
    buttonForClose.addEventListener('click', (evt) => {
      this.close()
		});
  }
}
