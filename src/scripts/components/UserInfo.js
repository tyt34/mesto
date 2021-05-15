export default class UserInfo {
  constructor(selectors) {
    this._selTitle = document.querySelector(selectors.selTitle)
    this._selSubtitle = document.querySelector(selectors.selSubtitle)
  }

  getUserInfo() {
    this._formValues = {}
    return {
      'title': this._formValues['title'] = this._selTitle.textContent,
      'subtitle': this._formValues['subtitle'] = this._selSubtitle.textContent
    }
  }

  setUserInfo(newData) {
    this._selTitle.textContent = newData.name
    this._selSubtitle.textContent = newData.kind
  }
}
