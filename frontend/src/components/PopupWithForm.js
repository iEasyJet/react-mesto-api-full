import { useEffect } from 'react';
function PopupWithForm({
  title,
  name,
  modifier = '',
  onClose,
  isOpen,
  closeOnOverlay,
  children,
  buttonText,
  onSubmit,
}) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);


  return (
    <article
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : false}`}
      onClick={closeOnOverlay}
    >
      <div className={`popup__box popup__box_${modifier}`}>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          <>{children}</>
          <button className="popup__btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
