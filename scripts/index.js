let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__pencil");
let closeButton = document.querySelector(".popup__button-drop");
let formTitle = document.querySelector(".profile__title");
let formSubtitle = document.querySelector(".profile__subtitle");
let popupForm = document.querySelector("#popup__form");
let nameInput;
let jobInput;

function openPopup() {
  popup.classList.add("popup_opened");
  document.getElementById("popup__info_form_title").value =
    formTitle.textContent;
  document.getElementById("popup__info_form_subtitle").value =
    formSubtitle.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}
editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput = document.querySelector("popup__info_form_title").value;
  jobInput = document.querySelector("popup__info_form_subtitle").value;
  formTitle.textContent = nameInput;
  formSubtitle.textContent = jobInput;

  closePopup();
}

popupForm.addEventListener("submit", formSubmitHandler);
