export default class Api {
    constructor(config) {
        this._baseUrl=config.baseUrl;
        this._headers=config.headers;
    }
//отправляем запрос к серверу
    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
//ответ о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method:'GET',
            headers:this._headers
        })
        .then((res) => this._checkResponse(res))
    }
//отправляем инфо о пользователе на сервер
    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method:'PATCH',
            headers: this._headers,
            body: JSON.stringify({name, about})
        })
        .then((res) => this._checkResponse(res))
    }
//получаем Cards
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method:'GET',
            headers: this._headers
        })
        .then((res) => this._checkResponse(res))
    }
// добавляем Cards
    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({name, link})
        })
        .then((res) => this._checkResponse(res))
    }
//удаляем Cards
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }
//ставим Like
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => this._checkResponse(res))
    }
//удаляем Like
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE', 
            headers: this._headers
        })
        .then((res) => this._checkResponse(res))
    }
//корректируем аватар
    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar})
        })
        .then((res) => this._checkResponse(res))
    }
}

