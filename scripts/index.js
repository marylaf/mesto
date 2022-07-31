let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__pen");
let closeButton = document.querySelector(".popup__button-drop");
let formTitle = document.querySelector(".popup__info-title");
let formSubtitle = document.querySelector(".popup__info-subtitle");
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
  document.getElementById("popup__info-title").value = formTitle.textContent;
  document.getElementById("popup__info-subtitle").value =
    formSubtitle.textContent;
}

editButton.addEventListener("click", editHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput = formTitle.value;
  jobInput = formSubtitle.value;
  formTitle.textContent = nameInput;
  formSubtitle.textContent = jobInput;

  closePopup();
}

saveButton.addEventListener("submit", formSubmitHandler);
