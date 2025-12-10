import axios from "axios";
import { addToFavorite } from "../../../store/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../Account/auth";
import { useMemo } from "react";
import { HeartFilled, HeartOutline } from "../../svg/Hearth";

export default function ButtonToAddCart({ animal, onUpdate }) {
  const dispatch = useDispatch();
  const user = useMemo(() => getCurrentUser(), []);
  const favoriteItems = useSelector(state => state.favorite.items);

  const isInFavorite = favoriteItems.some(a => a.id === animal.id);

  const handleClick = async () => {
    if (!user) return

    if (!isInFavorite) {
      // Добавляем в избранное
      dispatch(addToFavorite(animal));
      try {
        await axios.post("http://localhost:5000/animals/favorites", {
          user_id: user.id,
          animal_id: animal.id,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      // Убираем из избранного
      dispatch(addToFavorite(animal));
      try {
        await axios.delete("http://localhost:5000/animals/favorites", {
          data: { user_id: user.id, animal_id: animal.id },
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (onUpdate) onUpdate(); // обновляем список favorites
  };

  return (
    <button className="!bg-transparent !p-0" onClick={handleClick}>
      {isInFavorite ? <HeartFilled /> : <HeartOutline />}
    </button>
  );
}
