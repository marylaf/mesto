const profilePopup = document.querySelector(".profile-popup");
const popupCard = document.querySelector(".popup_type_add-card");
const editButton = document.querySelector(".profile__pencil");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editCardButton = document.querySelector(".profile__button");
const allCards = document.querySelector(".elements__container");
const cardImage = document.querySelector(".elements__image");
const popupImage = document.querySelector(".popup_type_card-image");
const template = document.querySelector(".template");
const cardValueImage = document.querySelector(".popup__image");
const cardValueSbt = document.querySelector(".popup__subtitle");

// Находим форму в DOM

const popupProfileForm = profilePopup.querySelector(".popup__form");

// Находим поля формы в DOM

const nameInput = popupProfileForm.querySelector(".popup__info_form_title");

const jobInput = popupProfileForm.querySelector(".popup__info_form_subtitle");

//Универсальные функции открытия и закрытия попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", function (evt) {
    const key = evt.key;
    if (key === "Escape") {
      closePopup(popup);
    }
  });
}

const deleteItem = (evt) => {
  const currentElement = evt.target.closest(".elements__item");
  currentElement.remove();
};

const setImageCardValues = (evt) => {
  const currentItem = evt.target.closest(".elements__image");
  const currentItemIndexName = evt.target
    .closest(".elements__item")
    .querySelector(".elements__name");
  cardValueImage.src = currentItem.src;
  cardValueImage.alt = currentItem.alt;

  cardValueSbt.textContent = currentItemIndexName.textContent;
};

editCardButton.addEventListener("click", () => openPopup(popupCard));

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", function (evt) {
    const key = evt.key;
    if (key === "Escape") {
      closePopup(popup);
    }
  });
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

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__button-drop");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

//Функция переноса данных

function setProfileInputValue() {
  nameInput.value = profileTitle.textContent;

  jobInput.value = profileSubtitle.textContent;
}

// Функция изменения данных

function setProfileTextValue() {
  profileTitle.textContent = nameInput.value;

  profileSubtitle.textContent = jobInput.value;
}

function openPopupCardProfile() {
  setProfileInputValue();
  openPopup(profilePopup);
}
editButton.addEventListener("click", () => openPopupCardProfile());

// Функция сохранения данных

const handleProfileFormSubmit = (info) => (evt) => {
  evt.preventDefault();

  setProfileTextValue();

  closePopup(profilePopup);
  // linkInput.value = "";
  // nameInputNewCard.value = "";

  const inputList = Array.from(
    profilePopup.querySelectorAll(info.inputSelector)
  );
  const saveBtn = profilePopup.querySelector(info.submitButtonSelector);
  toggleButtonState(inputList, saveBtn, info);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      toggleInputErrorState(form, formInput, info);
      toggleButtonState(inputList, saveBtn, info);
    });
  });
};

popupProfileForm.addEventListener("submit", handleProfileFormSubmit(objInfo));

function createCard(link, name) {
  const currentItem = template.content.cloneNode(true);
  const currentImage = currentItem.querySelector(".elements__image");
  const currentName = currentItem.querySelector(".elements__name");
  currentImage.src = link;
  currentImage.alt = name;
  currentName.textContent = name;
  cardAddListeners(currentItem);
  return currentItem;
}

// // Функция добавления новой карточки

const nameInputNewCard = popupCard.querySelector(".popup__info_form_name");
const linkInput = popupCard.querySelector(".popup__info_form_link");

function addNewItem(name, link, isPrepend = true) {
  const item = createCard(link, name);

  if (isPrepend) {
    allCards.prepend(item);
  } else {
    allCards.append(item);
  }
}

const handleCardFormSubmit = (info) => (evt) => {
  evt.preventDefault();
  addNewItem(nameInputNewCard.value, linkInput.value);
  closePopup(popupCard);
  linkInput.value = "";
  nameInputNewCard.value = "";

  const inputList = Array.from(popupCard.querySelectorAll(info.inputSelector));
  const saveBtn = popupCard.querySelector(info.submitButtonSelector);
  toggleButtonState(inputList, saveBtn, info);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      toggleInputErrorState(form, formInput, info);
      toggleButtonState(inputList, saveBtn, info);
    });
  });
};

popupCard.addEventListener("submit", handleCardFormSubmit(objInfo));

function cardAddListeners(card) {
  const like = card.querySelector(".elements__button");

  like.addEventListener("click", () => {
    like.classList.toggle("elements__button_active");
  });

  const trashBtn = card.querySelector(".popup__button-trash");

  trashBtn.addEventListener("click", deleteItem);

  const image = card.querySelector(".elements__image");

  image.addEventListener("click", (e) => {
    setImageCardValues(e);
    openPopup(popupImage);
  });
}

// Функция переноса данных картинки и подзаголовка

initialCards.forEach((item) => {
  addNewItem(item.name, item.link, false);
});
