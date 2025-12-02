import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../ui/auth";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const user = getCurrentUser();
  const owner = user 
  const [animals, setAnimals] = useState([]);
  

 useEffect(() => {
    if (!owner) return;

    axios.get(`http://localhost:5000/animals/user/${owner.id}`)
      .then((res) => setAnimals(res.data))
      .catch((err) => console.error(err));
  }, [owner]);

  if (!user) {
    return (
      <div>
        <p>Вы не авторизированы</p>
        <div className="grid gap-4 grid-cols-2 mt-10">
          <Link to={"/login"}><button className="w-full">Авторизация</button></Link>
          <Link to={"/register"}><button className="w-full">Регистрация</button></Link>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      {user.rights > 0 && (
          <div className="mt-20 w-52 !p-0 text-center border border-green-700 rounded bg-green-600 z-10 shadow-3xl">
          <p className="text-sm">Подтвержденный профиль</p>
          </div>      
      )}


        <div className="flex items-center">
            <h1>Профиль пользователя: {user.first_name}</h1>
            <button className="!py-1 !px-4" onClick={logout}>выйти</button>
        </div>
      
      {user.volunteer < 1 ? (
        <div className="w-full mt-20">
          <p className="text-xl">Ваши отклики:</p>
          <ul className="grid grid-cols-2 gap-2 justify-items-center">
              <li className="px-4">1</li>
              <li className="px-4">1</li>
              <li className="px-4">1</li>
              <li className="px-4">1</li>
          </ul>
        </div>    
            ): (
              <>
              <h2 className="mt-4">Список ваших животных:</h2>
              {animals.length > 0 ? (
            <ul className="mt-4 grid gap-2 grid-cols-2 items-center text-center justify-center">
              {animals.map((animal) => (
                <li key={animal.id} className="border p-2 mb-2 rounded">
                  <p>Имя: {animal.name}</p>
                  <p>Тип животного: {animal.type}</p>
                  <div className="grid gap-2 grid-cols-2">  
                    <Link to={`/card/${animal.id}`}><button className="mt-4 w-full">Перейти</button></Link>
                    <button className="mt-4">Редактировать</button>
                  </div>  
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">У вас еще нет выставленных животных.</p>
          )}

                <div className="flex flex-col justify-center items-center mt-4">
                  <button>Добавить животного</button>
                </div>
              </>    
            )}
  

     
    </section>
  );
}
