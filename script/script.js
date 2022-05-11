const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const formElement = document.querySelector(".popup__profile");

//Кнопки
const editButton = document.querySelector(".profile__button-edit"); //редактирование профиля
const closeButton = document.querySelector(".popup__close-button"); //закрытие профиля
const zoomImage = document.querySelector(".popup__zoom_image"); //картинка
const addButton = document.querySelector(".profile__button-add"); // добавить картинку
const closeZoom = document.querySelector(".popup__zoom_close-button"); //закрыть картинку
const addClose = document.querySelector(".popup__close-button-add"); //закрыть добавление

//имя
const nameInput = document.querySelector(".popup__form_type_name");
const profileName = document.querySelector(".profile__name");

//профессия
const jobInput = document.querySelector(".popup__form_type_job");
const profileJob = document.querySelector(".profile__info");

//зум
const zoomTitle = document.querySelector(".popup__zoom_title");
const popupZoom = document.querySelector(".popup__zoom");

//форма добавление картинки
const popupAdd = document.querySelector(".popup_addPhoto");
const addTitle = document.querySelector(".popup__form_type_title");
const addLink = document.querySelector(".popup__form_type_link");
const addForm = document.querySelector(".popup__add-form");

//открытие
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// редактирование профиля
function profileOpen() {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editButton.addEventListener("click", profileOpen);

//закрытие
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", function () {
  closePopup(popup);
});

// обработка профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popup);
}
formElement.addEventListener("submit", formSubmitHandler);

const initialCards = [
  {
    name: "уточка",
    link: "https://images.unsplash.com/photo-1578102487209-9229fa2b1cfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    name: "Челябинская область",
    link: "https://images.unsplash.com/photo-1580597095981-8d21aa8cdfed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    name: "Иваново",
    link: "https://images.unsplash.com/photo-1597693421414-ddb414ca62c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    name: "Камчатка",
    link: "https://images.unsplash.com/photo-1642631203400-c15d096a7f85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Холмогорский район",
    link: "https://images.unsplash.com/photo-1631018743789-dcf87cc25308?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    name: "Байкал",
    link: "https://images.unsplash.com/photo-1557704086-3e2f5969687b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
];

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
addClose.addEventListener("click", function () {
  closePopup(popupAdd);
}); //

// массив
const elementsCard = document.querySelector(".elements");
initialCards.forEach((element) => {
  const cardElement = createCard(element);
  elementsCard.append(cardElement);
});