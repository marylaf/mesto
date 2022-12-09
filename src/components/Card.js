export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._image = data.link;
    this._title = data.name;
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

    // Добавим данные
    this._imageElement = this._view.querySelector(".elements__image");
    this._imageElement.src = this._image;
    this._imageElement.alt = this._title;

    this._view.querySelector(".elements__name").textContent = this._title;
    this._addCardListeners();
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
      .addEventListener("click", function (evt) {
        const currentElement = evt.target.closest(".elements__item");
        currentElement.remove();
      });
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
