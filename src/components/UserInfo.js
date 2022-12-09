export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._description = document.querySelector(profileDescriptionSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._description.textContent,
    };
    return userInfo;
  }
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
  }
}
