import {closePopup} from './index.js';
import {openPopup} from './index.js';

export default class Card {
  constructor (item, selector, descrPopupImg, imgInPopupImg, popupImg, /*classForPopupOpen*/) {
    this._item = item
    this._selector = selector
    this._descrPopupImg = descrPopupImg
    this._imgInPopupImg = imgInPopupImg
    this._popupImg = popupImg
  }

  createNewCard() {
    this.templateElement = document.querySelector(this._selector)
    this.newItem = this.templateElement.content.cloneNode(true);
    this.picTemplate = this.newItem.querySelector('.place__img');
    this.textTemplate = this.newItem.querySelector('.place__title');
    this.picTemplate.src = this._item.link
    this.picTemplate.alt = this._createAltImg(this._item.title)
    this.textTemplate.textContent = this._item.title
    this.buttonLike = this.newItem.querySelector('.place__like')
    this.buttonDel = this.newItem.querySelector('.place__del')
    this.buttonLike.addEventListener('click', this._createLike)
    this.buttonDel.addEventListener('click', this._deleteCard)
    this.picTemplate.addEventListener('click', (event) => this._openImg(event, this._item.title, this._item.link)) // was ('click', this._openImg)
    return this.newItem
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }

  _createLike(event) { // event уже не нужен // теперь опять нужен
    const target = event.target;
    target.classList.toggle('place-like')
  }

  _deleteCard(event) { // event уже не нужен // теперь опять нужен
    const target = event.target;
    const currentCard = target.closest('.place');
    currentCard.remove();
  }

  _openImg = (event, title, link) => { // event уже не нужен // теперь опять нужен
    const target = event.target;
    this._descrPopupImg.textContent = title
    this._imgInPopupImg.src = link
    //this._popupImg.querySelector('.popup-img__img').alt = 'Изображение места: "'+title+'"'
    //this._popupImg.querySelector('.popup-img__img').alt = this._createAltImg(title)
    this._imgInPopupImg.alt = this._createAltImg(title)
    openPopup(this._popupImg)
  }
}
