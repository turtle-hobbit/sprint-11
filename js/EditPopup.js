class EditPopup extends Popup {
    constructor({
      popupEdit: popup,
      formEdit: form,
      closeFormEditButton: closeButton,
      username, userInfoName, about, userInfoJob, api,
      formEditValidator, updateUserInfo, openFormEditButton}) {
      super(popup, closeButton);
      this.form = form;
      this.username = username;
      this.userInfoName = userInfoName;
      this.about = about;
      this.userInfoJob = userInfoJob;
      this.openButton = openFormEditButton;
      this.saveChangesButton = formEditValidator.saveChangesButton;
      this.checkFormValidity = formEditValidator.checkFormValidity;
      this.deleteErrorMessages = formEditValidator.deleteErrorMessages;
      this.updateUserInfo = updateUserInfo;
      this.api = api;

      this.open = this.open.bind(this);
      this.setEventListeners();
    }

    open() {
      this.username.value = this.userInfoName.textContent;
      this.about.value = this.userInfoJob.textContent;
      if (!this.checkFormValidity()) {
        this.saveChangesButton.removeAttribute('disabled');
        this.saveChangesButton.classList.add('button_active');
      }
      this.deleteErrorMessages();
      super.open();
    }

    submitFormHandler(evt) {
      evt.preventDefault();
      this.api.changeUserInfo(this.username, this.about)
        .then(() => {
          this.updateUserInfo();
          super.close()
        })
        .catch(err => console.log(err));
    }

    setEventListeners() {
      this.openButton.addEventListener('click', this.open);
      this.form.addEventListener('submit', (evt) => this.submitFormHandler(evt));
    }
  }
