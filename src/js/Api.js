export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  processResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }
  
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(this.processResult);
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(this.processResult);
  }

  changeUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name.value,
        about: about.value
      })
    })
      .then(this.processResult);
  }

  addCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this.processResult);
  }
}