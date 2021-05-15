import { placeCardSelectors, popupClasses} from '../utils/constants.js';

export default class Card {
  constructor (newCard, renderPopup) {
    this._item = newCard.item
    this._selector = newCard.classForTemplate
    this._descrPopupImg = newCard.descrPopupImg
    this._imgInPopupImg = newCard.imgInPopupImg
    this._popupImg = newCard.popupImg

    this._renderPopup = renderPopup
  }

  createNewCard() {
    this.templateElement = document.querySelector(this._selector)
    this.newItem = this.templateElement.content.querySelector(placeCardSelectors.place).cloneNode(true);
    this.picTemplate = this.newItem.querySelector(placeCardSelectors.picture)
    this.textTemplate = this.newItem.querySelector(placeCardSelectors.text)
    this.picTemplate.src = this._item.link
    this.picTemplate.alt = this._createAltImg(this._item.title)
    this.textTemplate.textContent = this._item.title
    this.buttonLike = this.newItem.querySelector(placeCardSelectors.like)
    this.buttonDel = this.newItem.querySelector(placeCardSelectors.delet)
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
    target.classList.toggle(popupClasses.like)
  }

  _deleteCard(event) { // event уже не нужен // теперь опять нужен
    const target = event.target;
    const currentCard = target.closest(placeCardSelectors.place);
    currentCard.remove();
  }
}
