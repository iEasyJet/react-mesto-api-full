import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onEditImg, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = card.likes.some(i => i === currentUser._id);
  const like = `${isLiked ? "card__like_active" : ""}`;

  const deleteTrash = card.owner !== currentUser._id;
  const trash = `card__delete ${deleteTrash ? "card__delete_hidden" : ""}`;

  function handleClick() {
    onEditImg(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }
  return (
    <li className="card__item">
      <button className={trash} onClick={handleDeleteClick}></button>
      <img
        src={card.link}
        alt={card.name}
        className="card__img"
        onClick={handleClick}
      />

      <div className="card__name">
        <h2 className="card__title">{card.name}</h2>
        <div className={`card__like ${like}`} onClick={handleLikeClick}>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
