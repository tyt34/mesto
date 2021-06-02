import {placeCardSelectors, popupClasses, option} from '../utils/constants.js';
import PopupWithSubmit from './PopupWithSubmit.js';
import API from './PopupWithSubmit.js';

export default class Card {
  constructor (newCard, renderPopup, handleDelClick, handleLikeClick) {
    this._text = newCard.item.name
    this._item = newCard.item
    this._selector = newCard.classForTemplate
    this._descrPopupImg = newCard.descrPopupImg
    this._imgInPopupImg = newCard.imgInPopupImg
    this._popupImg = newCard.popupImg
    this._renderPopup = renderPopup
    this._handleDelClick = handleDelClick
    this._handleLikeClick = handleLikeClick
    this._id = newCard.item._id
  }

  createNewCard() {
    this.templateElement = document.querySelector(this._selector)
    this.newItem = this.templateElement.content.querySelector(placeCardSelectors.place).cloneNode(true);

    this._delete = this.newItem.querySelector(placeCardSelectors.delet)

    this.picTemplate = this.newItem.querySelector(placeCardSelectors.picture)
    this._amountLikes = this.newItem.querySelector(placeCardSelectors.amountLikes)
    this._amountLikes.textContent = this._item.likes.length


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

    this.buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._id, this._checkLikes(), this)
    })

    this.setLikes(this._item.likes)
    this.picTemplate.addEventListener('click', this._renderPopup)
    return this.newItem
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }

  deleteCard = () => {
    this.newItem.remove()
    this.newItem = null // new
  }

  _checkLikes() {
    return this._likes.some(like => {
      return like._id === option.myId
    })
  }

  setLikes(array) {
    this._likes = array
    this._amountLikes.textContent = array.length
    if (this._checkLikes()) {
      this.newItem.querySelector(placeCardSelectors.like).classList.add(popupClasses.like)
    } else {
      this.newItem.querySelector(placeCardSelectors.like).classList.remove(popupClasses.like)
    }
  }
}
