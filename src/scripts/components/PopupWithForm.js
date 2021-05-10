import Popup from '../components/Popup.js';
import {validationConfig} from '../utils/constants.js';


export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector)
    this._handleFormSubmit = handleFormSubmit
  }

  _getInputValues() { // собирает данные всех полей формы
    this._inputList = this._selector.querySelectorAll(validationConfig.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners()
    const openedForm = this._selector.querySelector(validationConfig.formSelector)
    openedForm.addEventListener('submit',   (evt) => {
      event.preventDefault()
      this._handleFormSubmit()
      this.close()
    })
  }
}
