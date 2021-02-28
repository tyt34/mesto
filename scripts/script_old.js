let showBt  = document.querySelector('.profile-char__edit')
let popup   = document.querySelector('.popup')
let closeBt = document.querySelector('.popup__close')
let textup  = document.querySelector('.profile-char__title')
let textdo  = document.querySelector('.profile-char__subtitle')
let saveBt  = document.querySelector('.popup__save')
let inputUp = document.getElementById('popup-up')
let inputDo = document.getElementById('popup-do')

inputUp.value = textup.textContent
inputDo.value = textdo.textContent

showBt.addEventListener('click' , togglePopup);
closeBt.addEventListener('click' , togglePopup);
saveBt.addEventListener('click' , showPopup);

function togglePopup(event) {
  popup.classList.toggle('popup_open')
}
function showPopup(event) {
  event.preventDefault()
  textup.textContent = inputUp.value
  textdo.textContent = inputDo.value
  togglePopup()
}
