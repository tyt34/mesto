import Popup from '../components/Popup.js';
import {validationConfig} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector)
    //console.log(selector);
    this._handleFormSubmit = selector.renderer
    this._form = this._popup.querySelector(validationConfig.formSelector)
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
    //console.log('4) ', openedForm)
    openedForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
      //console.log(this._getInputValues());
      this.close()
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
