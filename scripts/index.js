let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__pencil");
let closeButton = document.querySelector(".popup__button-drop");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

// Находим форму в DOM
let popupForm = popup.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = popupForm.querySelector(".popup__info_form_title");
let jobInput = popupForm.querySelector(".popup__info_form_subtitle");
// Функция открытия окна
function openPopup() {
  popup.classList.add("popup_opened");
}
// Функция закрытия окна
function closePopup() {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

// Функция переноса данных
function setInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

editButton.addEventListener("click", function () {
  setInputValue();
  openPopup(popup);
});
// Функция изменения данных
function setTextValue() {
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}
// Функция сохранения данных
function formSubmitHandler(evt) {
  evt.preventDefault();
  setTextValue();
  closePopup();
}

popupForm.addEventListener("submit", formSubmitHandler);
