class Auth {
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

  // Регистрация /sign-up
  registration(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "password": data.password,
        "email": data.email,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Авторизация /sign-in
  authorization(data, token) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        "password": data.password,
        "email": data.email,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Проверка валидности токена /users/me
  checkToken(token) {
    return fetch(`${this._url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then((res) => this._parseResponse(res));
  }
}

const configAuth = {
  url: 'https://api.easyjet.nomoredomains.work',
};

const auth = new Auth(configAuth);
export default auth;
