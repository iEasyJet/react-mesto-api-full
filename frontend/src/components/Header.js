import logo from "../images/header/logo.svg";

function Header({buttonText, email, onClick}) {
  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="Логотип" className="header__img" />
      </a>
      <div className="header__box">
        <p className="header__email">
          {email}
        </p>
        <button className="header__button" type="button" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </header>
  );
}

export default Header;
