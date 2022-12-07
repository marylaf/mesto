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
      return (allInputsValues[input.name] = input.value);
    });
    return allInputsValues;
  }

  setInputValues(name, about) {
    this._inputs.forEach((input) => {
      if (input.name == "name") {
        input.value = name;
      }
      if (input.name == "about") {
        input.value = about;
      }
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._formSubmitCallback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
