import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitCallback) {
    super(popupSelector);
    this._handleFormSubmitCallback = handleFormSubmitCallback;
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

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmitCallback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
