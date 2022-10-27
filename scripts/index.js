const mainPopup = document.querySelector(".popup");
const profilePopup = document.querySelector(".profile-popup");
const cardName = document.querySelector(".elements__name");
const popupCard = document.querySelector(".popup_type_add-card");
const editButton = document.querySelector(".profile__pencil");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editCardButton = document.querySelector(".profile__button");
const allCard = document.querySelector(".elements__container");
const cardImage = document.querySelector(".elements__image");
const saveBtn = document.querySelector(".popup__button-save");
const popupImage = document.querySelector(".popup_type_card-image");
const template = document.querySelector(".template");
const cardValueImage = document.querySelector(".popup__image");
const cardValueSbt = document.querySelector(".popup__subtitle");

// Находим форму в DOM

const popupForm = profilePopup.querySelector(".popup__form");

// Находим поля формы в DOM

const nameInput = popupForm.querySelector(".popup__info_form_title");

const jobInput = popupForm.querySelector(".popup__info_form_subtitle");

//Универсальные функции открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

const deleteItem = (evt) => {
  const currentElement = evt.target.closest(".elements__item");
  currentElement.remove();
};

const setImageCardValue = (evt) => {
  const currentItemIndex = evt.target.closest(".elements__image");
  const currentItemIndexName = evt.target
    .closest(".elements__item")
    .querySelector(".elements__name");
  cardValueImage.src = currentItemIndex.src;
  cardValueImage.alt = currentItemIndex.alt;

  cardValueSbt.textContent = currentItemIndexName.textContent;
};

editCardButton.addEventListener("click", () => openPopup(popupCard));

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

popups = [profilePopup, popupCard, popupImage];

// функция закрытия попапа overlay

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target == evt.currentTarget) {
      closePopup(popup);
    }
  });
});

// функция закрытия при нажатии на Esc

popups.forEach((popup) => {
  document.addEventListener("keydown", function (evt) {
    const key = evt.key;
    if (key === "Escape") {
      closePopup(popup);
    }
  });
});

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__button-drop");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

//Функция переноса данных

function setInputValue() {
  nameInput.value = profileTitle.textContent;

  jobInput.value = profileSubtitle.textContent;
}

// Функция изменения данных

function setTextValue() {
  profileTitle.textContent = nameInput.value;

  profileSubtitle.textContent = jobInput.value;
}

function openPopupCardProfile() {
  setInputValue();
  openPopup(profilePopup);
}
editButton.addEventListener("click", () => openPopupCardProfile(profilePopup));

// Функция сохранения данных

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  setTextValue();

  closePopup(mainPopup);
}

popupForm.addEventListener("submit", handleProfileFormSubmit);

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

function createCard(link, name) {
  const currentItem = template.content.cloneNode(true);
  const currentImage = currentItem.querySelector(".elements__image");
  const currentName = currentItem.querySelector(".elements__name");
  currentImage.src = link;
  currentImage.alt = name;
  currentName.textContent = name;
  addListeners(currentItem);
  return currentItem;
}

// // Функция добавления новой карточки

const nameInputNewCard = popupCard.querySelector(".popup__info_form_name");
const linkInput = popupCard.querySelector(".popup__info_form_link");

function addNewItem(name, link, isPrepend = true) {
  const item = createCard(link, name);

  if (isPrepend) {
    allCard.prepend(item);
  } else {
    allCard.append(item);
  }
  linkInput.value = "";
  nameInputNewCard.value = "";
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addNewItem(nameInputNewCard.value, linkInput.value);
  closePopup(popupCard);
}

popupCard.addEventListener("submit", handleCardFormSubmit);

function addListeners(card) {
  const like = card.querySelector(".elements__button");

  like.addEventListener("click", () => {
    like.classList.toggle("elements__button_active");
  });

  const trashBtn = card.querySelector(".popup__button-trash");

  trashBtn.addEventListener("click", deleteItem);

  const image = card.querySelector(".elements__image");

  image.addEventListener("click", (e) => {
    setImageCardValue(e);
    openPopup(popupImage);
  });
}

// Функция переноса данных картинки и подзаголовка

initialCards.forEach((item) => {
  addNewItem(item.name, item.link, false);
});
