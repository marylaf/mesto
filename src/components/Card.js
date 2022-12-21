export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._image = data.link;
    this._title = data.name;
    this._likes = data.likes;
    this._id = data.id;
    this._userOwnId = data.userOwnId;
    this._ownerId = data.ownerId;
  }

  _getTemplate() {
    const cardItem = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._view = cardItem;
  }

  putLikes(newLikes) {
    this._likes = newLikes;
    this._likeCount = this._view.querySelector(".elements__button-count");
    this._likeCount.textContent = this._likes.length;

    if (this.isLiked()) {
      this._setLike();
    } else {
      this._removeLike();
    }
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
    this._deleteElement = this._view.querySelector(".popup__button-trash");
    this._likeElement = this._view.querySelector(".elements__button");
    this.putLikes(this._likes);

    if (this._ownerId !== this._userOwnId) {
      this._deleteElement.classList.add("popup__button-trash_type_none");
    }

    this._addCardListeners();
    // Вернём элемент наружу
    return this._view;
  }

  deleteAnyCard() {
    this._view.remove();
    this._view = null;
  }

  isLiked() {
    const userLike = this._likes.some((user) => user._id === this._userOwnId);
    return userLike;
  }

  _setLike() {
    this._likeElement.classList.add("elements__button_active");
  }

  _removeLike() {
    this._likeElement.classList.remove("elements__button_active");
  }

  _addCardListeners() {
    this._view
      .querySelector(".elements__button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._id);
      });

    this._deleteElement.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._imageElement.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
