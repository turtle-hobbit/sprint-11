(function () {
  'use strict';

  const placesContainer = document.querySelector('.places-list');

  const popupAddCard = document.querySelector('#popupAddCard');
  const formAddCard = document.forms.new;
  const { name, link } = formAddCard.elements;
  const openFormAddCardButton = document.querySelector('.user-info__button');
  const closeFormAddCardButton = popupAddCard.querySelector('#popupAddCardClose');
  const addCardButton = popupAddCard.querySelector('#popupAddCardButton');

  const popupEdit = document.querySelector('#popupEdit');
  const formEdit = document.forms.edit;
  const { username, about } = formEdit.elements;
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  const userInfoPhoto = document.querySelector('.user-info__photo');
  const openFormEditButton = document.querySelector('.user-info__button-edit');
  const closeFormEditButton = popupEdit.querySelector('#popupEditClose');

  const popupImage = document.querySelector('#popupImage');
  const closeImageButton = popupImage.querySelector('#popupImageClose');
  const openImage = popupImage.querySelector('.popup__image');


  const api = new Api({
    url: 'https://nomoreparties.co/cohort12',
    headers: {
      'Content-Type': 'application/json',
      authorization: '06ab31b3-7e13-49b3-85d4-2d4d84ad2dae'
    }
  });
  const cardList = new CardList(placesContainer, createCard);
  const formEditValidator = new FormValidator(formEdit, errorMessages);
  const formAddCardValidator = new FormValidator(formAddCard, errorMessages);
  const imagePopup = new ImagePopup({popupImage, openImage, closeImageButton});
  const userInfo = new UserInfo({userInfoName, userInfoJob, userInfoPhoto});
  new AddCardPopup({popupAddCard, formAddCard, name, link, addCardButton, openFormAddCardButton, closeFormAddCardButton, formAddCardValidator, api, addCard});
  new EditPopup({popupEdit, formEdit, username, userInfoName, about, userInfoJob, openFormEditButton, closeFormEditButton, formEditValidator, api, updateUserInfo});

  /* Функции */

  // Создает карточку
  function createCard(name, link) {
    const myCard = new Card(openImagePopup);
    return myCard.render(name, link);
  }

  // Добавляет карточку в разметку
  function addCard(name, link) {
    cardList.addCard(name, link);
  }

  // Открывает поп-ап с картинкой
  function openImagePopup(link) {
    imagePopup.open(link);
  }

  // Обновляет данные о пользователе
  function updateUserInfo() {
    api.getUserInfo()
      .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);
        userInfo.updateUserInfo()
      })
      .catch(err => console.log(err));
  }

  // Отрисовывает карточки
  function showCards() {
    api.getCards()
      .then(res => {
        cardList.render(res);
      })
      .catch(err => console.log(err));
  }

  updateUserInfo();
  showCards();
})();

/*
 Что понравилось:
 - Реализовано добавление карточек
 - Порядок в коде
 - Правлиьный класс api.js
 - Есть комментарии
*/
