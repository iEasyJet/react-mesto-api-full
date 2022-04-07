import { useEffect } from 'react';

function ImagePopup({ card: { isOpen, name, link }, onClose, closeOnOverlay }) {

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
      className={`popup popup_type_pic ${isOpen ? 'popup_opened' : false}`}
      onClick={closeOnOverlay}
    >
      <div className="popup__pic-box">
        <img src={link} alt={name} className="popup__pic-expand" />
        <h3 className="popup__pic-title">{name}</h3>
        <button className="popup__close" onClick={onClose}></button>
      </div>
    </article>
  );
}

export default ImagePopup;
