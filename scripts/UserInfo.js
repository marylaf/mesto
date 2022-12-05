export default class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._description = document.querySelector(profileDescriptionSelector);
  }
  getUserInfo() {
    const userInfo = {
      Name: this._name.textContent,
      Description: this._description.textContent,
    };
    return userInfo;
  }
  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
