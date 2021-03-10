const templateElement = document.querySelector('.template')
const container = document.querySelector('.places')
const popupEdit       = document.getElementById('popup-edit')
const buttonEditOpen  = document.querySelector('.profile-char__edit')
const buttonEditClose = document.getElementById('popup-edit__close')
const editTitle       = document.querySelector('.profile-char__title')
const editSubtit      = document.querySelector('.profile-char__subtitle')
const inputEditTitle  = document.getElementById('input-title')
const inputEditSubtit = document.getElementById('input-subtitle')
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
let imgs
let buttonsLike
let buttonsDel

renderList()
renderButtons()
buttonEditOpen.addEventListener('click', openPopupEdit)
buttonAddOpen.addEventListener('click', openPopupAdd)
formEditSave.addEventListener('submit', editProfile)
buttonEditClose.addEventListener('click', closePopupEdit)
buttonAddClose.addEventListener('click', closePopupAdd)
popupImgClose.addEventListener('click', closePopupImg)
formAdd.addEventListener('submit', submitAddCardForm)

function renderButtons() {
  buttonsLike = document.querySelectorAll('.place__like')
  buttonsDel = document.querySelectorAll('.place__del')
  imgs = document.querySelectorAll('.place__img')
  imgs.forEach((item, i) => {
    item.addEventListener('click', openImg)
  })
  buttonsLike.forEach((item, i) => {
    item.addEventListener('click', createLike)
  })
  buttonsDel.forEach((item, i) => {
    item.addEventListener('click', doDel)
  })
}

function doDel(event) {
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
  let textThisImg = target.parentNode.querySelector('.place__title').textContent
  descrPopupImg.textContent = textThisImg
  imgInPopupImg.src = target.src
  popupImg.alt = target.alt
  popupImg.classList.toggle('popup_open')
}

function closePopupImg(event) {
  popupImg.classList.toggle('popup_open')
}

function closePopupAdd(event) {
  popupAdd.classList.toggle('popup_open')
}

function closePopupEdit(event) {
  popupEdit.classList.toggle('popup_open')
}

function openPopupEdit(event) {
  inputEditTitle.value = editTitle.textContent
  inputEditSubtit.value = editSubtit.textContent
  popupEdit.classList.toggle('popup_open')
}

function openPopupAdd(event) {
  popupAdd.classList.toggle('popup_open')
}

function createCard(item){
	const newItem = templateElement.content.cloneNode(true);
  const picTemplate = newItem.querySelector('.place__img');
  const textTemplate = newItem.querySelector('.place__title');
  picTemplate.src = item.link
  picTemplate.alt = 'Изображение места: "'+item.title+'"'
  textTemplate.textContent = item.title
	return newItem;
}

function renderList() {
	const result = ARRPics.map(function(item) {
		const newCard = createCard(item);
		return newCard;
	});
	container.append(...result)
}

function editProfile(event) {
  event.preventDefault()
  editTitle.textContent = inputEditTitle.value
  editSubtit.textContent = inputEditSubtit.value
  closePopupEdit(event)
}

function submitAddCardForm(event) {
  event.preventDefault()
  let addNewCard = createCard({title:inputAddTitle.value, link:inputAddLink.value})
  container.prepend(addNewCard)
  renderButtons()
  closePopupAdd(event)
}
