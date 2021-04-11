//console.log(' start FormValidator');
export default class FormValidator {
  constructor (conf, elemForValid, buttonEditSave) {
    this._conf = conf
    this._elem = elemForValid
    this._buttonEditSave = buttonEditSave

    this._inputsList = Array.from( // инпуты каждого элемента
      this._elem.querySelectorAll(this._conf.inputSelector)
    );

  }

  enableValidation() {
    this._elem.addEventListener('submit', (event) => {
      event.preventDefault();
    }); // тут навешиваются слушатели
    this._setInputListeners (this._conf.formSelector, /*this._elem,*/ this._conf.inputSelector, /*this._conf.errorClass,*/ this._conf.submitButtonSelector, this._conf.inactiveButtonClass)
  }

  _setInputListeners = (formSelector, /*formElement,*/ inputSelector, /*errorClass,*/ submitButtonSelector, inactiveButtonClass /*this._conf.inactiveButtonClass*/) => {
    /*
    const inputsList = Array.from( // инпуты каждого элемента
      formElement.querySelectorAll(inputSelector)
    );
    */
    const buttonElement = /*formElement*/this._elem.querySelector(submitButtonSelector);
    /*
    inputsList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInput(formElement, inputElement, errorClass);
          this._toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
        });
        this._toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
      }
    )
    */
    this._inputsList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInput(/*formElement,*/ inputElement, this._conf.errorClass);
          this._toggleButtonState(this._inputsList, buttonElement, /*inactiveButtonClass*/this._conf.inactiveButtonClass);
        });
        this._toggleButtonState(this._inputsList, buttonElement, /*inactiveButtonClass*/this._conf.inactiveButtonClass);
      }
    )
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState = (inputList, buttonElement, inactiveButtonClass /*this._conf.inactiveButtonClass*/) => {
    if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
      buttonElement.classList.add(/*inactiveButtonClass*/ this._conf.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(/*inactiveButtonClass*/ this._conf.inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  }

  _allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  }

  _hideInputError = (/*formElement, */inputElement/*, errorClass*/) => {
    //const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    const errorElement = this._elem.querySelector(`#${inputElement.id}-error`)
    errorElement.classList.remove(/*errorClass*/this._conf.errorClass)
  }

  _showInputError = (/*formElement, */inputElement/*, errorClass*/) => {
    //const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    const errorElement = this._elem.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(/*errorClass*/this._conf.errorClass)
  }

  _checkInput = (/*formElement,*/ inputElement/*, errorClass*/) => {
    if (inputElement.validity.valid) {
      this._hideInputError(/*formElement, */inputElement, /*errorClass*/this._conf.errorClass)
    } else {
      this._showInputError(/*formElement, */inputElement, /*errorClass*/this._conf.errorClass)
    }
  }

  disableSubmitButton = (button) => {
    //console.log(' --> ',button);
    //this._buttonEditSave.classList.remove(this._conf.inactiveButtonClass)
    //this._buttonEditSave.removeAttribute('disabled')
    button.classList.remove(this._conf.inactiveButtonClass)
    button.removeAttribute('disabled')
  }
  /*
  enableSubmitButton = (button) => {
    console.log(' --> ',button);
    //this._buttonEditSave.classList.remove(this._conf.inactiveButtonClass)
    //this._buttonEditSave.removeAttribute('disabled')
    button.classList.add(this._conf.inactiveButtonClass)
    button.addAttribute('disabled')
  }
  */
}
