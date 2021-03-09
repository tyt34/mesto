const ARRPics = [
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
//https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
const templateElement = document.querySelector('.template');
let showBt  = document.querySelector('.profile-char__edit')
//let popup   = document.querySelector('.popup')
let popup   = document.getElementById('popup-edit')
//let closeBt = document.querySelector('.popup__close')
let closeBt = document.getElementById('popup-edit__close')
let textup  = document.querySelector('.profile-char__title')
let textdw  = document.querySelector('.profile-char__subtitle')
let inputUp = document.getElementById('popup-up')
let inputDw = document.getElementById('popup-dw')
let formSav = document.querySelector('.popup__form') // форма попапа редактирования профиля
//let popupAdd    = document.querySelector('.popup-add')
let popupAdd    = document.getElementById('popup-add')
let addNewPlace = document.querySelector('.profile-char__add')
let closeAddBt  = document.getElementById('popup-add__close')
const container = document.querySelector('.places')
let popupForImg = document.querySelector('.popup-img')
let popupImg    = document.querySelector('.popup-img__img')
let popupImgTit = document.querySelector('.popup-img__title')
let popupImgCls = document.querySelector('.popup-img__close')
let formNewCard = document.getElementById('popup-add__form')
let formAddUp = document.getElementById('popup-add-up')
let formAddDw = document.getElementById('popup-add-dw')
let img
let butLike
let butDel
//let img

renderList()
renderButtons()
//console.log(img)
//console.log(butLike)
//console.log(butDel)
formSav.addEventListener('submit', editProfile.bind(null, popup))
showBt.addEventListener('click', openPopup.bind(null, 1, popup))
addNewPlace.addEventListener('click', openPopup.bind(null, 0, popupAdd))
closeBt.addEventListener('click', closePopup.bind(null, popup))
closeAddBt.addEventListener('click', closePopup.bind(null, popupAdd))
popupImgCls.addEventListener('click', closePopup.bind(null, popupForImg))
formNewCard.addEventListener('submit', createCard.bind(null, popup))

function renderButtons() {
  butLike = document.querySelectorAll('.place__like')
  butDel = document.querySelectorAll('.place__del')
  img = document.querySelectorAll('.place__img')

  img.forEach((item, i) => {
    item.addEventListener('click', openImg.bind(null, item))
  })

  butLike.forEach((item, i) => {
    item.addEventListener('click', createLike.bind(null, item))
  })

  butDel.forEach((item, i) => {
    item.addEventListener('click', doDel.bind(null, item))
  })
}


function doDel(item, event) {
  const target = event.target;
	const currentCard = target.closest('.place');
  //console.log(1,' ',event);
  //console.log(2,' ',target);
  //console.log(3,' ',currentCard);
	currentCard.remove();
}

function createLike(item, event) {
  //console.log(event);
  item.classList.toggle('place-like')
}

function openImg(item, event) {
  let textThisImg = item.parentNode.querySelector('.place__title').textContent
  //console.log(item);
  popupImgTit.textContent = textThisImg
  popupImg.src = item.src
  popupForImg.alt = item.alt
  popupForImg.classList.toggle('popup_open')
}

function closePopup(typPop, event) {
  //console.log('Close popup ',typPop)
  typPop.classList.toggle('popup_open')
}

function openPopup(char, typPop, event) {
  //console.log('This - ',char,' and this - ',typPop);
  if (char === 1) inputUp.value = textup.textContent
  if (char === 1) inputDw.value = textdw.textContent
  typPop.classList.toggle('popup_open')
}

function createCardDomNode(item){
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
		const newCard = createCardDomNode(item);
		return newCard;
	});
	container.append(...result)
}

function editProfile(typPop, event) {
  console.log('Save popup and ',typPop)
  event.preventDefault()
  textup.textContent = inputUp.value
  textdw.textContent = inputDw.value
  closePopup(typPop)
}

function createCard(typPop, event) {
  //console.log('Create card and ', typPop)
  event.preventDefault()
  //console.log(formAddUp.value)
  //console.log(formAddDw.value)
  //console.log({title:formAddUp.value, link:formAddDw.value})
  let addNewCard = createCardDomNode({title:formAddUp.value, link:formAddDw.value})
  container.prepend(addNewCard)
  renderButtons()
}
