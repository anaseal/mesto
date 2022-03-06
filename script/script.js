// переменные
const popup = document.querySelector('.popup'); //сам поп ап
const	openPopupButton = document.querySelector('.profile__button-edit'); // открыть поп ап
const	closePopupButton = document.querySelector('.popup__close-button'); //скрыть поп ап
let userName = document.querySelector('.profile__name'); // имя в профиле
let nameInput = document.querySelector('.popup__form-name');// имя в форме
let userProfession = document.querySelector('.profile__info');// работа в профиле
let jobInput = document.querySelector('.popup__form-profession');// работа в форме
const formElement = document.querySelector('.popup-profile');


// открытие поп апа

function openPopup() {					
	popup.classList.toggle('popup__opened');
	nameInput.value = userName.textContent;	
	jobInput.value = userProfession.textContent;
}
openPopupButton.addEventListener('click', openPopup);

// закрытие поп апа
function closePopup() {
	popup.classList.remove('popup__opened');
}
closePopupButton.addEventListener('click', closePopup);

function infoSubmit (evt) {
	evt.preventDefault()
	userName.textContent = nameInput.value;
	userProfession.textContent = jobInput.value;
	closePopup();
};
formElement.addEventListener('submit', infoSubmit);