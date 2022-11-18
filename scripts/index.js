import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__info_type_error",
  errorClass: "error",
};

const profilePopup = document.querySelector(".profile-popup");
const popupCard = document.querySelector(".popup_type_add-card");
const editButton = document.querySelector(".profile__pencil");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editCardButton = document.querySelector(".profile__button");
export const allCards = document.querySelector(".elements__container");
const cardValueImage = document.querySelector(".popup__image");
export const popupImage = document.querySelector(".popup_type_card-image");
const cardValueSbt = document.querySelector(".popup__subtitle");

// Находим форму в DOM

const popupProfileForm = profilePopup.querySelector(".popup__form");

// Находим поля формы в DOM

const nameInput = popupProfileForm.querySelector(".popup__info_form_title");

const jobInput = popupProfileForm.querySelector(".popup__info_form_subtitle");

//Универсальные функции открытия и закрытия попапов

function closePopupEsc(evt) {
  const key = evt.key;
  if (key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function setImageCardValues(evt) {
  const currentItem = evt.target.closest(".elements__image");
  const currentItemIndexName = evt.target
    .closest(".elements__item")
    .querySelector(".elements__name");
  cardValueImage.src = currentItem.src;
  cardValueImage.alt = currentItem.alt;

  cardValueSbt.textContent = currentItemIndexName.textContent;
}

editCardButton.addEventListener("click", () => openPopup(popupCard));

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}

const popups = [profilePopup, popupCard, popupImage];

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

function setProfileInputValues() {
  nameInput.value = profileTitle.textContent;

  jobInput.value = profileSubtitle.textContent;
}

// Функция изменения данных

function setProfileTextValues() {
  profileTitle.textContent = nameInput.value;

  profileSubtitle.textContent = jobInput.value;
}

function openPopupCardProfile() {
  setProfileInputValues();
  openPopup(profilePopup);
}
editButton.addEventListener("click", () => openPopupCardProfile());

const popupProfileFormValidator = new FormValidator(
  validationConfig,
  popupProfileForm
);
popupProfileFormValidator.enableValidation();
// Функция сохранения данных

const handleProfileFormSubmit = (info) => (evt) => {
  evt.preventDefault();
  console.log("handleProfileFormSubmit");

  setProfileTextValues();

  closePopup(profilePopup);

  nameInput.value = "";
  jobInput.value = "";

  const inputList = Array.from(
    profilePopup.querySelectorAll(info.inputSelector)
  );
  const saveBtn = profilePopup.querySelector(info.submitButtonSelector);
  popupProfileFormValidator.toggleButtonState(inputList, saveBtn, info);
};

export const nameInputNewCard = popupCard.querySelector(
  ".popup__info_form_name"
);

export const linkInput = popupCard.querySelector(".popup__info_form_link");

const popupAddFormValidator = new FormValidator(validationConfig, popupCard);
popupAddFormValidator.enableValidation();

const handleCardFormSubmit = (info) => (evt) => {
  evt.preventDefault();
  const card = new Card(
    {
      name: nameInputNewCard.value,
      link: linkInput.value,
    },
    ".template_type_default"
  );
  allCards.prepend(card.createCard());
  closePopup(popupCard);
  linkInput.value = "";
  nameInputNewCard.value = "";

  const inputList = Array.from(popupCard.querySelectorAll(info.inputSelector));
  const saveBtn = popupCard.querySelector(info.submitButtonSelector);
  popupAddFormValidator.toggleButtonState(inputList, saveBtn);
};

popupCard.addEventListener("submit", handleCardFormSubmit(validationConfig));

export function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupEsc);
}

export function deleteItem(evt) {
  const currentElement = evt.target.closest(".elements__item");
  currentElement.remove();
}

profilePopup.addEventListener(
  "submit",
  handleProfileFormSubmit(validationConfig)
);
