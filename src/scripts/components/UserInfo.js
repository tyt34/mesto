export default class UserInfo {
  constructor(selectors) {
    this._titleElement = document.querySelector(selectors.title)
    this._subtitleElement = document.querySelector(selectors.subtitle)
  }

  getUserInfo() {
    this._formValues = {}
    return {
      'title': this._titleElement.textContent,
      'subtitle': this._subtitleElement.textContent
    }
  }

  setUserInfo(newData) {
    //console.log('!!! -> ',newData);
    this._titleElement.textContent = newData.name
    this._subtitleElement.textContent = newData.about
  }
}
