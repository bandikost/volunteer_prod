import ButtonToAddCart from "../components/ui/Buttons/ButtonToAddCart";
import axios from "axios";
import { getCurrentUser } from "../components/ui/Account/auth";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const user = useMemo(() => getCurrentUser(), []);

  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/animals/favorites/user/${user.id}`
      );
      setFavorites(data);
    } catch (e) {
      console.error(e);
    }
  }, [user]);

    useLayoutEffect(() => {
      document.title = `Избранное | Animals`
     })

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (!user) return <p>Вы не авторизованы</p>;
  if (favorites.length === 0) return <p>Нет животных в избранном</p>;

  return (
    <section className="flex flex-col">
      <h1 className="flex items-center justify-center text-2xl">Избранное</h1>
      <div className="flex items-center justify-between mt-10">
        <div className="flex flex-col">
          <ul>
            {favorites.map((item) => (
              <li
                key={item.id}
                className="flex flex-row justify-start p-4 text-lg"
              >
                <p>{item.name}</p>
                <ButtonToAddCart
                  className="p-0 w-0 h-0 !bg-transparent text-center flex items-center justify-center"
                  animal={item}
                  onUpdate={fetchFavorites} // передаем callback
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
