class FormValidator {
  constructor(setting, form) {
    this._inputSelector = setting.inputSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._errorClass = setting.errorClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(`.${this._inputSelector}`)
    );
    this._buttonElement = this._form.querySelector(
      `.${this._submitButtonSelector}`
    );
  }

  _showInputError(inputElement, errorMessage) {
    const error = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const error = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _disabledSaveBtn = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  };
  // активная кнопочка
  _enableSaveBtn = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disabledSaveBtn(buttonElement, this._inactiveButtonClass);
    } else {
      this._enableSaveBtn(buttonElement, this._inactiveButtonClass);
    }
  }

  enableValidation = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
    this._toggleButtonState(this._inputList, this._buttonElement);
  };

  cleanForm = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(this._inputList, this._buttonElement);
  };
}

export default FormValidator;
