import Popup from '../components/Popup.js'
import {validationConfig} from '../utils/constants.js'

export default class PopupWithSubmit extends Popup {
  constructor(selector) {
    super(selector)
    this._popup = document.getElementById(selector.data)
  }

  setSubmitAction(submitAction) {
    //console.log('3) ', submitAction)
    this._handleSubmitCallback = submitAction
  }

  setEventListeners() {
    super.setEventListeners()
    //console.log(' - -> ')
    //console.log(this._popup)
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      //console.log(' -> ');
      this._handleSubmitCallback()
    })
  }
}
