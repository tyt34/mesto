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
]

export const validationConfig = {
  formSelector:         '.popup__form',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass:  'popup__save_disabled',
  inputErrorClass:      '.popup__input_type_error',
  errorClass:           'popup__error_visible',
}

export const profileSelectors = {
   title: '.profile-char__title',
   subtitle:  '.profile-char__subtitle'
}

export const popupSelectors = {
   popup: '.popup',
   open: '.popup_open',
   close: '.popup__close'
}

export const popupClasses = {
  close: 'popup__close',
  open: 'popup_open',
  img: 'popup-img',
  edit: 'popup-edit',
  add: 'popup-add',
  like: 'place-like',
  avatar: 'popup-avatar',
  del: 'popup-del',
}

export const placeCardSelectors = {
  picture: '.place__img',
  text: '.place__title', //
  like: '.place__like',
  delet: '.place__del',
  place: '.place',
  amountLikes: '.place__num',
  dislike: '.place-like'
}

export const popupImgSelectors = {
  picture: '.popup-img__img',
  title: '.popup-img__title'
}

export const option = {
  token: '54e47a58-a3be-4854-bdb0-d150680efc4c',
  cohortId: 'cohort-24',
  myId: "34f519f4db31bcdefd2e9e7c"
}

export const classForTemplate = '.template'
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
export const formEdit       = document.getElementById('popup-edit__form')
export const formAvatar     = document.getElementById('popup-avatar__form')
export const buttonAvatarEdit = document.getElementById('popup-avatar__save')
export const buttonDelInForm = document.getElementById('popup-del__save')
export const buttonDelCard = document.getElementById('place__del')
export const descrPopupImg = document.querySelector(popupImgSelectors.title)
export const imgInPopupImg = document.querySelector(popupImgSelectors.picture)
export const popupImg      = document.querySelector(popupClasses.img)
export const cardListSelector = '.places'
export const avatarInProfile = document.querySelector('.profile__img')
export const buttonAvatar  = document.querySelector('.profile__edit')
//export const buttonAvatarOpen  = document.querySelector('.profile-char__add')


//export const selForCreateLike = 'place-like'
//export const selTitle = '.profile-char__title'
//export const selSubtitle = '.profile-char__subtitle'
//export const selPopup = '.popup'
//export const selPopupOpen = '.popup_open'
//export const selPopupClose = '.popup__close'
//export const classPopupClose = 'popup__close'
//export const classForPopupOpen     = 'popup_open'
//export const popupImgSelector = 'popup-img'
//export const popupEditSelector = 'popup-edit'
//export const popupAddSelector = 'popup-add'
//export const selPicTemplate = '.place__img'
//export const selTextTemplate = '.place__title'
//export const selButtonLike = '.place__like'
//export const buttonDel = '.place__del'
//export const selForDelCard = '.place'
//export const selPopupImgForImg = '.popup-img__img'
//export const selPopupImgForTitle = '.popup-img__title'
