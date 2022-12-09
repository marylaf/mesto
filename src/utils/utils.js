import Card from "../components/Card.js";
import { popupImage } from "../pages/index.js";

export function createNewCard(cardData) {
  const card = new Card(cardData, ".template_type_default", () => {
    popupImage.open(cardData.link, cardData.name);
  });
  const cardElement = card.createCard();
  return cardElement;
}
