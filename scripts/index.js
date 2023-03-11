const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// let popupForm = document.querySelector('.popup__form');

//КОНСТАНТЫ
//попапы
//const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupZoom = document.querySelector('.popup_type_zoom');

//кнопки открытия попапов
const editOpenButton = document.querySelector('.profile__edit-btn');
const addOpenButton = document.querySelector('.profile__add-btn');
const zoomOpenButton = document.querySelector('.card');

//кнопка закрытия попапов
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');

//popup data
//edit
const nameInput = popupEdit.querySelector('.popup__input_value_user-name');
const jobInput = popupEdit.querySelector ('.popup__input_value_job');
const profileUserName = document.querySelector('.profile__user-name');
const profileJob = document.querySelector('.profile__job');

//add
const cardNameInput = popupAdd.querySelector('.popup__input_value_card-name');
const cardLinkInput = popupAdd.querySelector('.popup__input_value_card-link');


//zoom
const zoomLink = popupZoom.querySelector('.popup__zoom-image');
const zoomTitle = popupZoom.querySelector('.popup__card-title');

//cards
const cardsList = document.querySelector('.cards__list');

//ФУНКЦИИ
//функция открыть popup
function openPopup (popup) {
    popup.classList.add('popup_opened');
}

//функция закрыть popup
function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

//функция submit
function handleEditFormSubmit (event) {
    event.preventDefault(); 
    profileUserName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}
function handleAddFormSubmit (event) {
    event.preventDefault();
    cardsList.prepend(createCard(cardNameInput.value,cardLinkInput.value));
    event.target.reset();
    closePopup(popupAdd);
}

//создание карточки
function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
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
editOpenButton.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileJob.textContent;
});

addOpenButton.addEventListener('click', function() {
    openPopup(popupAdd);
});

//закрыть попап по крестику
popupCloseBtns.forEach((button) => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'))
    });
});

//закрыть попап по сабмиту
popupEdit.addEventListener('submit', handleEditFormSubmit);
popupAdd.addEventListener('submit', handleAddFormSubmit);