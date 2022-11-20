import {
  popupImage,
  openPopup,
  deleteItem,
  setImageCardValues,
} from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    this._view = cardItem;
  }

  createCard() {
    // Запишем разметку в приватное поле _view.
    // Так у других элементов появится доступ к ней.
    this._getTemplate();
    this._addCardListeners();
    // Добавим данные

    this._view.querySelector(".elements__image").src = this._data.link;
    this._view.querySelector(".elements__image").alt = this._data.link;
    this._view.querySelector(".elements__name").textContent = this._data.name;
    this._link = this._view.querySelector(".elements__image").src;
    this._name = this._view.querySelector(".elements__name").textContent;
    // Вернём элемент наружу
    return this._view;
  }

  _addCardListeners() {
    this._view
      .querySelector(".elements__button")
      .addEventListener("click", function () {
        this.classList.toggle("elements__button_active");
      });

    this._view
      .querySelector(".popup__button-trash")
      .addEventListener("click", deleteItem);

    this._view
      .querySelector(".elements__image")
      .addEventListener("click", (e) => {
        setImageCardValues(e);
        openPopup(popupImage);
      });
  }
}
