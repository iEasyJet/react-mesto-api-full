import React, { useRef } from 'react';

function Login({ onSubmit }) {

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandel = (e) => {
    e.preventDefault();
    const userData = {
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };
    onSubmit(userData);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={submitHandel}>
        <input
          placeholder="Email"
          type="email"
          className="login__email"
          ref={emailRef}
          required
        />
        <input
          placeholder="Пароль"
          type="password"
          className="login__password"
          ref={passwordRef}
          required
        />
        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
