console.log(' start Card ');
/*
Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:

принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный и наполненный
данными элемент карточки.

Для каждой карточки создайте экземпляр класса Card.
*/

/*
Класс карточки занимается одной отдельно карточкой.

То есть класс Card должен создавать одну единственную карточку (плюс навешивать
слушателей событий), а уже некий внешний код, например в index.js будет пробегаться
по данным и создавать все карточки и вставлять их на страницу
*/

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
