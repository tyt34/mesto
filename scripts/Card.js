import {closePopup} from './index.js';
import {openPopup} from './index.js';

export default class Card {
  constructor (item, selector, descrPopupImg, imgInPopupImg, popupImg, /*classForPopupOpen*/) {
    this._item = item
    this._selector = selector
    this._descrPopupImg = descrPopupImg
    this._imgInPopupImg = imgInPopupImg
    this._popupImg = popupImg
    //this._classForPopupOpen = classForPopupOpen
  }

  createNewCard() {
    this.templateElement = document.querySelector(this._selector)
    this.newItem = this.templateElement.content.cloneNode(true);
    this.picTemplate = this.newItem.querySelector('.place__img');
    this.textTemplate = this.newItem.querySelector('.place__title');
    this.picTemplate.src = this._item.link
    this.picTemplate.alt = 'Изображение места: "'+this._item.title+'"'
    this.textTemplate.textContent = this._item.title
    this.buttonLike = this.newItem.querySelector('.place__like')
    this.buttonDel = this.newItem.querySelector('.place__del')
    this.img = this.newItem.querySelector('.place__img')
    this.buttonLike.addEventListener('click', this._createLike)
    this.buttonDel.addEventListener('click', this._deleteCard)
    this.img.addEventListener('click', () => this._openImg(event, this._item.title, this._item.link)) // was ('click', this._openImg)
    return this.newItem
  }

  _createLike() { // event уже не нужен
    const target = event.target;
    target.classList.toggle('place-like')
  }

  _deleteCard() { // event уже не нужен
    const target = event.target;
    const currentCard = target.closest('.place');
    currentCard.remove();
  }

  _closeByEscape() {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_open')
      closePopup(openedPopup) 
    }
  }

  _openImg = (event, title, link) => { // event уже не нужен // теперь опять нужен
    const target = event.target;
    this._descrPopupImg.textContent = title
    this._imgInPopupImg.src = link
    this._popupImg.alt = target.alt
    openPopup(this._popupImg)
    //this._popupImg.classList.add(this._classForPopupOpen) // was add('popup_open')
    //document.addEventListener('keydown', this._closeByEscape)
  }
}
