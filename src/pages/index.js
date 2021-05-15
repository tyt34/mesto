import './index.css'; // импорт для билда

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js'
import {
  initialCards, validationConfig, selTitle, selSubtitle, classForTemplate,
  classForPopupOpen, container, buttonEditOpen, buttonEditSave, inputEditTitle,
  inputEditSubtit, buttonAddOpen, buttonAddSave, inputAddTitle, inputAddLink,
  formAdd, formEdit, descrPopupImg, imgInPopupImg, popupImg, popupImgSelector,
  cardListSelector, popupEditSelector, popupAddSelector, selPopup
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

/* START CLASS */
const startPopapEdit = new FormValidator(validationConfig, formEdit, buttonEditSave)
startPopapEdit.enableValidation()

const startPopapAdd  = new FormValidator(validationConfig, formAdd, buttonAddSave)
startPopapAdd.enableValidation()

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createCard(item))
  }
}, cardListSelector)
defaultCardList.renderItems();

const popupForEdit = new PopupWithForm({
  data: popupEditSelector,
  renderer: (item) => {
    objSels.setUserInfo(item)
  }
})
popupForEdit.setEventListeners()

let openedPopupImg = new PopupWithImage({
  data: popupImgSelector
})
openedPopupImg.setEventListeners()

const objSels = new UserInfo({selTitle, selSubtitle})

const popupForAdd = new PopupWithForm({
  data: popupAddSelector,
  renderer: (item) => {
    defaultCardList.prependItem(createCard(item))
    startPopapAdd.disableSubmitButton(buttonAddSave)
  }
})
popupForAdd.setEventListeners()

buttonEditOpen.addEventListener('click',  () => {
  const textInProfile = objSels.getUserInfo()
  inputEditTitle.value = textInProfile.title
  inputEditSubtit.value = textInProfile.subtitle
  startPopapEdit.enableSubmitButton(buttonEditSave)
  popupForEdit.open()
})

buttonAddOpen.addEventListener('click', () => popupForAdd.open())

/* FUNCTION */
function openPopupImg(event, title, link) {
  openedPopupImg.open(title, link)
}

function createCard(item) { // функция по взаимодействию с классом по созданию карточки
  const card = new Card(
    {
      item,
      classForTemplate,
      descrPopupImg,
      imgInPopupImg,
      popupImg,
    },
    (evt) => {
      openPopupImg(event, item.title, item.link)
    }
  )
  return card.createNewCard()
}
