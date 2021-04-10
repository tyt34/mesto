//console.log(' start Card ');

class Card {
  constructor (item, selector) {
    this._item = item
    this._selector = selector
  }

  createLike() { // event уже не нужен
    const target = event.target;
    target.classList.toggle('place-like')
  }

  deleteCard() { // event уже не нужен
    const target = event.target;
    const currentCard = target.closest('.place');
    currentCard.remove();
  }

  openImg() { // event уже не нужен
    const target = event.target;
    const textThisImg = target.parentNode.querySelector('.place__title').textContent
    descrPopupImg.textContent = textThisImg
    imgInPopupImg.src = target.src
    popupImg.alt = target.alt
    popupImg.classList.add('popup_open')
    document.addEventListener('keydown', closeByEscape)
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

    this.buttonLike.addEventListener('click', this.createLike)
    this.buttonDel.addEventListener('click', this.deleteCard)
    this.img.addEventListener('click', this.openImg)

    return this.newItem
  }
}
