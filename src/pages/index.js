import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { config } from "../scripts/constants.js";
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

//CLASS API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    'content-type': 'application/json',
    Authorization: '6f237a60-b300-4ba1-a3f7-87a2c7799492'
  }
})

//попап ZOOM
const popupZoom = new PopupWithImage('.popup_type_zoom');
popupZoom.setEventListeners();

//формы
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const formAvatar = document.querySelector('.popup__form_type_avatar');

//кнопки открытия попапов
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-btn');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-btn');
const buttonOpenAvatarPopup = document.querySelector('.profile__avatar-container');

//экземпляры класса валидации
const popupEditProfileValidator = new FormValidator(config, formEdit);
popupEditProfileValidator.enableValidation();

const popupAddProfileValidator = new FormValidator(config, formAdd);
popupAddProfileValidator.enableValidation();

const popupAvatarValidator = new FormValidator(config, formAvatar);
popupAvatarValidator.enableValidation();



// CLASS USERINFO
const userInfo = new UserInfo({ imageSelector: '.profile__avatar', nameSelector: '.profile__user-name', jobSelector: '.profile__job' });
const section = new Section({renderer: renderCard}, '.cards__list');
let currentUserId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((response) => {
    userInfo.setUserInfo({ 
      link: response[0].avatar, 
      name: response[0].name, 
      job: response[0].about });
    currentUserId = response[0]._id;
    section.renderItems(response[1]);
  })
  .catch((error) => console.log(`Ошибка: ${error}`))

//функции submit
function handleEditFormSubmit(data) {
  popupEditProfile.setSubmitButtonText('Сохранение...');
  api.editUserInfo(data['user-name'], data['job'])
    .then((response) => {
      userInfo.setUserInfo({ name: response.name, job: response.about, link: response.avatar })
      popupEditProfile.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupEditProfile.resetSubmitButtonText())
}

function handleAddFormSubmit(data) {
  popupAddProfile.setSubmitButtonText('Сохранение...');
  api.addCard(data['card-name'], data['card-link'])
    .then((response) => {
      renderCard(response);
      popupAddProfile.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupAddProfile.resetSubmitButtonText())
}

function handleAvatarFormSubmit(data) {
  popupAvatar.setSubmitButtonText('Сохранение...');
  api.editAvatar(data['avatar-link'])
    .then((response) => {
      userInfo.setAvatar(response.avatar);
      popupAvatar.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => popupAvatar.resetSubmitButtonText())
}

const popupEditProfile = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
popupEditProfile.setEventListeners();

const popupAddProfile = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
popupAddProfile.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
popupAvatar.setEventListeners();


// CLASS SECTION

const createCard = (card) => {
  const newCard = new Card(card, '#card-template', popupZoom.open, currentUserId, submitPopup.open, handleLikeClick);
  return newCard.generateCard();
}

//функция рендера карточек
function renderCard(card) {
  const newCard = createCard(card);
  section.addItem(newCard);
}

const nameInput = document.querySelector('.popup__input_value_user-name');
const jobInput = document.querySelector('.popup__input_value_job');

//Удаление cards
const handleCardDelClick = (deleteCardFunction, cardId) => {
  api.deleteCard(cardId)
    .then(() => {
      deleteCardFunction();
      submitPopup.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
}

//попап PpupWithSubmit
const submitPopup = new PopupWithSubmit('.popup_type_submit', handleCardDelClick)
submitPopup.setEventListeners();

// like
function handleLikeClick(cardId, changeLikeCounter, colorLike, isAddLike) {
  if (isAddLike) {
    api.addLike(cardId)
      .then((response) => {
        changeLikeCounter(response.likes.length);
        colorLike()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
    } else {
    api.removeLike(cardId)
      .then((response) => {
        changeLikeCounter(response.likes.length);
        colorLike()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }
}

//LISTENERS
//открыть попап
buttonOpenEditProfilePopup.addEventListener('click', function () {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
});

buttonOpenAvatarPopup.addEventListener('click', () => { 
  popupAvatar.open() 
});

buttonOpenAddCardPopup.addEventListener('click', () => { 
  popupAddProfile.open();
  popupAddProfileValidator.disableSubmitButton();
});

  
