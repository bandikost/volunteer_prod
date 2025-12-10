import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function User() {
  const { state } = useLocation();
  const owner = state?.owner; 

  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (!owner) return;

    axios.get(`http://localhost:5000/animals/user/${owner.id}`)
      .then((res) => setAnimals(res.data))
      .catch((err) => console.error(err));
  }, [owner]);

  return (
    <div>
      {owner ? (
        <>
          
          {owner.rights > 0 ? (
            <div className="mt-4 w-56 text-center border border-green-700 rounded bg-green-600 p-1">
              <p className="text-sm">Подтвержденный профиль</p>
            </div>
          ) : (
           <div className="mt-4 w-90 text-center border border-white-700 rounded bg-zinc-600 p-1">
              <p className="text-sm">Ожидание подтвержденения от администратора</p>
            </div>
          )}
          <h1 className="mt-2">Профиль пользователя: {owner.first_name}</h1>

          <article className="mt-8">
          <p>{owner.descrip}</p>
           {animals.length > 0 ? (
            <ul className="mt-4 grid gap-2 grid-cols-2 items-center text-center justify-center">
              {animals.map((animal) => (
                <li key={animal.id} className="border p-2 mb-2 rounded">
                  <p>Имя: {animal.name}</p>
                  <p>Тип животного: {animal.type}</p>
                  <button className="mt-4">
                    <Link to={`/card/${animal.id}`}>Перейти</Link></button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">У этого пользователя нет животных.</p>
          )}
          </article>
        </>
      ) : (
        <p>Профиль не найден</p>
      )}
    </div>
  );
}
