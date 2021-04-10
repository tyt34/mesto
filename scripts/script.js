const templateElement = document.querySelector('.template')
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
const popupImg      = document.querySelector('.popup-img')
const imgInPopupImg = document.querySelector('.popup-img__img')
const descrPopupImg = document.querySelector('.popup-img__title')
const popupImgClose = document.getElementById('popup-img__close')
const popupContainerImg = document.querySelector('.popup-img__img')

const validationConfig = {
  formSelector:         '.popup__form',
  inputSelector:        '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass:  'popup__save_disabled',
  inputErrorClass:      '.popup__input_type_error',
  errorClass:           'popup__error_visible',
}

const startPopapEdit = new FormValidator(validationConfig, formEdit)
const startPopapAdd  = new FormValidator(validationConfig, formAdd)

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

function submitAddCardForm(event) {
  event.preventDefault()
  const addNewCard = new Card(
    {
      title:inputAddTitle.value,
      link:inputAddLink.value
    },
    '.template'
  )
  container.prepend(addNewCard.createNewCard())
  closePopup(popupAdd)

  inputAddTitle.value = ''
  inputAddLink.value = ''
  buttonAddSave.classList.add('popup__save_disabled');
  buttonAddSave.setAttribute('disabled', true)
}

function renderAllCards(list, container) {
  const result = list.map(
    (item) => {
      const newCard = new Card(item, '.template')
      //console.log(' start test ');
      //newCard.met1()
      return newCard.createNewCard()
    }
  )
  container.append(...result)

}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open') // найти открытый попап
    closePopup(openedPopup)
  }
  if (event.key === ' ') {
    event.preventDefault()
  }
}

function openPopup(popup) {
  popup.classList.add('popup_open')
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);
}

function closeOverWithClick(event) {
  const popups = document.querySelectorAll('.popup')
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_open')) {
       closePopup(popup)
     }
    })
  })
}
/*
function deleteCard(event) {
  const target = event.target;
  const currentCard = target.closest('.place');
  currentCard.remove();
}
*/
/*
function createLike(event) {
  const target = event.target;
  target.classList.toggle('place-like')
}
*/
/*
function openImg(event) {
  const target = event.target;
  const textThisImg = target.parentNode.querySelector('.place__title').textContent
  descrPopupImg.textContent = textThisImg
  imgInPopupImg.src = target.src
  popupImg.alt = target.alt
  openPopup(popupImg)
}
*/
function openPopupEdit(event) {
  inputEditTitle.value = editTitle.textContent
  inputEditSubtit.value = editSubtit.textContent
  buttonEditSave.classList.remove('popup__save_disabled')
  buttonEditSave.removeAttribute('disabled')
  openPopup(popupEdit)
}
/*
function createCard(item){
  const newItem = templateElement.content.cloneNode(true);
  const picTemplate = newItem.querySelector('.place__img');
  const textTemplate = newItem.querySelector('.place__title');
  picTemplate.src = item.link
  picTemplate.alt = 'Изображение места: "'+item.title+'"'
  textTemplate.textContent = item.title
  const buttonLike = newItem.querySelector('.place__like')
  const buttonDel = newItem.querySelector('.place__del')
  const img = newItem.querySelector('.place__img')
  buttonLike.addEventListener('click', createLike)
  buttonDel.addEventListener('click', deleteCard)
  img.addEventListener('click', openImg)
  //console.log(newItem);
  return newItem;
}
*/
function renderList() {
  const result = initialCards.map(function(item) {
    const newCard = createCard(item);
    //console.log(newCard);
    return newCard;
  });
  container.append(...result)
}

function editProfile(event) {
  event.preventDefault()
  editTitle.textContent = inputEditTitle.value
  editSubtit.textContent = inputEditSubtit.value
  closePopup(popupEdit)
}
