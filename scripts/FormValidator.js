export default class FormValidator {
  constructor(data, elementForm) {
    this._formSelector = data.formSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;
    this._elementForm = elementForm;
    this._submitButton = this._elementForm.querySelector(
      data.submitButtonSelector
    );
    this._inputList = Array.from(
      this._elementForm.querySelectorAll(data.inputSelector)
    );
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

  _hasInvalidInputs() {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInputs(this._inputList)) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this.toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._toggleInputErrorState(formInput);
        this.toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  };
}
