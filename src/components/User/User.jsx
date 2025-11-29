import { useLocation } from "react-router-dom";

export default function User() {
  const { state } = useLocation();
  const owner = state?.owner; 

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
          </article>
        </>
      ) : (
        <p>Профиль не найден</p>
      )}
    </div>
  );
}
