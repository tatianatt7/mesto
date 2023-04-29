import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('input');
    }

    _getInputValues() {
        const formValues = {};
        this._inputs.forEach((input) => {formValues[input.getAttribute('name')] = input.value});
        return formValues;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormCallback(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}