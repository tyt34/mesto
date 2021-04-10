console.log(' start FormValidator');
const validationConfig = {
  formSelector:         '.popup__form',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass:  'popup__save_disabled',
  inputErrorClass:      '.popup__input_type_error',
  errorClass:           'popup__error_visible',
}
/*
Создайте класс FormValidator, который настраивает валидацию полей формы:

- принимает в конструктор объект настроек с селекторами и классами формы;

- принимает вторым параметром элемент той формы, которая валидируется;

- имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
изменяют состояние кнопки сабмита, устанавливают все обработчики;

- имеет один публичный метод enableValidation, который включает валидацию формы.

Для каждой проверяемой формы создайте экземпляр класса FormValidator.
*/

class FormValidator {
  constructor (conf, elemForValid) {
    this.conf = conf
    this.elem = elemForValid
  }

  enableValidation() {
    //console.log(' eV ',this.elem)
    this.elem.addEventListener('submit', (event) => {
      console.log(' off pD = = = =>'); // good
      event.preventDefault();
    });
    // тут навешиваются слушатели
    this.setInputListeners (this.conf.formSelector, this.elem, this.conf.inputSelector, this.conf.errorClass, this.conf.submitButtonSelector, this.conf.inactiveButtonClass)
  }

  setInputListeners = (formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass) => {
    //console.log(' 1 ', formSelector);
    //console.log(' 2 ', formElement);
    //console.log(' 3 ', inputSelector);
    //console.log(' 4 ', errorClass);
    //console.log(' 5 ', submitButtonSelector);
    //console.log(' 6 ', inactiveButtonClass);

    //console.log(' is => ',inputSelector);
    //let a = formElement.querySelectorAll(inputSelector)
    //console.log(' is is => ',a);
    const inputsList = Array.from( // инпуты каждого элемента
      //a
      //console.log('iL');
      formElement.querySelectorAll(inputSelector)
    );
    //console.log(' is is is => ',inputsList);
    /*
    const inputList = Array.from( // инпуты каждого элемента
      //console.log('iL');
      //formElement.querySelectorAll(inputSelector)
    );
    */


    const buttonElement = formElement.querySelector(submitButtonSelector);
    //console.log('bE');
    /*
    inputList.forEach(
      inputElement => {
        inputElement.addEventListener('input', () => {
          checkInput(formElement, inputElement, errorClass);
          console.log('tog 1');
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
        console.log('tog 2');
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      }
    );
    */
    inputsList.forEach(
      inputElement => {
        console.log('s 1');
        inputElement.addEventListener('input', () => {
          this.checkInput(formElement, inputElement, errorClass);
          //console.log('tog 1');

          this.toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
        });
        this.toggleButtonState(inputsList, buttonElement, inactiveButtonClass);

        //console.log(' i e => ',inputElement);
        //this.checkInput (formElement, inputElement, errorClass);
        //console.log('tog 1');
      }
    )
  }

  hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };

  toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    //console.log(' start tBS');

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
    //console.log('start Check');
    //console.log(inputElement.validity.valid);
    if (inputElement.validity.valid) {
      this.hideInputError(formElement, inputElement, errorClass);
      console.log('check 1');
    } else {
      this.showInputError(formElement, inputElement, errorClass);
      console.log('check 2')
    }
  };
}
