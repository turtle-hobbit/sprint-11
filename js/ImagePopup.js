class ImagePopup extends Popup {
    constructor({
      popupImage: popup,
      closeImageButton: closeButton,
      openImage
    }) {
      super(popup, closeButton);
      this.openButton = openImage;
      super.setEventListener();
    }
  
    open(link) {
      super.open();
      this.openButton.setAttribute('src', link);
    }
  }