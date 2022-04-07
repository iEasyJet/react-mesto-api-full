class Api {
  constructor(config) {
    this._url = config.url;
  }

  // Анализирование ответа
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Произошла ошибка со статус-кодом ${res.status}`)
    );
  }

  // Получение информации о пользователе с сервера
  getUserUnfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => this._parseResponse(res));
  }

  // Получение карточек с сервера
  getInitalCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => this._parseResponse(res));
  }

  // Изменение информации о пользователе
  changeUserInfo(name, job, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then(res => this._parseResponse(res));
  }

  // Добавление новой карточки
  addNewCard(card, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(res => this._parseResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => this._parseResponse(res));
  }

  // Проставление/Удаление лайка
  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => this._parseResponse(res));
  }

  // Смена аватара пользователя
  changeUserAvatar(link, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(res => this._parseResponse(res));
  }
}

const configApi = {
  url: 'https://api.easyjet.nomoredomains.work'
};

const api = new Api(configApi);

export default api;
