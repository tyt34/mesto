//console.log(' start FormValidator');
class FormValidator {
  constructor (conf, elemForValid) {
    this.conf = conf
    this.elem = elemForValid
  }

  enableValidation() {
    this.elem.addEventListener('submit', (event) => {
      event.preventDefault();
    }); // тут навешиваются слушатели
    this.setInputListeners (this.conf.formSelector, this.elem, this.conf.inputSelector, this.conf.errorClass, this.conf.submitButtonSelector, this.conf.inactiveButtonClass)
  }

  setInputListeners = (formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass) => {
    const inputsList = Array.from( // инпуты каждого элемента
      formElement.querySelectorAll(inputSelector)
    );

    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputsList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          this.checkInput(formElement, inputElement, errorClass);
          this.toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
        });
        this.toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
      }
    )
  }

  hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this.hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
      buttonElement.removeAttribute('disabled')
    }
  };

  allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
  };

  hideInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass)
  };

  showInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(errorClass)
  };

  checkInput = (formElement, inputElement, errorClass) => {
    if (inputElement.validity.valid) {
      this.hideInputError(formElement, inputElement, errorClass);
    } else {
      this.showInputError(formElement, inputElement, errorClass);
    }
  };
}
