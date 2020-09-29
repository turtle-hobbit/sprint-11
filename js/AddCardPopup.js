class AddCardPopup extends Popup {
    constructor({
      popupAddCard: popup,
      formAddCard: form,
      closeFormAddCardButton: closeButton, api,
      name, link, openFormAddCardButton, addCardButton, formAddCardValidator, addCard}) {
      super(popup, closeButton);
      this.form = form;
      this.name = name;
      this.link = link;
      this.addCardButton = addCardButton;
      this.openButton = openFormAddCardButton;
      this.deleteErrorMessages = formAddCardValidator.deleteErrorMessages;
      this.addCard = addCard;
      this.api = api;

      this.open = this.open.bind(this);
      this.setEventListeners();
    }

    open() {
      this.addCardButton.setAttribute('disabled', '');
      this.addCardButton.classList.remove('button_active');
      this.form.reset();
      this.deleteErrorMessages();
      super.open();
    }

    submitFormHandler(evt) {
      evt.preventDefault();
      this.api.addCard(this.name.value, this.link.value)
        .then(() => {
          this.addCard(this.name.value, this.link.value);
          super.close()
        })
        .catch(err => console.log(err));
      /*
       Надо исправить:
       - Закрываться попап должен только после успешного выполнения запроса
      */
    }

    setEventListeners() {
      this.openButton.addEventListener('click', this.open);
      this.form.addEventListener('submit', (evt) => this.submitFormHandler(evt));
    }
  }
