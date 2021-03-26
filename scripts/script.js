const templateElement = document.querySelector('.template')
const container = document.querySelector('.places')
const popupEdit       = document.getElementById('popup-edit')
const buttonEditOpen  = document.querySelector('.profile-char__edit')
const buttonEditClose = document.getElementById('popup-edit__close')
const editTitle       = document.querySelector('.profile-char__title')
const editSubtit      = document.querySelector('.profile-char__subtitle')
const inputEditTitle  = document.getElementById('input-profile-title')
const inputEditSubtit = document.getElementById('input-profile-subtitle')
const formEditSave    = document.querySelector('.popup__form')
const popupAdd       = document.getElementById('popup-add')
const buttonAddOpen  = document.querySelector('.profile-char__add')
const buttonAddClose = document.getElementById('popup-add__close')
const inputAddTitle  = document.getElementById('popup-add-title')
const inputAddLink   = document.getElementById('popup-add-link')
const formAdd        = document.getElementById('popup-add__form')
const popupImg      = document.querySelector('.popup-img')
const imgInPopupImg = document.querySelector('.popup-img__img')
const descrPopupImg = document.querySelector('.popup-img__title')
const popupImgClose = document.querySelector('.popup-img__close')
const popup = document.querySelector('.popup')
const popupContainerEdit = document.getElementById('popup__container_edit')
const popupContainerAdd = document.getElementById('popup__container_add')
const popupContainerImg = document.querySelector('.popup-img__img')

renderList()
buttonEditOpen.addEventListener('click', openPopupEdit)
formEditSave.addEventListener('submit', editProfile)
buttonAddOpen.addEventListener('click', () => togglePopup(popupAdd))
buttonEditClose.addEventListener('click', () => togglePopup(popupEdit))
buttonAddClose.addEventListener('click', () => togglePopup(popupAdd))
popupImgClose.addEventListener('click', () => togglePopup(popupImg))
formAdd.addEventListener('submit', submitAddCardForm)
//buttonEditOpen.addEventListener('keydown', () => closeWithEscEdit(event))
//buttonAddOpen.addEventListener('keydown', () => closeWithEscAdd(event))
popupEdit.addEventListener('click', () => closeOverWithClickEdit(event))
popupAdd.addEventListener('click', () => closeOverWithClickAdd(event))
popupImg.addEventListener('click', () => closeOverWithClickImg(event))
document.addEventListener('keydown', (event) => closePopupWithEsc(event))

function closePopupWithEsc(evt) {
  removeWithEsc(popupImg)
  removeWithEsc(popupAdd)
  removeWithEsc(popupEdit)
}

function removeWithEsc(popup) {
  if (event.key === 'Escape') {
    removePopup(popup)
  }
  if (event.key === ' ') {
    event.preventDefault()
  }
}

function removePopup(popup) {
  popup.classList.remove('popup_open')
}

/*
function closeWithEscEdit(event) {
  removeWithEsc(popupEdit)
}
*/
/*
function closeWithEscAdd(event) {
  removeWithEsc(popupAdd)
}
*/

function closeOverWithClickImg(event) {
  if (!popupContainerImg.contains(event.target)) {
    removePopup(popupImg)
  }
}

function closeOverWithClickAdd(event) {
  if (!popupContainerAdd.contains(event.target)) {
    removePopup(popupAdd)
  }
}

function closeOverWithClickEdit(event) {
  if (!popupContainerEdit.contains(event.target)) {
    removePopup(popupEdit)
  }
}

function togglePopup(popup) {
  popup.classList.toggle('popup_open')
}

function deleteCard(event) {
  const target = event.target;
  const currentCard = target.closest('.place');
  currentCard.remove();
}

function createLike(event) {
  const target = event.target;
  target.classList.toggle('place-like')
}

function openImg(event) {
  const target = event.target;
  const textThisImg = target.parentNode.querySelector('.place__title').textContent
  descrPopupImg.textContent = textThisImg
  imgInPopupImg.src = target.src
  popupImg.alt = target.alt
  togglePopup(popupImg)
}

function openPopupEdit(event) {
  inputEditTitle.value = editTitle.textContent
  inputEditSubtit.value = editSubtit.textContent
  togglePopup(popupEdit)
  enableValidation(validationConfig); // new
}

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
  return newItem;
}

function renderList() {
  const result = initialCards.map(function(item) {
    const newCard = createCard(item);
    return newCard;
  });
  container.append(...result)
}

function editProfile(event) {
  event.preventDefault()
  editTitle.textContent = inputEditTitle.value
  editSubtit.textContent = inputEditSubtit.value
  togglePopup(popupEdit)
}

function submitAddCardForm(event) {
  event.preventDefault()
  let addNewCard = createCard({title:inputAddTitle.value, link:inputAddLink.value})
  container.prepend(addNewCard)
  popupAdd.classList.toggle('popup_open')
  inputAddTitle.value = ''
  inputAddLink.value = ''
  enableValidation(validationConfig); // new
}
