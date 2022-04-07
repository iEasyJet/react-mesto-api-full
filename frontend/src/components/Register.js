import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useRef } from 'react';

function Register({ onSubmit }) {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const pushToLogin = () => {
    history.push('/sign-in');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };
    onSubmit(userData);
  };
  return (
    <div className="registr">
      <h2 className="registr__title">Регистрация</h2>
      <form className="resitr__form" onSubmit={submitHandler}>
        <input
          placeholder="Email"
          type="email"
          className="registr__email"
          ref={emailRef}
          required
        />
        <input
          placeholder="Пароль"
          type="password"
          className="resitr__password"
          ref={passwordRef}
          required
        />
        <button type="submit" className="registr__form-button">
          Зарегистрироваться
        </button>
      </form>
      <button type="button" className="registr__button" onClick={pushToLogin}>
        Уже зарегистрированы? Войти
      </button>
    </div>
  );
}

export default Register;
