import Popup from '../components/Popup.js'
import {validationConfig} from '../utils/constants.js'

export default class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector)
    this._popup = document.getElementById(selector.data)
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitCallback()
    })
  }
}
