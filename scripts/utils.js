import Card from "./Card.js";
export const nameInputNewCard = document.querySelector(
  ".popup__info_form_name"
);
export const linkInput = document.querySelector(".popup__info_form_link");
export const popupImage = document.querySelector(".popup_type_card-image");
const cardValueImage = document.querySelector(".popup__image");
const cardValueSbt = document.querySelector(".popup__subtitle");
const allCards = document.querySelector(".elements__container");

export function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupEsc);
}

export function deleteItem(evt) {
  const currentElement = evt.target.closest(".elements__item");
  currentElement.remove();
}

export function createNewCard(item) {
  const card = new Card(item, ".template_type_default");
  allCards.prepend(card.createCard());
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

function closePopupEsc(evt) {
  const key = evt.key;
  if (key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}
