import '../../pages/index.css';
/*
import jacques from './images/jacques.png';
import logo from './images/logo.svg';

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Жак', image: jacques },
  { name: 'Лого', link: logo },
];
*/
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import {
  initialCards, validationConfig, selTitle, selSubtitle, classForTemplate,
  classForPopupOpen, container, buttonEditOpen, buttonEditSave, inputEditTitle,
  inputEditSubtit, buttonAddOpen, buttonAddSave, inputAddTitle, inputAddLink,
  formAdd, formEdit, descrPopupImg, imgInPopupImg, popupImg, popupImgSelector,
  cardListSelector, popupEditSelector, popupAddSelector, selPopup
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

/* START CLASS */
const startPopapEdit = new FormValidator(validationConfig, formEdit, buttonEditSave)
const startPopapAdd  = new FormValidator(validationConfig, formAdd, buttonAddSave)

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(
      {
        item,
        classForTemplate,
        descrPopupImg,
        imgInPopupImg,
        popupImg
      },
      (evt) => {
        openPopupImg(
          event,
          item.title,
          item.link,
          descrPopupImg,
          imgInPopupImg
        )
      }
    )
    const cardElement = card.createNewCard()
    defaultCardList.addItem(cardElement)
  }
}, cardListSelector)

defaultCardList.renderItems();

const popupForEdit = new PopupWithForm(popupEditSelector, () => {
  let newTitle = inputEditTitle.value
  let newSubtitle = inputEditSubtit.value
  objSels.getNewText({newTitle,newSubtitle})
})

buttonEditOpen.addEventListener('click',  () => {
  inputEditTitle.value = objSels.getOldText().title
  inputEditSubtit.value = objSels.getOldText().subtitle
  startPopapEdit.enableSubmitButton(buttonEditSave)
  popupForEdit.open()
})
popupForEdit.setEventListeners()
startPopapEdit.enableValidation()

const popupForAdd = new PopupWithForm(popupAddSelector, () => {
  container.prepend(createCard(
    {
      title: inputAddTitle.value,
      link: inputAddLink.value
    }
  ))
  inputAddTitle.value = ''
  inputAddLink.value = ''
  startPopapAdd.disableSubmitButton(buttonAddSave)
})
buttonAddOpen.addEventListener('click', () => popupForAdd.open())
popupForAdd.setEventListeners()
startPopapAdd.enableValidation()

const objSels = new UserInfo({selTitle, selSubtitle})

closeOverWithClick(event)

const closeWithCross = new Popup(popupImgSelector) // я не знаю, как сделать это по красоте
closeWithCross.setEventListeners() // но на данный момент это самое лучшее что я могу выдать


/* FUNCTION */
function openPopupImg(event, title, link, description, image) {
  let openedPopupImg = new PopupWithImage(popupImgSelector)
  openedPopupImg.open(
    event,
    title,
    link,
    description,
    image
  )
}

function createCard(information) { // функция по взаимодействию с классом по созданию карточки
  const card = new Card(
    {
      information,
      classForTemplate,
      descrPopupImg,
      imgInPopupImg,
      popupImg,
    },
    (evt) => {
      openPopupImg(
        event,
        information.title,
        information.link,
        descrPopupImg,
        imgInPopupImg
      )
    }
  )
  return card.createNewCard()
}

function closeOverWithClick(event) { // закрытие попапа при нажатие вне его формы
  const popups = document.querySelectorAll(selPopup)
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(classForPopupOpen)) {
       new Popup().close()
     }
    })
  })
}
