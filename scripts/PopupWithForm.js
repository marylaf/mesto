import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._popup.querySelectorAll(".popup__info");
  }
  _getInputValues() {
    const allInputsValues = {};
    this._inputs.forEach((input) => {
      return (allInputsValues[input.id] = input.value);
    });
    return allInputsValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._formSubmitCallback(this._getInputValues());
      this._popup.reset();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
