const popup = document.querySelector(".popup");
const popupCard = document.querySelector(".popup_type_add-card");
const editButton = document.querySelector(".profile__pencil");
const closeButton = document.querySelector(".popup__button-drop");
const closeButtonCard = document.querySelector(".popup__button-dropcard");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editCardButton = document.querySelector(".profile__button");
let allCard = document.querySelector(".elements__container");
const cardImage = document.querySelector(".elements__image");
const cardName = document.querySelector(".elements__name");
const saveBtn = document.querySelector(".popup__button-save");

// Находим форму в DOM

let popupForm = popup.querySelector(".popup__form");

// Находим поля формы в DOM

let nameInput = popupForm.querySelector(".popup__info_form_title");

let jobInput = popupForm.querySelector(".popup__info_form_subtitle");

// Функция открытия окна

function openPopup() {
  setInputValue();
  popup.classList.add("popup_opened");
}
editButton.addEventListener("click", openPopup);

// Функция открытия окна добавления карточки

function openPopupCard() {
  popupCard.classList.add("popup_opened");
}
editCardButton.addEventListener("click", openPopupCard);

//Функция закрытия окна

function closePopup() {
  popup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);

// Функция закрытия окна добавления карточки

function closePopupCard() {
  popupCard.classList.remove("popup_opened");
}

closeButtonCard.addEventListener("click", closePopupCard);

//Функция переноса данных

function setInputValue() {
  nameInput.value = profileTitle.textContent;

  jobInput.value = profileSubtitle.textContent;
}

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

function render() {
  allCard.innerHTML = "";
  initialCards.forEach((item) => {
    allCard.innerHTML += `<article class="elements__item">
    <button
    class="popup__button-trash"
    type="button"
  ></button>
    <img
      class="elements__image"
      src="${item.link}"
      alt="храм"
    />
    <div class="elements__block">
      <h2 class="elements__name">${item.name}</h2>
      <button type="button" class="elements__button"></button>
    </div>
    </article>`;
  });
}

// Функция добавления новой карточки

const nameInputNewCard = popupCard.querySelector(".popup__info_form_name");
const linkInput = popupCard.querySelector(".popup__info_form_link");

// Функция переноса данных карточки

function setInputValueNewCard() {
  nameInputNewCard.textContent = name;
  linkInput.textContent = link;
}

const addNewItem = () => {
  initialCards.unshift({
    name: nameInputNewCard.value,
    link: linkInput.value,
  });

  initialCards.pop();

  render();
};

render();

function formSubmitHandlerNewCard(evt) {
  evt.preventDefault();
  addNewItem();
  closePopupCard();
}

popupCard.addEventListener("submit", formSubmitHandlerNewCard);

// Функция появления лайка
const likes = document.querySelectorAll(".elements__button");

likes.forEach((like) => {
  like.addEventListener("click", () =>
    like.classList.toggle("elements__button_active")
  );
});

//Удаление картинки

// Находим кнопку в дом

const trashBtn = document.querySelectorAll(".popup__button-trash");

console.log(trashBtn);

//функция удаления
deleteItem = (event) => {
  const currentItem = event.target.closest(".elements__item");
  currentItem.remove();
};

// кидаем обработчик событий на кнопку
