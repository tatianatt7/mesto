export default class Card {
    constructor(data, templateSelector, handleCardClick, UsersID, handleDelIconClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._card = this._getTemplate();
        this._image = this._card.querySelector('.card__image');
        this._title = this._card.querySelector('.card__title');
        this._like = this._card.querySelector('.card__like-btn');
        this._trash = this._card.querySelector('.card__trash-btn');

        this._likeCounter = this._card.querySelector('.card__like-count');

        this._UsersID = UsersID;
        this._handleDelIconClick = handleDelIconClick;
        this._handleLikeClick = handleLikeClick;
        this._ownersId = data.owner._id;
        this._cardID = data._id;
        this._likes = data.likes;

        this._likeCounter.textContent = this._likes.length;
        // закрашиваем like
        if (this._likes.some((el) => el._id === this._UsersID)) this._colorLike();
        // Del card
        if (this._ownersId !== this._UsersID) {
            this._trash.style.display = 'none';
        }
        //return this._card;
    }

    _colorLike = () => this._like.classList.toggle('card__like-btn_active');

    _changeLikeCounter = (num) => this._likeCounter.textContent = num;

    _removeCard = () => this._card.remove();


    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
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
        this._image.addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
        this._trash.addEventListener('click', () => { this._handleDelIconClick(this._removeCard, this._cardID) });
        this._like.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('card__like-btn_active')) {
                this._handleLikeClick(this._cardID, this._changeLikeCounter, this._colorLike, false)
            } else {
                this._handleLikeClick(this._cardID, this._changeLikeCounter, this._colorLike, true)
            }
        });
    }


};


