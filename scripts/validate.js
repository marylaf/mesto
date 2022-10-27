const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__info");

// Функция, которая добавляет класс с ошибкой

const showInputError = (form, formInput, errorMessage) => {
  const errorInput = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.add("popup__info_type_error");
  errorInput.textContent = errorMessage;
  errorInput.classList.add("error");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, formInput) => {
  const errorInput = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove("popup__info_type_error");
  errorInput.classList.remove("error");
  errorInput.textContent = "";
};

const isValid = (form, formInput) => {
  if (formInput.validity.valid) {
    hideInputError(form, formInput);
  } else {
    showInputError(form, formInput, formInput.validationMessage);
  }
};

// Вызовем функцию isValid на каждый ввод символа

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__info"));
  const saveBtn = form.querySelector(".popup__button-save");
  toggleButton(inputList, saveBtn);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(form, formInput);
      toggleButton(inputList, saveBtn);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  // Переберём полученную коллекцию
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

const toggleButton = (inputList, saveBtn) => {
  if (invalidInput(inputList)) {
    saveBtn.classList.add("popup__button-save_inactive");
  } else {
    saveBtn.removeAttribute("disabled");
    saveBtn.classList.remove("popup__button-save_inactive");
  }
};

// Функция принимает массив полей

const invalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

// Вызовем функцию

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__info",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_inactive",
  inputErrorClass: "popup__info_type_error",
  errorClass: "error",
});
