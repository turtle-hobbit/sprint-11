export default class Popup {
  constructor(popup, closeButton) {
    this.popup = popup;
    /* + Можно лучше:

    Параметр openButton не используется в данном классе, но используется в дочернем классе ImagePopup,
    будет логичнее передавать этот параметр в конструктор класса ImagePopup, а не Popup
    */
    this.closeButton = closeButton;

    this.setEventListener();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  /* Можно лучше:

  Реализовать также закрытие попапа по клику на Escape
  */
  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListener() {
    this.closeButton.addEventListener('click', () => this.close());
  }
}