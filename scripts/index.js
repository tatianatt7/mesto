const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const popupOpenBnt = document.querySelector('.profile__edit-btn');

let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_value_user-name');
let jobInput = document.querySelector ('.popup__input_value_job');
let profileUserName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__job');


//открыть popup
function openPopup () {
    popup.classList.add('popup_opened');
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileJob.textContent;
}

//закрыть popup
function closePopup () {
    popup.classList.remove('popup_opened');
}

//submit
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    
    profileUserName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
    


//listeners
popupOpenBnt.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);