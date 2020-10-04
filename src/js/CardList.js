export default class CardList {
  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
  }

  addCard(name, link) {
    const card = this.createCard(name, link);
    this.container.append(card);
  }

  render(array) {
    array.forEach((card) => {
      this.addCard(card.name, card.link);
    });
  }
}
