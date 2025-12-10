import { logout } from "../../../../components/ui/Account/auth";

export default function ProfileHeader({ user }) {
  return (
    <>
      {user.rights > 0 && (
        <div className="mt-20 w-52 !p-0 text-center border border-green-700 rounded bg-green-600 z-10 shadow-3xl">
          <p className="text-sm">Подтвержденный профиль</p>
        </div>      
      )}
      <div className="flex items-center mt-4">
        <h1>Профиль пользователя: {user.first_name}</h1>
        <button className="!py-1 !px-4 ml-4" onClick={logout}>Выйти</button>
      </div>
    </>
  );
}
