import './index.css'; // импорт для билда

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js'
import {
  initialCards, validationConfig, profileSelectors, classForTemplate, buttonEditOpen,
  buttonEditSave, inputEditTitle, inputEditSubtit, buttonAddOpen, buttonAddSave,
  formAdd, formEdit, descrPopupImg, imgInPopupImg, popupImg,
  cardListSelector, popupClasses
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

/* START CLASS */
const profileFormValidator = new FormValidator(validationConfig, formEdit, buttonEditSave)
profileFormValidator.enableValidation()

const addCardFromValidator  = new FormValidator(validationConfig, formAdd, buttonAddSave)
addCardFromValidator.enableValidation()

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createCard(item))
  }
}, cardListSelector)
defaultCardList.renderItems();

const popupForEdit = new PopupWithForm({
  data: popupClasses.edit,
  renderer: (item) => {
    userInfo.setUserInfo(item)
  }
})
popupForEdit.setEventListeners()

const popupImage = new PopupWithImage({
  data: popupClasses.img
})
popupImage.setEventListeners()

const userInfo = new UserInfo(profileSelectors)

const popupForAdd = new PopupWithForm({
  data: popupClasses.add,
  renderer: (item) => {
    defaultCardList.prependItem(createCard(item))
    addCardFromValidator.disableSubmitButton()
  }
})
popupForAdd.setEventListeners()

buttonEditOpen.addEventListener('click',  () => {
  const textInProfile = userInfo.getUserInfo()
  inputEditTitle.value = textInProfile.title
  inputEditSubtit.value = textInProfile.subtitle
  profileFormValidator.enableSubmitButton()
  popupForEdit.open()
})

buttonAddOpen.addEventListener('click', () => popupForAdd.open())

/* FUNCTION */
function openPopupImg(title, link) {
  popupImage.open(title, link)
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
      openPopupImg(item.title, item.link)
    }
  )
  return card.createNewCard()
}
