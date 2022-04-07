import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, closeOnOverlay, onUpdateAvatar, changeButtonName }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]); 
  
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      modifier="update_avatar"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlay={closeOnOverlay}
      onSubmit={handleSubmit}
      buttonText={changeButtonName ? 'Сохранение...' : 'Сохранить'}
      children={
        <>
          <input
            type="url"
            placeholder="Ссылка на аватар"
            name="avatar"
            className="popup__input"
            id="popup__input-urlAvatar"
            defaultValue=""
            ref={avatarRef}
            required
          />
          <span className="popup__input-error popup__input-urlAvatar-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
