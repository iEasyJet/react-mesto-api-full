import React from 'react';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';

import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import DeletionConfirmationPopup from './DeletionConfirmationPopup.js';
import InfoTooltip from './InfoTooltip.js';

import api from '../utils/Api';
import auth from '../utils/Auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  /* Все стейты */
  /* Открытие попапов */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletionConfirmationPopup, setIsDeletionConfirmationPopup] =
    useState(false);
  const [isRegistrationPopup, setIsRegistrationPopup] = useState(false);
  /*  */
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [changeButtonName, setChangeButtonName] = useState(false);

  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    name: '',
    link: '',
  });

  const [deltedCardId, setDeltedCardId] = useState({ id: '' });

  const [userInfo, setUserInfo] = useState([]);

  const [isAuth, setIsAuth] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  const location = useLocation();

  // Проверка токена по-ля
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      auth.checkToken(token)
        .then(() => {
          setLoggedIn(true);
          api.getUserUnfo(token)
            .then((res) => {
              setUserInfo(res.user.email);
              setCurrentUser(res.user);
            })
          api.getInitalCards(token)
            .then((res) => {
              setCards(res.cards.reverse());
            })
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, history]);
  /*  */

  // Авторизация пол-ля
  const onLogin = (data) => {
    return auth
      .authorization(data, localStorage.getItem('jwt'))
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        api.getUserUnfo(res.token)
          .then((res) => {
            setUserInfo(res.user.email);
            setCurrentUser(res.user);
        })
        api.getInitalCards(res.token)
          .then((res) => {
            setCards(res.cards.reverse());
        })
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*  */

  // Регистрация пол-ля
  const onRegistr = (data) => {
    return auth
      .registration(data)
      .then((data) => {
        setLoggedIn(true);
        history.push('/sign-in');
        setIsRegistrationPopup(true);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationPopup(true);
        setIsAuth(false);
      });
  };
  /*  */

  // Выход пол-ля
  function onLogout () {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setUserInfo('');
    setCurrentUser('')
  };
  /*  */

  /* Перенаправление к логину/регистрации */
  const toLogin = () => {
    history.push('/sign-up');
  };
  const toRegistr = () => {
    history.push('/sign-in');
  };
  /*  */

  /* Функции открытия попапов профиля, аватара, нового места */
  function handleClickEditProfile() {
    setIsEditProfilePopupOpen(true);
  }
  function handleClickAddPlace() {
    setAddPlacePopupOpen(true);
  }
  function handleClickEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, name: card.name, link: card.link });
  }
  function handleClickDeletionConfirmation(cardId) {
    setIsDeletionConfirmationPopup(true);
    setDeltedCardId(cardId);
  }
  /*  */

  /* Закрытие всех аватаров */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletionConfirmationPopup(false);
    setIsRegistrationPopup(false);
    setSelectedCard({ isOpen: false, name: '', link: '' });
  }
  /*  */

  /* Закрытие по оверлею */
  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }
  /*  */

  /* Смена информации о пользователе */
  function handleUpdateUser(name, about) {
    setChangeButtonName(true);
    api
      .changeUserInfo(name, about, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChangeButtonName(false);
      });
  }
  /*  */

  /* Обновление аватара */
  function handleUpdateAvatar(link) {
    setChangeButtonName(true);
    api
      .changeUserAvatar(link, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChangeButtonName(false);
      });
  }
  /*  */

  /* Удаление/Проставление лайка */
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  /*  */

  /* Удаление карточки */
  function handleCardDelete() {
    setChangeButtonName(true);
    api
      .deleteCard(deltedCardId, localStorage.getItem('jwt'))
      .then(() => {
        setCards(cards.filter((item) => item._id !== deltedCardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChangeButtonName(false);
      });
  }
  /*  */

  /* Добавление карточки */
  function handleAddPlaceSubmit(card) {
    setChangeButtonName(true);
    api
      .addNewCard(card, localStorage.getItem('jwt'))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChangeButtonName(false);
      });
  }
  /*  */

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          buttonText={
            location.pathname === '/sign-in'
              ? 'Зарегистрироваться'
              : location.pathname === '/sign-up'
              ? 'Войти'
              : 'Выйти'
          }
          email={location.pathname === '/' ? userInfo : ''}
          onClick={
            location.pathname === '/'
              ? onLogout
              : location.pathname === '/sign-in'
              ? toLogin
              : toRegistr
          }
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleClickEditProfile}
            onAddPlace={handleClickAddPlace}
            onEditAvatar={handleClickEditAvatar}
            onEditImg={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleClickDeletionConfirmation}
          />

          <Route path="/sign-up">
            <Register onSubmit={onRegistr} />
          </Route>

          <Route path="/sign-in">
            <Login onSubmit={onLogin} />
          </Route>
        </Switch>

        <Footer />
        {/* Попапы */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          closeOnOverlay={closeOnOverlay}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closeOnOverlay={closeOnOverlay}
          onUpdateUser={handleUpdateUser}
          changeButtonName={changeButtonName}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closeOnOverlay={closeOnOverlay}
          onUpdateCards={handleAddPlaceSubmit}
          changeButtonName={changeButtonName}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          closeOnOverlay={closeOnOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          changeButtonName={changeButtonName}
        />
        <DeletionConfirmationPopup
          isOpen={isDeletionConfirmationPopup}
          onClose={closeAllPopups}
          closeOnOverlay={closeOnOverlay}
          onSubmit={handleCardDelete}
          changeButtonName={changeButtonName}
        />
        <InfoTooltip
          isOpen={isRegistrationPopup}
          closeOnOverlay={closeOnOverlay}
          isAuth={isAuth}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
