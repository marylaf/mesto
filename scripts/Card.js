import { setImageCardValues } from "./index.js";
import { openPopup, deleteItem, popupImage } from "./index.js";

const initialCards = [
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Владимир",
    link: "https://images.unsplash.com/photo-1603804705524-aab416179f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1654&q=80",
  },
  {
    name: "Краснодар",
    link: "https://images.unsplash.com/photo-1607193721101-171099f8f217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
  {
    name: "Сочи",
    link: "https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
  {
    name: "Владивосток",
    link: "https://images.unsplash.com/photo-1629813366051-b58137b2792c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Якутск",
    link: "https://images.unsplash.com/photo-1657070969523-f59f91f9c3d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
  },
];

export class Card {
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

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, ".template_type_default");
  // Создаём карточку и возвращаем наружу
  const cardItem = card.createCard();

  // Добавляем в DOM
  document.querySelector(".elements__container").append(cardItem);
});
