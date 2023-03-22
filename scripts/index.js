

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
const errors = document.querySelectorAll('.popup__error');

//ФУНКЦИИ
//функция открыть popup
function openPopup (popup) {
    popup.classList.add('popup_opened');
};

//функция закрыть popup
function closePopup (popup) {
    popup.classList.remove('popup_opened');
    errors.forEach(error => error.textContent = '');
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
function handleAddFormSubmit (event) {
    event.preventDefault();
    cardsList.prepend(createCard(cardNameInput.value,cardLinkInput.value));
    event.target.reset();
    closePopup(popupAddProfile);
}

//создание карточки
function createCard(name, link) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cards.querySelector('.card__image');
    const cardTitle = cards.querySelector('.card__title');
    const cardLikeBtn = cards.querySelector('.card__like-btn');
    const cardTrashBtn = cards.querySelector('.card__trash-btn');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    //открытие zoom
    cardImage.addEventListener('click', function() {
        openPopup(popupZoom);
        zoomTitle.textContent = name;
        zoomLink.src = link;
        zoomTitle.alt = name;
    });

    //likes
    cardLikeBtn.addEventListener('click', (event) => {
        event.target.classList.toggle('card__like-btn_active');
    });

    //trash
    cardTrashBtn.addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    })

    return cards;
}

//рендер карточек
function renderCards(name, link) {
    cardsList.prepend(createCard(name, link))
}

initialCards.forEach(card => renderCards(card.name, card.link, card.name));

//LISTENERS
//открыть попап
buttonOpenEditProfilePopup.addEventListener('click', function() {
    openPopup(popupEditProfile);
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileJob.textContent;
});

buttonOpenAddCardPopup.addEventListener('click', function() {
    openPopup(popupAddProfile);
    cardNameInput.value = '';
    cardLinkInput.value = '';
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

//закрыть попап по Esc
document.addEventListener('keydown', closePopupByEsc);