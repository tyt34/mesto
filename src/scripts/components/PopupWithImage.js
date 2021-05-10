import Popup from '../components/Popup.js';
import {classForPopupOpen, selPopupClose} from '../utils/constants.js';


export default class PopupWithImage extends Popup {

  open = (event, title, link, text, img) => {
    super.open()
    const target = event.target;
    text.textContent = title
    img.src = link
    img.alt = this._createAltImg(title)
    this._selector.classList.add(classForPopupOpen)
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }
}
