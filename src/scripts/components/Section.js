export default class Section {
  constructor({renderer }, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector) // селектор контейнера
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems(array) {
    array.forEach(
      (item) => {
        this._renderer(item)
        //console.log(item)
      }
    )
    /*
    //for (let i=0; i<5; i++) {
    for (let i=0; i<30; i++) {
      this._renderer(array[i])
    }
    */
  }
}
