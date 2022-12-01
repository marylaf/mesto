import { initialCards } from "./constants.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import {
  openPopup,
  popupImage,
  createNewCard,
  nameInputNewCard,
  linkInput,
} from "./utils.js";

const validationConfig = {
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
const cardListContainer = ".elements__container";
const inputList = Array.from(
  profilePopup.querySelectorAll(validationConfig.inputSelector)
);
const saveBtn = profilePopup.querySelector(
  validationConfig.submitButtonSelector
);
const popupProfileForm = profilePopup.querySelector(".popup__form");
const nameInput = popupProfileForm.querySelector(".popup__info_form_title");
const jobInput = popupProfileForm.querySelector(".popup__info_form_subtitle");
const closeButtons = document.querySelectorAll(".popup__button-drop");
const popups = [profilePopup, popupCard, popupImage];

// функция закрытия попапа overlay

popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target == evt.currentTarget) {
      closePopup(popup);
    }
  });
});

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

// Функция сохранения данных

const handleProfileFormSubmit = () => (evt) => {
  evt.preventDefault();

  setProfileTextValues();

  closePopup(profilePopup);

  nameInput.value = "";
  jobInput.value = "";
  popupProfileFormValidator.toggleButtonState(inputList, saveBtn);
};

function handleCardFormSubmit() {
  return (evt) => {
    evt.preventDefault();
    const card = createNewCard({
      name: nameInputNewCard.value,
      link: linkInput.value,
    });
    cardsList.addItem(card);
    console.log(card);
    closePopup(popupCard);
    linkInput.value = "";
    nameInputNewCard.value = "";
    popupAddFormValidator.toggleButtonState(inputList, saveBtn);
  };
}
const popupProfileFormValidator = new FormValidator(
  validationConfig,
  popupProfileForm
);
const popupAddFormValidator = new FormValidator(validationConfig, popupCard);
popupAddFormValidator.enableValidation();
popupProfileFormValidator.enableValidation();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createNewCard(item);
      cardsList.addItem(card);
    },
  },
  cardListContainer
);
cardsList.renderItems();

editCardButton.addEventListener("click", () => openPopup(popupCard));
editButton.addEventListener("click", () => openPopupCardProfile());

profilePopup.addEventListener(
  "submit",
  handleProfileFormSubmit(validationConfig)
);
popupCard.addEventListener("submit", handleCardFormSubmit(validationConfig));
