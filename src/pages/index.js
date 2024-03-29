import "./index.css";
import {
  avatarButton,
  validationConfig,
  popupCard,
  popupAvatarForm,
  popupProfileForm,
  buttonCardEdit,
  buttonEdit,
  nameInputNewCard,
  linkInput,
  avatarInput,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import { api } from "../components/Api.js";

let userOwnId;

export function createNewCard(cardData) {
  const card = new Card(
    cardData,
    ".template_type_default",
    () => {
      popupImage.open(cardData.link, cardData.name);
    },
    (id) => {
      popupConfirmDelete.open();
      popupConfirmDelete.changeHandleFormSubmitCallback(() => {
        api
          .deleteCard(id)
          .then(() => {
            card.deleteAnyCard();
            popupConfirmDelete.close();
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      });
    },
    (id) => {
      if (card.isLiked()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.putLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.putLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      }
    }
  );
  const cardElement = card.createCard();
  return cardElement;
}

export const popupImage = new PopupWithImage(".popup_type_card-image");
popupImage.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
});

function openPopupCardProfile() {
  const information = userInfo.getUserInfo();

  popupFormProfile.setInputValues(information);

  popupFormProfile.open();
}

// Функция сохранения данных

const handleProfileFormSubmit = (data) => {
  popupFormProfile.renderLoading(true, "Сохранение...");
  api
    .editProfile(data.name, data.about)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormProfile.close();
      popupProfileFormValidator.toggleButtonState();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(function () {
      popupFormProfile.renderLoading(false);
    });
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

const popupConfirmDelete = new PopupWithForm(".popup-confirmation");
popupConfirmDelete.setEventListeners();

const popupAddAvatar = new PopupWithForm(".popup-avatar", submitAvatarAddForm);
popupAddAvatar.setEventListeners();

function submitAvatarAddForm() {
  popupAddAvatar.renderLoading(true, "Сохранение...");
  api
    .addNewAvatar(avatarInput.value)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAddAvatar.close();
      avatarFormValidation.toggleButtonState();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(function () {
      popupAddAvatar.renderLoading(false);
    });
}

function handleCardFormSubmit() {
  popupFormAddCard.renderLoading(true, "Сохранение...");
  api
    .addNewCard(nameInputNewCard.value, linkInput.value)
    .then((res) => {
      const card = createNewCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userOwnId: userOwnId,
        ownerId: res.owner._id,
      });
      cardsSection.addItem(card);
      popupFormAddCard.close();
      popupAddFormValidator.toggleButtonState();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(function () {
      popupFormAddCard.renderLoading(false);
    });
}

const popupProfileFormValidator = new FormValidator(
  validationConfig,
  popupProfileForm
);

const popupAddFormValidator = new FormValidator(validationConfig, popupCard);

const avatarFormValidation = new FormValidator(
  validationConfig,
  popupAvatarForm
);

avatarFormValidation.enableValidation();
popupAddFormValidator.enableValidation();
popupProfileFormValidator.enableValidation();

const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createNewCard(item);
      cardsSection.addItem(card);
    },
  },
  ".elements__container"
);

avatarButton.addEventListener("click", () => {
  popupAddAvatar.open();
  avatarFormValidation.toggleButtonState();
});
buttonCardEdit.addEventListener("click", () => popupFormAddCard.open());
buttonEdit.addEventListener("click", () => openPopupCardProfile());

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userOwnId = userData._id;

    cardsSection.renderItems(
      cardsData.map((card) => ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        id: card._id,
        userOwnId: userOwnId,
        ownerId: card.owner._id,
      }))
    );
  })

  .catch((err) => console.log(err));
