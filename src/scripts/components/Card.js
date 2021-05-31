import {placeCardSelectors, popupClasses, option} from '../utils/constants.js';
//import {myId} from '../utils/pass.js';

import PopupWithSubmit from './PopupWithSubmit.js';


export default class Card {
  constructor (newCard, renderPopup, handleDelClick, sendLike, sendDislike) {
    //console.log(' 1) ',newCard)
    this._text = newCard.item.name
    this._item = newCard.item
    this._selector = newCard.classForTemplate
    this._descrPopupImg = newCard.descrPopupImg
    this._imgInPopupImg = newCard.imgInPopupImg
    this._popupImg = newCard.popupImg
    this._renderPopup = renderPopup
    this._handleDelClick = handleDelClick
    this._sendLike = sendLike
    this._sendDislike = sendDislike
    this._id = newCard.item._id
  }

  createNewCard() {
    this.templateElement = document.querySelector(this._selector)
    this.newItem = this.templateElement.content.querySelector(placeCardSelectors.place).cloneNode(true);

    this._delete = this.newItem.querySelector(placeCardSelectors.delet)

    this.picTemplate = this.newItem.querySelector(placeCardSelectors.picture)
    this.amountLikes = this.newItem.querySelector(placeCardSelectors.amountLikes)
    this.amountLikes.textContent = this._item.likes.length

    for(let i = 0; i<this._item.likes.length; i++) {
      if (this._item.likes[i]._id === option.myId) {
        this.newItem.querySelector(placeCardSelectors.like).classList.add(popupClasses.like)
      }
    }

    this.textTemplate = this.newItem.querySelector(placeCardSelectors.text)
    this.picTemplate.src = this._item.link
    this.picTemplate.alt = this._createAltImg(this._item.name)
    this.textTemplate.textContent = this._text
    this.buttonLike = this.newItem.querySelector(placeCardSelectors.like)

    this.buttonForDislike = this.newItem.querySelector(placeCardSelectors.dislike)

    if (this._item.owner._id === option.myId) {
      this.buttonDel = this.newItem.querySelector(placeCardSelectors.delet)
      this.buttonDel.addEventListener('click', () => this._handleDelClick(this._id, this))
    } else {
      this._delete.remove()
    }

    if (this.buttonForDislike) {
      this.buttonForDislike.addEventListener('click' , () => {
        this._sendDislike(this._id).then( (res) => {
          this.amountLikes.textContent = res.likes.length
        })
        this._createLike(event)
      })
    } else {
      this.buttonLike.addEventListener('click', () => {
        this._sendLike(this._id).then( (res) => {
          this.amountLikes.textContent = res.likes.length
        })
        this._createLike(event)
      })
    }

    this.picTemplate.addEventListener('click', this._renderPopup)
    return this.newItem
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }

  _createLike(event) { // event уже не нужен // теперь опять нужен
    console.log(' add --- > ');
    const target = event.target;
    target.classList.toggle(popupClasses.like)
  }

  _createDislike(event) { // event уже не нужен // теперь опять нужен
    console.log(' rem  --- > ');
    const target = event.target;
    target.classList.remove(popupClasses.like)
  }

  deleteCard = () => {
    this.newItem.remove()
    this.newItem = null // new
  }
}
