// Функция, которая добавляет класс с ошибкой

// const showInputError = (form, formInput, errorMessage, info) => {
//   const errorInput = form.querySelector(`.${formInput.id}-error`);
//   formInput.classList.add(info.inputErrorClass);
//   errorInput.textContent = errorMessage;
//   errorInput.classList.add(info.errorClass);
// };

// // Функция, которая удаляет класс с ошибкой
// const hideInputError = (form, formInput, info) => {
//   const errorInput = form.querySelector(`.${formInput.id}-error`);
//   formInput.classList.remove(info.inputErrorClass);
//   errorInput.classList.remove(info.errorClass);
//   errorInput.textContent = "";
// };

// const toggleInputErrorState = (form, formInput, info) => {
//   if (formInput.validity.valid) {
//     hideInputError(form, formInput, info);
//   } else {
//     showInputError(form, formInput, formInput.validationMessage, info);
//   }
// };

// const setEventListeners = (form, info) => {
//   const inputList = Array.from(form.querySelectorAll(info.inputSelector));
//   const saveBtn = form.querySelector(info.submitButtonSelector);
//   toggleButtonState(inputList, saveBtn, info);
//   inputList.forEach((formInput) => {
//     formInput.addEventListener("input", () => {
//       toggleInputErrorState(form, formInput, info);
//       toggleButtonState(inputList, saveBtn, info);
//     });
//   });
// };

// const enableValidation = (info) => {
//   const formList = Array.from(document.querySelectorAll(info.formSelector));
//   // Переберём полученную коллекцию
//   formList.forEach((form) => {

//     setEventListeners(form, info);
//   });
// };

// Вызовем функцию

// enableValidation(validationConfig);

// export function toggleButtonState(inputList, saveBtn, info) {
//   if (hasInvalidInputs(inputList)) {
//     saveBtn.setAttribute("disabled", true);
//     saveBtn.classList.add(info.inactiveButtonClass);
//   } else {
//     saveBtn.removeAttribute("disabled");
//     saveBtn.classList.remove(info.inactiveButtonClass);
//   }
// }

// // Функция принимает массив полей

// function hasInvalidInputs(inputList) {
//   return inputList.some((formInput) => {
//     return !formInput.validity.valid;
//   });
// }
