class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  getProfile() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  editProfile(name, about) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  addNewAvatar(avatar) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes `, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes `, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .catch(console.log);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "7be2f97c-84ef-4652-a179-1ed7677c4124",
    "Content-Type": "application/json",
  },
});
