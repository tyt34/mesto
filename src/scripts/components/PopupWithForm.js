import Popup from '../components/Popup.js';
import {validationConfig, inputAddTitle, inputAddLink} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector)
    this._handleFormSubmit = selector.renderer
  }

  _getInputValues() { // собирает данные всех полей формы
    this._inputList = this._popup.querySelectorAll(validationConfig.inputSelector)
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    });
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    const openedForm = this._popup.querySelector(validationConfig.formSelector)
    openedForm.addEventListener('submit',   (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues()) // я не знаю в чем смысл этого
      this.close()
    })
  }

  close() {
    super.close()
    inputAddTitle.value = ''
    inputAddLink.value = ''
  }
}
