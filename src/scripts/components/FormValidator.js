export default class FormValidator {
  constructor (conf, elemForValid) {
    //console.log('0) ', conf)
    //console.log('1) ', elemForValid)
    //console.log(' -------------------------------------------');
    this._conf = conf
    this._elem = elemForValid
    this._inputsList = Array.from( // инпуты каждого элемента
      this._elem.querySelectorAll(this._conf.inputSelector)
    )
    //console.log(' => ',this._conf.submitButtonSelector);
    this._buttonElement = this._elem.querySelector(this._conf.submitButtonSelector);
  }

  enableValidation() {
    //console.log(this._elem)
    this._elem.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    this._setInputListeners (this._conf.formSelector, this._conf.inputSelector, this._conf.submitButtonSelector, this._conf.inactiveButtonClass)
  }

  _setInputListeners = () => {
    this._inputsList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInput(inputElement, this._conf.errorClass)
          this._toggleButtonState()
        })
        this._toggleButtonState()
      }
    )
  }

  _hasInvalidInput = () => {
    return this._inputsList.some(inputElement => !inputElement.validity.valid)
  }

  _toggleButtonState = () => { // this._conf.inactiveButtonClass
    //console.log();
    if (this._hasInvalidInput(this._inputsList) || this._allInputsEmpty()) {
      //console.log('+');
      this.disableSubmitButton()
    } else {
      //console.log('-');
      this.enableSubmitButton()
    }
  }

  _allInputsEmpty = () => {
    return !this._inputsList.some(inputElement => inputElement.value.length > 0)
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._elem.querySelector(`#${inputElement.id}-error`)
    errorElement.classList.remove(this._conf.errorClass)
  }

  _showInputError = (inputElement) => {
    const errorElement = this._elem.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._conf.errorClass)
    //console.log(errorElement)
  }

  _checkInput = (inputElement) => {
    //console.log('-> ', inputElement)
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, this._conf.errorClass)
    } else {
      this._showInputError(inputElement, this._conf.errorClass)
    }
  }

  enableSubmitButton = () => { // on button
    //console.log(' ---> ') // popup-edit__save
    //console.log(this._buttonElement)
    this._buttonElement.classList.remove(this._conf.inactiveButtonClass)
    //console.log(this._conf.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled')
  }

  disableSubmitButton = () => { // off button
    this._buttonElement.classList.add(this._conf.inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', true)
  }
}
