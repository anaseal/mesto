import { initialCards } from "./constans.js";
import { selectors } from "./constans.js";
import FormValidator from "./FormValidator.js";
import Card from "./card.js";

const elementsCard = document.querySelector(".elements");

const popupProfile = document.querySelector(".popup_edit-profile");
const formPopupProfile = popupProfile.querySelector(".popup__profile");

//Кнопки
const editButton = document.querySelector(".profile__button-edit"); //редактирование профиля
const closeProfile = document.querySelector(".popup__close-button-profile"); //закрытие профиля
export const zoomImage = document.querySelector(".popup__image-zoom"); //картинка
const addButton = document.querySelector(".profile__button-add"); // добавить картинку
export const closeZoom = document.querySelector(".popup__close-button-zoom"); //закрыть картинку
const closeAdd = document.querySelector(".popup__close-button-add"); //закрыть добавление
const savePopup = document.querySelector(".popup__input-save");

const addPopup = document.querySelector(".popup_addPhoto");
const savePopupAdd = addPopup.querySelector(".popup__input-save");
//имя
const nameInput = document.querySelector(".popup__input_type_name");
const profileName = document.querySelector(".profile__name");

//профессия
const jobInput = document.querySelector(".popup__input_type_job");
const profileJob = document.querySelector(".profile__info");

//зум
export const zoomTitle = document.querySelector(".popup__title-zoom");
export const popupZoom = document.querySelector(".popup_zoom");

//форма добавление картинки
const popupAdd = document.querySelector(".popup_addPhoto");
const addTitle = document.querySelector(".popup__input_type_title");
const addLink = document.querySelector(".popup__input_type_link");
const addForm = document.querySelector(".popup__add-form");

//создать объект
const formValidator = {}; 

Array.from(document.forms).forEach((formElement) => {
  formValidator[formElement.name] = new FormValidator(selectors, formElement);
  formValidator[formElement.name].enableValidation();
});

//открытие общее

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click", closePopupByOverlay);
}

// редактирование профиля
function profileOpen() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editButton.addEventListener("click", profileOpen);

//закрытие общее
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click", closePopupByOverlay);
}
// нажатие на esc
const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};
//нажатие на overlay
function closePopupByOverlay(evt) {
  const overlayPopup = evt.target;
  if (!overlayPopup.classList.contains("popup_opened")) return;
  closePopup(overlayPopup);
}
// закрытие профиля
closeProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});

// обработка профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}
formPopupProfile.addEventListener("submit", submitProfileForm);

// добавление карточек
const createCard = (item) => {
  const card = new Card(item, "#gallery-template");
  return card;
};
// закрыть зум
closeZoom.addEventListener("click", () => {
  closePopup(popupZoom);
});


const addCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: addTitle.value,
    link: addLink.value,
  };
  closePopup(addPopup);
  const card = createCard(newCard);
  const cardElement = card. makeCard();

  elementsCard.prepend(cardElement);
};

addForm.addEventListener("submit", addCard);

//редактирование профиля
addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});
// закрыть форму добавления
closeAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});

// массив
initialCards.forEach((item) => {
  const card = createCard(item);
  const cardElement = card.makeCard();

  elementsCard.append(cardElement);
});
