const elementsCard = document.querySelector(".elements");

const popupProfile = document.querySelector(".popup_edit-profile");
const formPopupProfile = popupProfile.querySelector(".popup__profile");

//Кнопки
const editButton = document.querySelector(".profile__button-edit"); //редактирование профиля
const closeProfile = document.querySelector(".popup__close-button-profile"); //закрытие профиля
const zoomImage = document.querySelector(".popup__image-zoom"); //картинка
const addButton = document.querySelector(".profile__button-add"); // добавить картинку
const closeZoom = document.querySelector(".popup__close-button-zoom"); //закрыть картинку
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
const zoomTitle = document.querySelector(".popup__title-zoom");
const popupZoom = document.querySelector(".popup_zoom");

//форма добавление картинки
const popupAdd = document.querySelector(".popup_addPhoto");
const addTitle = document.querySelector(".popup__input_type_title");
const addLink = document.querySelector(".popup__input_type_link");
const addForm = document.querySelector(".popup__add-form");

//открытие общее
function openPopup(popup) {
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
function closePopup(popup) {
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
const cardTemplate = document.querySelector("#gallery-template").content; //темплейт
function createCard(card) {
  const cloneCard = cardTemplate.cloneNode(true);
  cloneCard.querySelector(".gallery__title").textContent = card.name;
  const imageCard = cloneCard.querySelector(".gallery__photo");
  imageCard.src = card.link;
  imageCard.alt = card.name;

  // Лайк
  cloneCard.querySelector(".gallery__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("gallery__like_active");
  });

  // удаление
  const deleteButton = cloneCard.querySelector(".gallery__delete");
  const gallery = cloneCard.querySelector(".gallery");
  deleteButton.addEventListener("click", function (evt) {
    gallery.remove();
  });

  imageCard.addEventListener("click", () => {
    zoomImage.src = card.link;
    zoomTitle.textContent = card.name;
    zoomImage.alt = card.name;
    openPopup(popupZoom);
  });

  return cloneCard;
}
// закрыть зум
closeZoom.addEventListener("click", () => {
  closePopup(popupZoom);
});

// добавить карточку
function addCard(evt) {
  evt.preventDefault();
  disabledSaveBtn(savePopupAdd, selectors.inactiveButtonClass);
  const cardElement = createCard({
    name: addTitle.value,
    link: addLink.value,
  });
  elementsCard.prepend(cardElement);

  closePopup(popupAdd);
  addForm.reset();
}
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
initialCards.forEach((element) => {
  const cardElement = createCard(element);
  elementsCard.append(cardElement);
});
