import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";

export const nameInputNewCard = document.querySelector(
  ".popup__info_form_name"
);
export const linkInput = document.querySelector(".popup__info_form_link");

export const popupImage = new PopupWithImage(".popup_type_card-image");
popupImage.setEventListeners();

export function deleteItem(evt) {
  const currentElement = evt.target.closest(".elements__item");
  currentElement.remove();
}

export function createNewCard(item) {
  const card = new Card(item, ".template_type_default", () => {
    popupImage.open(item.link, item.name);
  });
  const cardElement = card.createCard();
  return cardElement;
}
