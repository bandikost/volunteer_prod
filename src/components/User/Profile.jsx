import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../ui/auth";

export default function Profile() {
  const user = getCurrentUser();
  

  if (!user) {
    return (
      <div>
        <p>Вы не авторизированы</p>
        <div className="grid gap-4 grid-cols-2 mt-10">
          <button><Link to={"/login"}>Авторизация</Link></button>
          <button><Link to={"/register"}>Регистрация</Link></button>
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
              <h2 className="mt-4">Ваши животные:</h2>
                <div className="flex flex-col justify-center items-center mt-4">
                  <button>Добавить животного</button>
                </div>
              </>    
            )}
  

     
    </section>
  );
}
