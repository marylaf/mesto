export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._view = cardItem;
  }
  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose() {
    const key = evt.key;
    if (key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  }
  setEventListeners() {
    popups.forEach((popup) => {
      popup.addEventListener("click", function (evt) {
        if (evt.target == evt.currentTarget) {
          closePopup(popup);
        }
      });
    });
  }
}
