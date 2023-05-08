import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleCardDelClick) {
        super(popupSelector);
        this._cardsId = null;
        this._deleteCardFunction = null;
        this._handleCardDelClick = handleCardDelClick;
        this._confirmButton = this._popup.querySelector('.popup__submit-btn');
     }

     open = (deleteCrd, cardsId) => {
        super.open();
        this._deleteCardFunction = deleteCrd;
        this._cardsId = cardsId;
     }

     setEventListeners = () => {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handleCardDelClick(this._deleteCardFunction, this._cardsId)
        })
     }
     }
