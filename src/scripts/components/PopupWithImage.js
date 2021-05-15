import Popup from '../components/Popup.js';
import {selPopupImgForImg, selPopupImgForTitle} from '../utils/constants.js';


export default class PopupWithImage extends Popup {
  constructor(selector){
     super(selector)
     this._img = this._popup.querySelector(selPopupImgForImg)
     this._text = this._popup.querySelector(selPopupImgForTitle)
   }

  open = (title, link) => {
    super.open()
    const target = event.target;
    this._img.src = link
    this._img.alt = this._createAltImg(title)
    this._text.innerHTML = this._createAltImg(title)
  }

  _createAltImg = (specialWord) => {
    return 'Изображение места: "'+specialWord+'"'
  }
}
