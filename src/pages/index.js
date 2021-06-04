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
const api = new API(option, renderButton)
const defaultCardList = new Section({
  renderer: (item) => {
    defaultCardList.addItem(createCard(item))
  }
}, cardListSelector)

Promise.all(
  [api.getCardsFromServer(),api.getNowData()]
).then( (values) => {
  defaultCardList.renderItems(values[0])
  userInfo.setUserInfo(values[1])
  userInfo.getNowAvatar(values[1].avatar)
}).catch(
  (err) => console.log(err)
)

const profileFormValidator = new FormValidator(validationConfig, formEdit)
profileFormValidator.enableValidation()

const addCardFromValidator  = new FormValidator(validationConfig, formAdd)
addCardFromValidator.enableValidation()

const avatarFormValidator  = new FormValidator(validationConfig, formAvatar)
avatarFormValidator.enableValidation()

const popupForEdit = new PopupWithForm({
  data: popupClasses.edit,
  renderer: (item) => {
    renderButton(buttonEditSave, true, 'Сохранить', 'Сохранение...')
    const newProfile = api.loadProfile(item)
    newProfile.then( (res) => {
      userInfo.setUserInfo(item)
      popupForEdit.close()
    })
    .catch( (err) => {
      console.log(err)
    }).finally( () => {
      renderButton(buttonEditSave, false, 'Сохранить', 'Сохранение...')
    })
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
    renderButton(buttonAddSave, true, 'Создать', 'Создание...')
    const newCard = api.loadNewCard(item)
    newCard.then(
      (res) => {
        item._id = res._id
        defaultCardList.prependItem(createCard(item))
        popupForAdd.close()
        addCardFromValidator.disableSubmitButton()
      }
    ).catch( (err) => {
      console.log(err)
    }).finally( () => {
      renderButton(buttonAddSave, false, 'Создать', 'Создание...')
    })
  }
})
popupForAdd.setEventListeners()
buttonAddOpen.addEventListener('click', () => popupForAdd.open())

const popupForAvatar = new PopupWithForm({
  data: popupClasses.avatar,
  renderer: (item) => {
    renderButton(buttonAvatarEdit, true, 'Сохранить', 'Сохранение...')
    const newAva = api.changeAvatar(item)
    newAva.then( (res) => {
      userInfo.getNowAvatar(res.avatar)
      popupForAvatar.close()
      avatarFormValidator.disableSubmitButton()
    })
    .catch(
      (err) => console.log(err)
    ).finally( () => {
      renderButton(buttonAvatarEdit, false, 'Сохранить', 'Сохранение...')
    })
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
  renderButton(buttonDelInForm, true, 'Да', 'Удаление...')
  api.delCard(id).then(()=> {
      card.deleteCard()
      popupForDel.close()
  }).catch( (err) => {
      console.log(err)
  }).finally( () => {
    renderButton(buttonDelInForm, false, 'Да', 'Удаление...')
  })
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
    handleLikeClick
  )
  return card.createNewCard()
}

function renderButton(button, isLoading, text, answer) {
  if (isLoading) {
    button.textContent = answer
  } else {
    button.textContent = text
  }
}

function handleLikeClick(id, statusLike, card) {
  if (statusLike) {
    api.sendDislike(id)
    .then( (res) => {
      card.setLikes(res.likes)
    }).catch(
      (err) => console.log(err)
    )
  } else {
    api.sendLike(id)
    .then( (res) => {
      card.setLikes(res.likes)
    }).catch(
      (err) => console.log(err)
    )
  }
}
