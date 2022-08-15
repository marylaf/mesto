const popup = document.querySelector(".popup");
const popupAdd = document.querySelector(".popup__add");
const editButton = document.querySelector(".profile__pencil");
const addButton = document.querySelector(".profile__button");
const closeButton = document.querySelector(".popup__button-drop");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// Находим форму в DOM

let popupForm = popup.querySelector(".popup__form");

// Находим поля формы в DOM

const nameInput = popupForm.querySelector(".popup__info_form_title");
const jobInput = popupForm.querySelector(".popup__info_form_subtitle");

// Функция открытия окон

const popups = {
  editProfile: "popup__edit",
  addButton: "popup__add",
};

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.add("popup_opened");
  setInputValue();
}

// Функция закрытия окна
function closePopup(popupId) {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", () =>
  closePopup(popups.editProfile, popups.addButton)
);

// Функция переноса данных
function setInputValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
addButton.addEventListener("click", () => openPopup(popups.addButton));
editButton.addEventListener("click", () => openPopup(popups.editProfile));

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

const initialCards = [
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Владимир",
    link: "https://images.unsplash.com/photo-1603804705524-aab416179f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1654&q=80",
  },
  {
    name: "Краснодар",
    link: "https://images.unsplash.com/photo-1607193721101-171099f8f217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
  {
    name: "Сочи",
    link: "https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
  {
    name: "Владивосток",
    link: "https://images.unsplash.com/photo-1629813366051-b58137b2792c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
  {
    name: "Якутск",
    link: "https://images.unsplash.com/photo-1657070969523-f59f91f9c3d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
  },
];
