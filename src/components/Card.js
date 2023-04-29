export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.card__image');
        this._title = this._card.querySelector('.card__title');
        this._like = this._card.querySelector('.card__like-btn');
        this._trash = this._card.querySelector('.card__trash-btn');
    };

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    _toggleLike(event) {
        event.target.classList.toggle('card__like-btn_active');
    }

    _deleteCard() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this.setEventListeners();
        this._title.textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;

        return this._card;
    };

    setEventListeners() {
        this._like.addEventListener('click', this._toggleLike);
        this._trash.addEventListener('click', () => { this._deleteCard() });
        this._image.addEventListener('click', () => { this._handleCardClick( this._name, this._link ) });
    }

};


