import {option} from '../utils/constants.js';

export default class API {
  constructor(option, renderButtonEdit, renderButtonAvatar, renderButtonAdd, renderButtonDel) {
    this._token = option.token
    this._cohortId = option.cohortId

    this._url = 'https://mesto.nomoreparties.co'
    this._me = '/v1/'+this._cohortId+'/users/me'
    this._ava = this._me+'/avatar'
    this._cards = '/v1/'+this._cohortId+'/cards'
    this._likes = this._cards+'/likes/'

    this._renderButtonEdit   = renderButtonEdit
    this._renderButtonAvatar = renderButtonAvatar
    this._renderButtonAdd    = renderButtonAdd
    this._renderButtonDel    = renderButtonDel
  }

  getNowData() {
    return fetch(this._url+this._me, {
        headers: {
          authorization: this._token
        }
      }).then(
        (res) => {
          return res.json()
        }
      ).catch( (err) => {
        renderError(`Ошибка: ${err}`)
    })
  }

  changeAvatar(link) {
    this._renderButtonAvatar(true)
    fetch(this._url+this._ava, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.link
      })
    }).then(
      (res) => {
        return res.json()
      }
    ).then(
      (res) => {
      }
    ).catch( (err) => {
      renderError(`Ошибка: ${err}`)
    }).finally( () => {
      this._renderButtonAvatar(false)
    })
  }

  loadProfile(obj) {
    this._renderButtonEdit(true)
    fetch(this._url+this._me, {
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
      (res) => {
        return res.json()
      }
    ).then(
      (res) => {
      }
    ).catch( (err) => {
      renderError(`Ошибка: ${err}`)
    }).finally( () => {
      this._renderButtonEdit(false)
    })
  }

  getCardsFromServer() {
    return fetch(this._url+this._cards, {
        headers: {
          authorization: this._token
        }
      }).then(
        (res) => {
          return res.json()
        }
      ).catch( (err) => {
        renderError(`Ошибка: ${err}`)
    })
  }

  loadNewCard(obj) {
    this._renderButtonAdd(true)
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
      (res) => {
        return res.json()
      }
    ).catch( (err) => {
      renderError(`Ошибка: ${err}`)
    }).finally( () => {
      this._renderButtonAdd(false)
    })
  }

  delCard(id) {
    this._renderButtonDel(true)
    return fetch(this._url+this._cards+'/'+id, {
      method: 'DELETE',
      headers: {
          authorization: this._token
        }
      }).then(
        (res) => {
          return res.json()
        }
      ).catch( (err) => {
        renderError(`Ошибка: ${err}`)
    }).finally( () => {
      this._renderButtonDel(false)
    })
  }

  sendLike(id) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/'+id, { // почему то this._cards тут undifined
      method: 'PUT',
      headers: {
          authorization: this._token
        }
      }).then(
        (res) => {
          return res.json()
        }
      ).catch( (err) => {
        renderError(`Ошибка: ${err}`)
    })
  }

  sendDislike(id) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/'+id, { // почему то this._cards тут undifined 
      method: 'DELETE',
      headers: {
          authorization: this._token
        }
      }).then(
        (res) => {
          return res.json()
        }
      ).catch( (err) => {
        renderError(`Ошибка: ${err}`)
    })
  }
}
