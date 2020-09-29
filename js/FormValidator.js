class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    
    this.checkInputValidity = this.checkInputValidity.bind(this);
    this.checkFormValidity = this.checkFormValidity.bind(this);
    this.deleteErrorMessages = this.deleteErrorMessages.bind(this);
    this.init();
  }

  // Проверяет input на валидность
  checkInputValidity(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
    }

    if (input.type === 'url' && input.validity.typeMismatch) {
      input.setCustomValidity(this.errorMessages.wrongLink);
    }

    return input.checkValidity();
  }

  errorSearch(input) {
    return this.form.querySelector(`#${input.id}-error`);
  }

  // Выводит сообщения об ошибках
  displayErrorMessages(input) {
    const valid = this.checkInputValidity(input);
    this.errorSearch(input).textContent = input.validationMessage;
    return valid;
  }

  // Удаляет сообщения об ошибках
  deleteErrorMessages() {
    this.inputs.forEach((input) => {
      const errorElem = this.errorSearch(input);
      errorElem.textContent = '';
    });
  }

  // Проверяет форму на валидность
  checkFormValidity() {
    return !this.inputs.some(input => !this.checkInputValidity(input));
  }

  // Активирует и деактивирует кнопки
  setSubmitButtonState(state) {
    if (state) {
      this.submit.removeAttribute('disabled');
      this.submit.classList.add('button_active');
    } else {
      this.submit.setAttribute('disabled', '');
      this.submit.classList.remove('button_active');
    }
  }

  inputFormHandler(evt) {
    this.displayErrorMessages(evt.target);

    if (this.inputs.every(this.checkInputValidity)) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', (evt) => this.inputFormHandler(evt), true);
  }

  init() {
    const inputs = [...this.form.elements].filter((item) => item.classList.contains('popup__input'));
    const submit = this.form.querySelector('.button');
    
    this.inputs = inputs;
    this.submit = submit;
    this.setEventListeners();
  }
}
