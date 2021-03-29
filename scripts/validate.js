const validationConfig = {
  formSelector:         '.popup__form',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass:  'popup__save_disabled',
  inputErrorClass:      '.popup__input_type_error',
  errorClass:           'popup__error_visible',
}

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const formList = Array.from(
    document.querySelectorAll(formSelector)
  );

  formList.forEach(
    formElement => {
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      setInputListeners(formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass);
    }
  );
};

const setInputListeners = (formSelector, formElement, inputSelector, errorClass, submitButtonSelector, inactiveButtonClass) => { // навешивание слушателя
  const inputList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach(
    inputElement => {
      inputElement.addEventListener('input', () => {
        checkInput(formElement, inputElement, errorClass);
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    }
  );
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
    //console.log(buttonElement);
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true)
    //console.log('Нельзя');
    //console.log(formElement);
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
    //console.log('Можно');
  }
};

const checkInput = (formElement, inputElement, errorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, errorClass);
  } else {
    showInputError(formElement, inputElement, errorClass);
  }
};

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(errorClass)
};

const showInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage
  errorElement.classList.add(errorClass)
};

const allInputsEmpty = (inputList) => {
  return !inputList.some(inputElement => inputElement.value.length > 0);
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

enableValidation(validationConfig);
