export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    const key = evt.key;
    if (key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButtons = this._popup.querySelectorAll(".popup__button-drop");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => this.close());
    });
    this._popup.addEventListener("click", (evt) => {
      if (evt.target == evt.currentTarget) {
        this.close();
      }
    });
  }
}
