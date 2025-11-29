import ButtonToAddCart from "./ui/ButtonToAddCart"
import { useAnimals } from "../hooks/useAnimals";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./ui/auth";


export default function Card() {
  const { animals, loading, error } = useAnimals(true);

  const user = getCurrentUser();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

 
  if (!user) {
    return (
      <div>
        <p>Вы не авторизированы</p>
        <div className="grid gap-4 grid-cols-2 mt-10">
          <p>Чтобы просматривать контент авторизируйтесь в <Link to={"/profile"} className="underline text-blue-600">профиле</Link></p>
        </div>
      </div>
    );
  }

    return (

    <section className="grid gap-6 grid-cols-3 mt-10">
      
    {animals
     .filter(a => a.lefts > 0)
     .map(a => ( 
      <div key={a.id} className="flex flex-col h-auto w-full px-8 border p-2 rounded-xl">
        <h1 className="text-xl mt-4">{a.name}</h1>
        
        {a.owner_name && (
          <Link to={`/user/${a.owner_id}`}
            state={{ owner: { first_name: a.owner_name, rights: a.owner_rights || 0, id: a.owner_id, descrip: a.owner_descrip }}}
            className="mt-2 text-sm text-blue-500">
            Владелец: {a.owner_name}
          </Link>
      )}

          {user && a.owner_id === user.id && user.rights > 0 && (
            <div className="mt-2 p-1 text-center border border-green-700 rounded bg-green-600">
              Подтвержденный профиль
            </div>
          )}

        <article className="h-20">{a.descrip}</article>
        <p className="my-4">Осталось: {a.lefts}</p>
        <div className="flex items-center mb-4">   
            <ButtonToAddCart animal={a} >
              Добавить
            </ButtonToAddCart>  {/* Передаем animal, чтобы не пришлось перебирать массив в дочернем el */}
            <button className="mx-2">
              <Link to={`/card/${a.id}`} aria-label="Перейти к описанию товара">Перейти</Link>
            </button>
        </div> 
        
      </div>
    ))}
    </section>

    )
}