let showPopupButton  = document.querySelector('.profile-char__edit')
let popup            = document.querySelector('.popup')
let closePopupButton = document.querySelector('.popup__close')
let textup   = document.querySelector('.profile-char__title').innerText
let textdo = document.querySelector('.profile-char__subtitle').innerText
let inputUp  = document.querySelector('.popup__name')
let inputDo  = document.querySelector('.popup__work')
let butnSave = document.querySelector('.popup__save-title')

inputUp.value = textup;
inputDo.value = textdo;

showPopupButton.addEventListener('click' , togglePopup);
closePopupButton.addEventListener('click' , togglePopup);
butnSave.addEventListener('click' , showL);

function togglePopup() {
  popup.classList.toggle('popup__open')
}

function showL() {
  document.getElementById("textUp").innerHTML = inputUp.value
  document.getElementById("textDo").innerHTML = inputDo.value
  togglePopup()
}

//console.log(inputUp);
//console.log(document.getElementById("textUp").innerHTML);
