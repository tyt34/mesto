//console.log(' start FormValidator');
export default class FormValidator {
  constructor (conf, elemForValid) {
    this._conf = conf
    this._elem = elemForValid
    this._inputsList = Array.from( // инпуты каждого элемента
      this._elem.querySelectorAll(this._conf.inputSelector)
    );

  }

  enableValidation() {
    this._elem.addEventListener('submit', (event) => {
      event.preventDefault();
    }); // тут навешиваются слушатели
    this._setInputListeners (this._conf.formSelector, this._conf.inputSelector, this._conf.submitButtonSelector, this._conf.inactiveButtonClass)
  }

  _setInputListeners = (formSelector, inputSelector, submitButtonSelector, inactiveButtonClass) => {
    const buttonElement = this._elem.querySelector(this._conf.submitButtonSelector);
    this._inputsList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInput(inputElement, this._conf.errorClass);
          this._toggleButtonState(this._inputsList, buttonElement, this._conf.inactiveButtonClass);
        });
        this._toggleButtonState(this._inputsList, buttonElement, this._conf.inactiveButtonClass);
      }
    )
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
      this.disableSubmitButton(buttonElement)
    } else {
      this.enableSubmitButton(buttonElement)
    }
  }

  _allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._elem.querySelector(`#${inputElement.id}-error`)
    errorElement.classList.remove(this._conf.errorClass)
  }

  _showInputError = (inputElement) => {
    const errorElement = this._elem.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._conf.errorClass)
  }

  _checkInput = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, this._conf.errorClass)
    } else {
      this._showInputError(inputElement, this._conf.errorClass)
    }
  }

  enableSubmitButton = (button) => { // on button
    button.classList.remove(this._conf.inactiveButtonClass)
    button.removeAttribute('disabled')
  }

  disableSubmitButton = (button) => { // off button
    button.classList.add(this._conf.inactiveButtonClass)
    button.setAttribute('disabled', true)
  }
}
