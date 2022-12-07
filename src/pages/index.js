import "./index.css";
import { initialCards } from "../components/constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
  createNewCard,
  nameInputNewCard,
  linkInput,
} from "../components/utils.js";

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
const editCardButton = document.querySelector(".profile__button");
const cardListContainer = ".elements__container";
const inputList = Array.from(
  profilePopup.querySelectorAll(validationConfig.inputSelector)
);
const saveBtn = profilePopup.querySelector(
  validationConfig.submitButtonSelector
);
const popupProfileForm = profilePopup.querySelector(".popup__form");

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
});

function openPopupCardProfile() {
  const information = userInfo.getUserInfo();

  popupFormProfile.setInputValues(information.Name, information.Description);

  popupFormProfile.open();
}

// Функция сохранения данных

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
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
