let showBt  = document.querySelector('.profile-char__edit')
let popup   = document.querySelector('.popup')
let closeBt = document.querySelector('.popup__close')
let textup  = document.querySelector('.profile-char__title')
let textdo  = document.querySelector('.profile-char__subtitle')
let inputUp = document.getElementById('popup-up')
let inputDo = document.getElementById('popup-do')
let formSav = document.querySelector('.popup__form')

closeBt.addEventListener('click' , togglePopup)
showBt.addEventListener('click' , togglePopup)
formSav.addEventListener('submit', savePopup)

function togglePopup(event) {
  //console.log('Open or Close popup')
  inputUp.value = textup.textContent
  inputDo.value = textdo.textContent
  popup.classList.toggle('popup_open')
}

function savePopup(event) {
  //console.log('Save popup and close popup')
  event.preventDefault()
  textup.textContent = inputUp.value
  textdo.textContent = inputDo.value
  togglePopup()
}
