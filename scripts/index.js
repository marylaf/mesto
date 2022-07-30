let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__pen");
let closeButton = document.querySelector(".popup__button-reset");
let formTitle = document.querySelector(".popup__info_title");
let formSubtitle = document.querySelector(".popup__info_subtitle");
let saveButton = document.querySelector(".popup__container");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

console.log(formTitle);
console.log(formSubtitle);

function editHandler() {
  document.getElementById("popup__info_title").value = formTitle.textContent;
  document.getElementById("popup__info_subtitle").value =
    formSubtitle.textContent;
}

editButton.addEventListener("click", editHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput = document.querySelector(".popup__info_title").value;
  jobInput = document.querySelector(".popup__info_subtitle").value;
  formTitle.textContent = nameInput;
  formSubtitle.textContent = jobInput;
}

saveButton.addEventListener("submit", formSubmitHandler);
