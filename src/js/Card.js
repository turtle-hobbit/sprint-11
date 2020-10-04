export default class Card {
  constructor(openImagePopup) {
    this.openImagePopup = openImagePopup;

    this.remove = this.remove.bind(this);
    this.render();
  }

  like(evt) {
    evt.target.classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this.removeEventListeners();
    this.card.remove()
  }

  create() {
    const markup = `
    <div class="place-card">
      <div class="place-card__image"></div>
      <button class="place-card__delete-icon"></button>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>
    `;

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup);

    return element.firstElementChild;
  }

  render(name, link) {
    this.card = this.create();
    this.card.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
    this.card.querySelector('.place-card__name').textContent = name;

    this.setEventListeners(link);

    return this.card;
  }

  setEventListeners(link) {
    this.openPopup = () => this.openImagePopup(link);
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove, { once: true });
    this.card.querySelector('.place-card__image').addEventListener('click', this.openPopup);
  }

  removeEventListeners() {
    this.card.querySelector('.place-card__image').removeEventListener('click', this.openPopup);
    this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
  }
}
