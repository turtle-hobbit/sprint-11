class UserInfo {
  constructor({userInfoName, userInfoJob, userInfoPhoto}) {
    this.userName = userInfoName;
    this.userJob = userInfoJob;
    this.userPhoto = userInfoPhoto;
  }

  setUserInfo(name, about, avatar) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
  }

  updateUserInfo() {
    this.userName.textContent = this.name;
    this.userJob.textContent = this.about;
    this.userPhoto.style.backgroundImage = `url(${this.avatar})`;
  }
}

