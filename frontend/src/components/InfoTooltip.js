import success from '../images/infoTooltip/success.svg';
import fail from '../images/infoTooltip/fail.svg';
import { useEffect } from 'react';

function InfoTooltip({ closeOnOverlay, isOpen, isAuth, onClose }) {
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
      className={`infoTooltip ${isOpen ? 'popup_opened' : false}`}
      onClick={closeOnOverlay}
    >
      <div className="infoTooltip__box">
        <img
          className="infoTooltip__img"
          src={isAuth ? success : fail}
          alt={isAuth ? 'Подтверждение регистрации' : 'Провал регистрации'}
        />
        <button
          type="button"
          className="infoTooltip__close"
          onClick={onClose}
        ></button>
        <p className="infoTooltip__text">
          {isAuth
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </article>
  );
}

export default InfoTooltip;
