import { popupZoom, zoomTitle, zoomImage, openPopup } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery")
      .cloneNode(true);

    return cardTemplate;
  }

  /* подготовка карточки к публикации */
  makeCard() {
    this._gallery = this._getTemplate();

    this._image = this._gallery.querySelector(".gallery__photo");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._gallery.querySelector(".gallery__title").textContent = this._name;
    this.__likeButton = this._gallery.querySelector(".gallery__like");
    this._deleteButton = this._gallery.querySelector(".gallery__delete");

    this._setEventListeners();

    return this._gallery;
  }

  _OpenPopup() {
    zoomImage.src = this._link;
    zoomTitle.textContent = this._name;
    zoomImage.alt = this._name;
    openPopup(popupZoom);
  }

  _toggleLikeGallery() {
    this.__likeButton.classList.toggle("gallery__like_active");
  }

  _deleteCard = () => {
    this._deleteButton.closest(".gallery").remove();
  };
  _setEventListeners = () => {
    this._image.addEventListener("click", () => {
      this._OpenPopup();
    });

    this.__likeButton.addEventListener("click", () => {
      this._toggleLikeGallery();
    });
    this._deleteButton.addEventListener("click", this._deleteCard);
  };
}
