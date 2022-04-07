import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  closeOnOverlay,
  onUpdateCards,
  changeButtonName,
}) {
  const placeName = useRef();
  const linkOnPlace = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const newCard = {
      name: placeName.current.value,
      link: linkOnPlace.current.value,
    };
    onUpdateCards(newCard);
  }

  useEffect(() => {
    placeName.current.value = "";
    linkOnPlace.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlay={closeOnOverlay}
      onSubmit={handleSubmit}
      buttonText={changeButtonName ? "Создание..." : "Создать"}
      children={
        <>
          <input
            type="text"
            placeholder="Название"
            className="popup__input popup__input_type_name-img"
            id="popup__input-place"
            defaultValue=""
            name="nameImg"
            required
            minLength="2"
            maxLength="30"
            ref={placeName}
          />
          <span className="popup__input-error popup__input-place-error"></span>

          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link-img"
            id="popup__input-url"
            defaultValue=""
            name="linkImg"
            required
            ref={linkOnPlace}
          />
          <span className="popup__input-error popup__input-url-error"></span>
        </>
      }
    />
  );
}

export default AddPlacePopup;
