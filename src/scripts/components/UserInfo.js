export default class UserInfo {
  constructor(selectors) {
    this._selTitle = selectors.selTitle
    this._selSubtitle = selectors.selSubtitle
  }

  getOldText() {
    this._formValues = {}
    return {
      'title': this._formValues['title'] = document.querySelector(this._selTitle).textContent,
      'subtitle': this._formValues['subtitle'] = document.querySelector(this._selSubtitle).textContent
    }
  }

  getNewText(newData) {
    document.querySelector(this._selTitle).textContent = newData.newTitle
    document.querySelector(this._selSubtitle).textContent = newData.newSubtitle
  }
}
