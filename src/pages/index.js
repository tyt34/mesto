import './index.css'; // импорт для билда

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js'
import {
  initialCards, validationConfig, profileSelectors, classForTemplate, buttonEditOpen,
  buttonEditSave, inputEditTitle, inputEditSubtit, buttonAddOpen, buttonAddSave,
  formAdd, formEdit, descrPopupImg, imgInPopupImg, popupImg,
  cardListSelector, popupClasses, buttonAvatar, formAvatar, buttonAvatarEdit,
  avatarInProfile, buttonDelCard, option, buttonDelInForm
} from '../scripts/utils/constants.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import API from '../scripts/components/Api.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';

/* START CLASS */
const api = new API(option, renderButtonEdit, renderButtonAvatar, renderButtonAdd, renderButtonDel)
const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item))
  }
}, cardListSelector)

const cardsOnServer = api.getCardsFromServer()
const allCards = cardsOnServer.then((res) => {
  defaultCardList.renderItems(res)
  return res
})

const profileFormValidator = new FormValidator(validationConfig, formEdit)
profileFormValidator.enableValidation()

const addCardFromValidator  = new FormValidator(validationConfig, formAdd)
addCardFromValidator.enableValidation()

const avatarFormValidator  = new FormValidator(validationConfig, formAvatar)
avatarFormValidator.enableValidation()

const popupForEdit = new PopupWithForm({
  data: popupClasses.edit,
  renderer: (item) => {
    userInfo.setUserInfo(item)
    api.loadProfile(item)
  }
})
popupForEdit.setEventListeners()

const popupImage = new PopupWithImage({
  data: popupClasses.img
})
popupImage.setEventListeners()

const userInfo = new UserInfo(profileSelectors)

const popupForAdd = new PopupWithForm({
  data: popupClasses.add, // popup-add
  renderer: (item) => {
    item.likes = []
    item.owner = {}
    item.owner._id = option.myId
    const newCard = api.loadNewCard(item)
    newCard.then(
      (res) => {
        item._id = res._id
        defaultCardList.prependItem(createCard(item))
      }
    )
    addCardFromValidator.disableSubmitButton()
  }
})
popupForAdd.setEventListeners()
buttonAddOpen.addEventListener('click', () => popupForAdd.open())

const popupForAvatar = new PopupWithForm({
  data: popupClasses.avatar,
  renderer: (item) => {
    api.changeAvatar(item)
    console.log(' -=> ')
    avatarFormValidator.disableSubmitButton()
    updateProfile()
  }
})
popupForAvatar.setEventListeners()
buttonAvatar.addEventListener('click', () => popupForAvatar.open())

const popupForDel = new PopupWithSubmit({
  data: popupClasses.del
})

buttonEditOpen.addEventListener('click',  () => {
  profileFormValidator.enableSubmitButton()
  const textInProfile = userInfo.getUserInfo()
  inputEditTitle.value = textInProfile.title
  inputEditSubtit.value = textInProfile.subtitle
  popupForEdit.open()
})

/* FUNCTION */
function openPopupImg(title, link) {
  popupImage.open(title, link)
}

function handleDelClick(id, card) {
  popupForDel.setSubmitAction(() => handlePopupConfirm(id, card))
  popupForDel.open()
  popupForDel.setEventListeners()
}

function handlePopupConfirm(id, card) {
  api.delCard(id).then(()=> {
      card.deleteCard()
      popupForDel.close()
    })
    .catch((err) => {
      console.log(err);
      popupForDel.close();
    });
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
      openPopupImg(item.name, item.link)
    },
    handleDelClick,
    api.sendLike,
    api.sendDislike
  )
  return card.createNewCard()
}

function updateProfile() {
  const textInProfile = api.getNowData()
  textInProfile.then( (res) => {
    userInfo.setUserInfo(res)
    avatarInProfile.src = res.avatar
    return res
  })
}

function renderButtonEdit(isLoading) {
  if (isLoading) {
    buttonEditSave.textContent = 'Сохранение...'
  } else {
    buttonEditSave.textContent = 'Сохранить'
  }
}

function renderButtonAvatar(isLoading) {
  if (isLoading) {
    buttonAvatarEdit.textContent = 'Сохранение...'
  } else {
    buttonAvatarEdit.textContent = 'Сохранить'
  }
}

function renderButtonAdd(isLoading) {
  if (isLoading) {
    buttonAddSave.textContent = 'Создание...'
  } else {
    buttonAddSave.textContent = 'Создать'
  }
}

function renderButtonDel(isLoading) {
  if (isLoading) {
    buttonDelInForm.textContent = 'Удаление...'
  } else {
    buttonDelInForm.textContent = 'Да'
  }
}

updateProfile()
