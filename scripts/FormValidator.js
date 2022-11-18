import { validationConfig } from "./index.js";

export default class FormValidator {
  constructor(data, elementForm) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;
    this._elementForm = elementForm;
  }

  // метод, который добавляет класс с ошибкой

  _showInputError(formInput, errorMessage) {
    const errorInput = this._elementForm.querySelector(
      `.${formInput.id}-error`
    );
    formInput.classList.add(this._inputErrorClass);
    errorInput.textContent = errorMessage;
    errorInput.classList.add(this._errorClass);
  }

  // метод, который удаляет класс с ошибкой

  _hideInputError(formInput) {
    const errorInput = this._elementForm.querySelector(
      `.${formInput.id}-error`
    );
    formInput.classList.remove(this._inputErrorClass);
    errorInput.classList.remove(this._errorClass);
    errorInput.textContent = "";
  }

  _toggleInputErrorState(formInput) {
    if (formInput.validity.valid) {
      this._hideInputError(formInput);
    } else {
      this._showInputError(formInput, formInput.validationMessage);
    }
  }

  // метод принимает массив полей

  _hasInvalidInputs(inputList) {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  toggleButtonState(inputList) {
    const submitButton = this._elementForm.querySelector(
      this._submitButtonSelector
    );
    if (this._hasInvalidInputs(inputList)) {
      submitButton.setAttribute("disabled", true);
      submitButton.classList.add(this._inactiveButtonClass);
    } else {
      submitButton.removeAttribute("disabled");
      submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._elementForm.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._elementForm.querySelector(
      this._submitButtonSelector
    );
    this.toggleButtonState(inputList, submitButton);
    inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._toggleInputErrorState(formInput);
        this.toggleButtonState(inputList, submitButton);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
