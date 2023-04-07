import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, config } from "./constants.js";

// let popupForm = document.querySelector('.popup__form');

//КОНСТАНТЫ
//попапы
//const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddProfile = document.querySelector('.popup_type_add');
const popupZoom = document.querySelector('.popup_type_zoom');

//формы
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');

//кнопки открытия попапов
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-btn');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-btn');
const zoomOpenButton = document.querySelector('.card');

//кнопка закрытия попапов
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
//popup data
//edit
const nameInput = popupEditProfile.querySelector('.popup__input_value_user-name');
const jobInput = popupEditProfile.querySelector ('.popup__input_value_job');
const profileUserName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__job');

//add
const cardNameInput = popupAddProfile.querySelector('.popup__input_value_card-name');
const cardLinkInput = popupAddProfile.querySelector('.popup__input_value_card-link');


//zoom
const zoomLink = popupZoom.querySelector('.popup__zoom-image');
const zoomTitle = popupZoom.querySelector('.popup__card-title');

//cards
const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

//errors
//const errors = document.querySelectorAll('.popup__error');

//ФУНКЦИИ
//функция открыть popup
function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//функция закрыть popup
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//функция закрыть по Overlay
function closePopupByOverlay (event) {
    const popupOpened = document.querySelector('.popup_opened')
    if(event.target === popupOpened) {
        closePopup(popupOpened)
    }
};

//закрыть попап по Esc
function closePopupByEsc (event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        if(popupOpened) {
            closePopup(popupOpened)
        }
    }
};

//функция submit
function handleEditFormSubmit (event) {
    event.preventDefault(); 
    profileUserName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}
const addCardSubmitButton = formAdd.querySelector('.popup__submit-btn');
function handleAddFormSubmit (event) {
    event.preventDefault();
    renderCard(cardNameInput.value,cardLinkInput.value, openZoomPopup);
    event.target.reset();
    addCardSubmitButton.disabled = true;
    addCardSubmitButton.classList.add('popup__submit-btn_disabled');
    closePopup(popupAddProfile);
}

//открытие zoom
function openZoomPopup(name, link) {
    openPopup(popupZoom);
    zoomTitle.textContent = name;
    zoomLink.src = link;
    zoomTitle.alt = name;
};

//рендер карточек
function renderCard(name, link, handleCardClick) {
    const newCard = new Card({name, link}, '#card-template', handleCardClick).generateCard();
    cardsList.prepend(newCard)
}

initialCards.forEach(card => renderCard(card.name, card.link, openZoomPopup));

//LISTENERS
//открыть попап
buttonOpenEditProfilePopup.addEventListener('click', function() {
    openPopup(popupEditProfile);
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileJob.textContent;
});

buttonOpenAddCardPopup.addEventListener('click', function() {
    openPopup(popupAddProfile);
    formAdd.reset();
});

//закрыть попап по крестику
popupCloseBtns.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'))
    });
});

//закрыть попап по сабмиту
formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

//закрыть попап по Overlay
document.addEventListener('mousedown', closePopupByOverlay);

//экземпляры класса валидации
const popupEditProfileValidator = new FormValidator(config, popupEditProfile);
popupEditProfileValidator.enableValidation();

const popupAddProfileValidator = new FormValidator(config, popupAddProfile);
popupAddProfileValidator.enableValidation();