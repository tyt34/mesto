export default class FormValidator
//console.log(' start FormValidator');
class FormValidator {
  constructor (conf, elemForValid) {
    this._conf = conf
    this._elem = elemForValid
  }

  enableValidation() {
    this._elem.addEventListener('submit', (event) => {
      event.preventDefault();
    }); // тут навешиваются слушатели
    this._setInputListeners (this._conf.formSelector, this._elem, this._conf.inputSelector, this._conf.errorClass, this._conf.submitButtonSelector, this._conf.inactiveButtonClass)
  }

  _setInputListeners = (formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass) => {
    const inputsList = Array.from( // инпуты каждого элемента
      formElement.querySelectorAll(inputSelector)
    );

    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputsList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInput(formElement, inputElement, errorClass);
          this._toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
        });
        this._toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
      }
    )
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  };

  _allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  };

  _hideInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass)
  };

  _showInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(errorClass)
  };

  _checkInput = (formElement, inputElement, errorClass) => {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, errorClass);
    } else {
      this._showInputError(formElement, inputElement, errorClass);
    }
  };
}
