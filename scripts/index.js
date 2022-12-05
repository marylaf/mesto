import { initialCards } from "./constants.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import {
  createNewCard,
  nameInputNewCard,
  linkInput,
  popupImage,
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
// const profileTitle = document.querySelector(".profile__title");
// const profileSubtitle = document.querySelector(".profile__subtitle");
const editCardButton = document.querySelector(".profile__button");
const cardListContainer = ".elements__container";
const inputList = Array.from(
  profilePopup.querySelectorAll(validationConfig.inputSelector)
);
const saveBtn = profilePopup.querySelector(
  validationConfig.submitButtonSelector
);
const popupProfileForm = profilePopup.querySelector(".popup__form");
// const nameInput = popupProfileForm.querySelector(".popup__info_form_title");
// const jobInput = popupProfileForm.querySelector(".popup__info_form_subtitle");

//Функция переноса данных

// function setProfileInputValues() {
//   nameInput.value = profileTitle.textContent;

//   jobInput.value = profileSubtitle.textContent;
// }

// Функция изменения данных

// function setProfileTextValues() {
//   profileTitle.textContent = nameInput.value;

//   profileSubtitle.textContent = jobInput.value;
// }

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
});

function openPopupCardProfile() {
  // setProfileInputValues();
  userInfo.getUserInfo();
  popupFormProfile.open();
}

// Функция сохранения данных

const handleProfileFormSubmit = () => {
  // setProfileTextValues();
  userInfo.setUserInfo();

  popupFormProfile.close();
  nameInput.value = "";
  jobInput.value = "";
  popupProfileFormValidator.toggleButtonState(inputList, saveBtn);
};

const popupFormProfile = new PopupWithForm(
  ".profile-popup",
  handleProfileFormSubmit
);
popupFormProfile.setEventListeners();

const popupFormAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleCardFormSubmit
);
popupFormAddCard.setEventListeners();

function handleCardFormSubmit() {
  const card = createNewCard({
    name: nameInputNewCard.value,
    link: linkInput.value,
  });
  cardsList.addItem(card);
  popupFormAddCard.close();
  linkInput.value = "";
  nameInputNewCard.value = "";
  popupAddFormValidator.toggleButtonState(inputList, saveBtn);
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

editCardButton.addEventListener("click", () => popupFormAddCard.open());
editButton.addEventListener("click", () => openPopupCardProfile());
