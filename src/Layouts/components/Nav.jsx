import { Link } from "react-router-dom";
import profile from "../../../public/Images/Icons/profile.svg"

export default function Nav() {
 
    return (
        <nav className="flex items-center justify-between w-full max-w-[1300px] mx-auto px-5 text-lg">

                <ul className="flex space-x-4">
                    <li className="text-zinc-800 hover:text-zinc-300 duration-500">
                        <Link to="/" aria-label="Вернуться на главную страницу">Главная</Link>
                    </li>
                </ul> 

                <div className="flex relative items-center space-x-2">
                    <Link to="/profile" aria-label="Переход в профиль">
                        <img loading="lazy" className="w-8 h-8 object-cover" src={profile}  alt="Профиль"/>        
                    </Link>
                </div>
   
        </nav>
    )
}