import "./index.css";
import {
  initialCards,
  validationConfig,
  popupProfile,
  popupCard,
  popupProfileForm,
  buttonCardEdit,
  buttonEdit,
  nameInputNewCard,
  linkInput,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";

export function createNewCard(cardData) {
  const card = new Card(cardData, ".template_type_default", () => {
    popupImage.open(cardData.link, cardData.name);
  });
  const cardElement = card.createCard();
  return cardElement;
}

export const popupImage = new PopupWithImage(".popup_type_card-image");
popupImage.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
});

function openPopupCardProfile() {
  const information = userInfo.getUserInfo();

  popupFormProfile.setInputValues(information);

  popupFormProfile.open();
}

// Функция сохранения данных

const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
  popupProfileFormValidator.toggleButtonState();
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
  cardsSection.addItem(card);
  popupFormAddCard.close();
  popupAddFormValidator.toggleButtonState();
}

const popupProfileFormValidator = new FormValidator(
  validationConfig,
  popupProfileForm
);
const popupAddFormValidator = new FormValidator(validationConfig, popupCard);
popupAddFormValidator.enableValidation();
popupProfileFormValidator.enableValidation();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createNewCard(item);
      cardsSection.addItem(card);
    },
  },
  ".elements__container"
);
cardsSection.renderItems();

buttonCardEdit.addEventListener("click", () => popupFormAddCard.open());
buttonEdit.addEventListener("click", () => openPopupCardProfile());
