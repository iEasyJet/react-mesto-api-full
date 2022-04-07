import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onEditImg,
  cards,
  onCardLike,
  onCardDelete,
}) {
  /* Подписка на контекст инфо о пол-ле */
  const currentUser = React.useContext(CurrentUserContext);
  /*  */


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div className="profile__img-box">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__img"
            />
            <button
              className="profile__pencil"
              type="button"
              onClick={onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__name-user">{currentUser.name}</h1>
            <p className="profile__name-job">{currentUser.about}</p>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>

        <button
          className="profile__btn"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="card">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onEditImg={onEditImg}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
