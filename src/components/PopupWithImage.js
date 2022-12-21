import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._name = this._popup.querySelector(".popup__subtitle");
  }
  open(src, name) {
    this._image.src = src;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}
