import Card from './Card.js';
import {initialCards} from './initial-сards-U.js';
import FormValidator from './FormValidator.js'

const classForTemplate = '.template'
const classForPopupOpen     = 'popup_open'
const templateElement = document.querySelector(classForTemplate)
const container = document.querySelector('.places')
const popupEdit       = document.getElementById('popup-edit')
const buttonEditOpen  = document.querySelector('.profile-char__edit')
const buttonEditClose = document.getElementById('popup-edit__close')
const buttonEditSave = document.getElementById('popup-edit__save')
const editTitle       = document.querySelector('.profile-char__title')
const editSubtit      = document.querySelector('.profile-char__subtitle')
const inputEditTitle  = document.getElementById('input-profile-title')
const inputEditSubtit = document.getElementById('input-profile-subtitle')
const formEditSave    = document.querySelector('.popup__form')
const popupAdd       = document.getElementById('popup-add')
const buttonAddOpen  = document.querySelector('.profile-char__add')
const buttonAddClose = document.getElementById('popup-add__close')
const buttonAddSave = document.getElementById('popup-add__save')
const inputAddTitle  = document.getElementById('popup-add-title')
const inputAddLink   = document.getElementById('popup-add-link')
const formAdd        = document.getElementById('popup-add__form')
const formEdit        = document.getElementById('popup-edit__form')
const popupImgClose = document.getElementById('popup-img__close')
const popupContainerImg = document.querySelector('.popup-img__img')
const descrPopupImg = document.querySelector('.popup-img__title')
const imgInPopupImg = document.querySelector('.popup-img__img')
const popupImg      = document.querySelector('.popup-img')

const validationConfig = {
  formSelector:         '.popup__form',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass:  'popup__save_disabled',
  inputErrorClass:      '.popup__input_type_error',
  errorClass:           'popup__error_visible',
}

const startPopapEdit = new FormValidator(validationConfig, formEdit, buttonEditSave)
const startPopapAdd  = new FormValidator(validationConfig, formAdd, buttonEditSave)

renderAllCards(initialCards, container)

buttonEditOpen.addEventListener('click',  openPopupEdit)
formEditSave.addEventListener('submit',   editProfile)
buttonAddOpen.addEventListener('click',   () => openPopup(popupAdd))
buttonEditClose.addEventListener('click', () => closePopup(popupEdit))
buttonAddClose.addEventListener('click',  () => closePopup(popupAdd))
popupImgClose.addEventListener('click',   () => closePopup(popupImg))
formAdd.addEventListener('submit', submitAddCardForm)

closeOverWithClick(event)

startPopapEdit.enableValidation()
startPopapAdd.enableValidation()

function createCard(information) {
  const card = new Card(information, classForTemplate, descrPopupImg, imgInPopupImg, popupImg, /*classForPopupOpen*/)
  return card.createNewCard()
}

function submitAddCardForm(event) {
  event.preventDefault()
  container.prepend(createCard({title:inputAddTitle.value,link:inputAddLink.value}))
  closePopup(popupAdd)
  inputAddTitle.value = ''
  inputAddLink.value = ''
  buttonAddSave.classList.add('popup__save_disabled');
  buttonAddSave.setAttribute('disabled', true)
}

function renderAllCards(list, container) {
  const result = list.map(
    (item) => {
      return createCard(item)
    }
  )
  container.append(...result)

}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open') // найти открытый попап
    closePopup(openedPopup)
  }
}

export function openPopup(popup) {
  popup.classList.add(classForPopupOpen)
  document.addEventListener('keydown', closeByEscape)
}

export function closePopup(popup) {
  popup.classList.remove(classForPopupOpen);
  document.removeEventListener('keydown', closeByEscape);
}

function closeOverWithClick(event) {
  const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(classForPopupOpen)) {
       closePopup(popup)
     }
    })
  })
}

function openPopupEdit(event) {
  inputEditTitle.value = editTitle.textContent
  inputEditSubtit.value = editSubtit.textContent
  startPopapEdit.disableSubmitButton()
  openPopup(popupEdit)
}

function renderList() {
  const result = initialCards.map(function(item) {
    createCard(item);
  });
  container.append(...result)
}

function editProfile(event) {
  event.preventDefault()
  editTitle.textContent = inputEditTitle.value
  editSubtit.textContent = inputEditSubtit.value
  closePopup(popupEdit)
}
