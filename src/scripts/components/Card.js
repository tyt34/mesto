import {
  popupImgSelector, selPicTemplate, selTextTemplate, selButtonLike, buttonDel, selForDelCard, selForCreateLike
} from '../utils/constants.js';

export default class Card {
  constructor (newCard, renderPopup) {
    this._item = newCard[Object.keys(newCard)[0]]
    this._selector = newCard[Object.keys(newCard)[1]]
    this._descrPopupImg = newCard[Object.keys(newCard)[2]]
    this._imgInPopupImg = newCard[Object.keys(newCard)[3]]
    this._popupImg = newCard[Object.keys(newCard)[4]]
    this._renderPopup = renderPopup
  }

  createNewCard() {
    this.templateElement = document.querySelector(this._selector)
    this.newItem = this.templateElement.content.cloneNode(true);
    this.picTemplate = this.newItem.querySelector(selPicTemplate);
    this.textTemplate = this.newItem.querySelector(selTextTemplate);
    this.picTemplate.src = this._item.link
    this.picTemplate.alt = this._createAltImg(this._item.title)
    this.textTemplate.textContent = this._item.title
    this.buttonLike = this.newItem.querySelector(selButtonLike)
    this.buttonDel = this.newItem.querySelector(buttonDel)
    this.buttonLike.addEventListener('click', this._createLike)
    this.buttonDel.addEventListener('click', this._deleteCard)
    this.picTemplate.addEventListener('click', this._renderPopup)
    return this.newItem
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }

  _createLike(event) { // event уже не нужен // теперь опять нужен
    const target = event.target;
    target.classList.toggle(selForCreateLike)
  }

  _deleteCard(event) { // event уже не нужен // теперь опять нужен
    const target = event.target;
    const currentCard = target.closest(selForDelCard);
    currentCard.remove();
  }
}
