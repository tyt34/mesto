import {popupSelectors, popupClasses} from '../utils/constants.js';

export default class Popup {
  constructor(selector) {
    //console.log(selector)
    this._popup = document.getElementById(selector.data)
    //console.log(this._popup);
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleCrossClose = this._handleCrossClose.bind(this)
  }

  open() {
    this._popup.classList.add(popupClasses.open)
    document.addEventListener('keydown', this._handleEscClose)
    document.addEventListener('click', this._handleCrossClose)
  }

  close() {
    this._popup.classList.remove(popupClasses.open)
    document.removeEventListener('keydown', this._handleEscClose)
    document.removeEventListener('click', this._handleClose)
    document.removeEventListener('click', this._handleCrossClose)
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.close()
    }
  }

  _handleCrossClose() {
    //console.log(' cross ');
    if (event.target.classList.contains(popupClasses.open)) {
      //console.log(event)
      this.close()
    }
  }

  _handleClose() {
    this.close()
  }

  setEventListeners() {
    const buttonForClose = this._popup.querySelector(popupSelectors.close)
    buttonForClose.addEventListener('click', this._handleClose)
  }
}
