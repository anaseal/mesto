const popup= document.querySelector('.popup'); 
const popupContainer= document.querySelector('.popup__container')
const formElement = document.querySelector('.popup__profile')


//Кнопки
const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__form-save');

//имя
const nameInput = document.querySelector('.popup__form_type_name'); 
const profileName = document.querySelector('.profile__name');

//профессия
const jobInput = document.querySelector('.popup__form_type_job')
const profileJob = document.querySelector('.profile__info')

//открытие
function openPopup (){
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

editButton.addEventListener('click', openPopup);
//закрытие
function closePopup (){
    popup.classList.remove('popup_opened')
}
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
   profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler); 