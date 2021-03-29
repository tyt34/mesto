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
const popupImgClose = document.getElementById('popup-img__close')
const popupContainerImg = document.querySelector('.popup-img__img')

renderList()
buttonEditOpen.addEventListener('click', openPopupEdit)
formEditSave.addEventListener('submit', editProfile)
buttonAddOpen.addEventListener('click', () => togglePopup(popupAdd))
buttonEditClose.addEventListener('click', () => togglePopup(popupEdit))
buttonAddClose.addEventListener('click', () => togglePopup(popupAdd))
popupImgClose.addEventListener('click', () => togglePopup(popupImg))
formAdd.addEventListener('submit', submitAddCardForm)
popupEdit.addEventListener('click', () => closeOverWithClick(event)) // new
popupAdd.addEventListener('click', () => closeOverWithClick(event))
popupImg.addEventListener('click', () => closeOverWithClick(event))

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open') /* найти открытый попап */
    console.log(openedPopup);
    closePopup(openedPopup)
  }
  if (event.key === ' ') {
    event.preventDefault()
  }
}
function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);
}
/*
function removePopup(popup) {
  popup.classList.remove('popup_open')
}
*/
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

function togglePopup(popup) { // надо поделить на две функции, но потом
  popup.classList.toggle('popup_open')
  document.addEventListener('keydown', closeByEscape) /* добавляет слушатель иначе не слушают*/
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
  //enableValidation(validationConfig); // new
  // надо правильно навесить обработчик.
  //console.log(' Вот раньше...');
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
  const addNewCard = createCard({title:inputAddTitle.value, link:inputAddLink.value})
  container.prepend(addNewCard)
  //popupAdd.classList.toggle('popup_open')
  togglePopup(popupAdd)
  inputAddTitle.value = ''
  inputAddLink.value = ''
  //enableValidation(validationConfig); // new
  // надо правильно навесить обработчик.
  //console.log(' Вот раньше...');
}
