export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        console.log(this._popup)
        this._closeButton = this._popup.querySelector('.popup__close-btn');
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target === this._popup || event.target === this._closeButton) this.close();
        })
    }
}