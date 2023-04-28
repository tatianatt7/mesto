import './pages/index.css';
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards, config } from "./scripts/constants.js";
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';

//попап ZOOM
const popupZoom = new PopupWithImage('.popup_type_zoom');
popupZoom.setEventListeners();

//формы
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');

//кнопки открытия попапов
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-btn');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-btn');



//экземпляры класса валидации
const popupEditProfileValidator = new FormValidator(config, formEdit);
popupEditProfileValidator.enableValidation();

const popupAddProfileValidator = new FormValidator(config, formAdd);
popupAddProfileValidator.enableValidation();



// CLASS USERINFO
const userInfo = new UserInfo({nameSelector: '.profile__user-name', jobSelector: '.profile__job'});

//функции submit
function handleEditFormSubmit (data) {
    userInfo.setUserInfo({name: data['user-name'], job: data['job']})
}
function handleAddFormSubmit (data) {
    renderCard({name: data['card-name'], link: data['card-link'] });
    popupAddProfileValidator.disableSubmitButton();
}

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();

const popupAddProfile = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
popupAddProfile.setEventListeners();



// CLASS SECTION
const section = new Section({items: initialCards, renderer: renderCard}, '.cards__list');
section.renderer();
//функция рендера карточек
function renderCard({name, link}) {
    const newCard = new Card({name, link}, '#card-template', popupZoom.open).generateCard();
    section.addItem(newCard);
}

const nameInput = document.querySelector('.popup__input_value_user-name');
const jobInput = document.querySelector('.popup__input_value_job');

//LISTENERS
//открыть попап
buttonOpenEditProfilePopup.addEventListener('click', function() {
    popupEditProfile.open();
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.job;
});

buttonOpenAddCardPopup.addEventListener('click', () => {popupAddProfile.open()});
