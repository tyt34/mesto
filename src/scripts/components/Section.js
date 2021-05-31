export default class Section {
  //constructor(/*{ data, renderer },*/ containerSelector) {
  constructor({renderer }, containerSelector) {
    this._renderer = renderer
    //console.log(this._renderer)
    /*
    this._renderedItems = data
    */
    this._container = document.querySelector(containerSelector) // селектор контейнера
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems(array) {
    /*
    array.forEach(
      (item) => {
        this._renderer(item)
        //console.log(item)
      }
    )
    */

    //for (let i=0; i<5; i++) {
    for (let i=0; i<30; i++) {
      //console.log(array[i])
      //console.log(array[i].likes)
      //console.log(array[i].likes.length)
      //console.log(array[i].likes[0])
      this._renderer(array[i])
    }

  }
}
