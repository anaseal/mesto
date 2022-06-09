const selectors = {
  formSelector: "popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: "popup__input-save",
  inactiveButtonClass: "popup__input-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// добавляем класс с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputError,
  errorSelector
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorSelector);
};
// удаляем класс с ошибкой
const hideInputError = (
  formElement,
  inputElement,
  InputErrors,
  errorSelector
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(InputErrors);
  errorElement.classList.remove(errorSelector);
  errorElement.textContent = "";
};

// валидация формы
const isValid = (formElement, inputElement, InputErrors, errorSelector) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      InputErrors,
      errorSelector
    );
  } else {
    hideInputError(formElement, inputElement, InputErrors, errorSelector);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement, validConfig) => {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = validConfig;

  const inputList = Array.from(
    formElement.querySelectorAll(`.${inputSelector}`)
  );
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
};

/*Отключение кнопки, если есть невалидное поле*/
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};

/*Запуск валидации*/
const enableValidation = (validationConfig) => {
  const { formSelector } = validationConfig;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(selectors);
