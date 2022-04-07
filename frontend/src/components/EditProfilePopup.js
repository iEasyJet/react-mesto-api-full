import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({
  isOpen,
  onClose,
  closeOnOverlay,
  onUpdateUser,
  changeButtonName,
}) {

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlay={closeOnOverlay}
      onSubmit={handleSubmit}
      buttonText={changeButtonName ? 'Сохранение...' : 'Сохранить'}
      children={
        <>
          <input
            type="text"
            placeholder="Ваше имя"
            className="popup__input popup__input_type_name"
            id="popup__input-name"
            value={name || ''}
            name="name"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
          <span className="popup__input-error popup__input-name-error"></span>

          <input
            type="text"
            placeholder="О себе"
            className="popup__input popup__input_type_job"
            id="popup__input-job"
            value={description || ''}
            name="job"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
          />
          <span className="popup__input-error popup__input-job-error"></span>
        </>
      }
    />
  );
}

export default EditProfilePopup;
