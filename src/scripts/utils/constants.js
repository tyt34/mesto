//export default
export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//export initialCards
export const validationConfig = {
  formSelector:         '.popup__form',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass:  'popup__save_disabled',
  inputErrorClass:      '.popup__input_type_error',
  errorClass:           'popup__error_visible',
}
export const selTitle = '.profile-char__title'
export const selSubtitle = '.profile-char__subtitle'
export const selPopup = '.popup'
export const selPopupOpen = '.popup_open'
export const selPopupClose = '.popup__close'
export const classPopupClose = 'popup__close'
export const classForTemplate = '.template'
export const classForPopupOpen     = 'popup_open'
export const container = document.querySelector('.places') // класс куда отрисовывать карточки
export const buttonEditOpen  = document.querySelector('.profile-char__edit')
export const buttonEditSave = document.getElementById('popup-edit__save')
export const inputEditTitle  = document.getElementById('input-profile-title')
export const inputEditSubtit = document.getElementById('input-profile-subtitle')
export const buttonAddOpen  = document.querySelector('.profile-char__add')
export const buttonAddSave = document.getElementById('popup-add__save')
export const inputAddTitle  = document.getElementById('popup-add-title')
export const inputAddLink   = document.getElementById('popup-add-link')
export const formAdd        = document.getElementById('popup-add__form')
export const formEdit        = document.getElementById('popup-edit__form')
export const descrPopupImg = document.querySelector('.popup-img__title')
export const imgInPopupImg = document.querySelector('.popup-img__img')
export const popupImg      = document.querySelector('.popup-img')
export const popupImgSelector = 'popup-img'
export const cardListSelector = '.places'
export const popupEditSelector = 'popup-edit'
export const popupAddSelector = 'popup-add'

export const selPicTemplate = '.place__img'
export const selTextTemplate = '.place__title'
export const selButtonLike = '.place__like'
export const buttonDel = '.place__del'
export const selForCreateLike = 'place-like'
export const selForDelCard = '.place'
