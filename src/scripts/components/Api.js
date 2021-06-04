import {option} from '../utils/constants.js';

export default class API {
  constructor(option) {
    this._token = option.token
    this._cohortId = option.cohortId

    this._url = 'https://mesto.nomoreparties.co'
    this._me = '/v1/'+this._cohortId+'/users/me'
    this._ava = this._me+'/avatar'
    this._cards = '/v1/'+this._cohortId+'/cards'
    this._likes = this._url+this._cards+'/likes/'
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  getNowData() {
    return fetch(this._url+this._me, {
      headers: {
        authorization: this._token
      }
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  getCardsFromServer() {
    return fetch(this._url+this._cards, {
        headers: {
          authorization: this._token
        }
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  changeAvatar(link) {
    return fetch(this._url+this._ava, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.link
      })
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  loadProfile(obj) {
    return fetch(this._url+this._me, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: obj.name,
        about: obj.about,
      })
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  loadNewCard(obj) {
    return fetch(this._url+this._cards, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: obj.name,
        link: obj.link,
      })
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  delCard(id) {
    return fetch(this._url+this._cards+'/'+id, {
      method: 'DELETE',
      headers: {
          authorization: this._token
        }
      }).then(
        (res) => this._getResponseData(res)
      )
  }

  sendLike(id) {
    return fetch(this._likes+id, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    }).then(
      (res) => this._getResponseData(res)
    )
  }

  sendDislike(id) {
    return fetch(this._likes+id, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(
      (res) => this._getResponseData(res)
    )
  }
}
