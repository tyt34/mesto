import Popup from '../components/Popup.js';
import {popupImgSelectors} from '../utils/constants.js';


export default class PopupWithImage extends Popup {
  constructor(selector){
     super(selector)
     this._img = this._popup.querySelector(popupImgSelectors.picture)
     this._text = this._popup.querySelector(popupImgSelectors.title)
   }

  open = (title, link) => {
    super.open()
    this._img.src = link
    this._img.alt = this._createAltImg(title)
    this._text.textContent = this._createAltImg(title)
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }
}
