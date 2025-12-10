import { Link } from "react-router-dom";
import profile from "../../public/Images/Icons/profile.svg"
import { useSelector } from "react-redux";
import { HeartOutline } from "../components/svg/Hearth";
import { useMemo } from "react";
import { getCurrentUser } from "../components/ui/Account/auth";

export default function Nav() {
    const favorite = useSelector(state => state.favorite.items)
    const totalFavorites = favorite.length;
    const user = useMemo(() => getCurrentUser(), [])




    return (
        <nav className="flex items-center justify-between w-full max-w-[990px] mx-auto px-4 text-lg">

                <ul className="flex space-x-4">
                    <li className="text-zinc-800 hover:text-zinc-300 duration-500">
                        <Link to="/" aria-label="Вернуться на главную страницу">Главная</Link>
                    </li>
                </ul> 

                <div className="flex items-center space-x-4">  
                    <div className="relative">

                    {user && (
                        <Link to="/favorite" aria-label="Переход в избранное">
                            <HeartOutline fill="none" />
                        </Link>
                    )}

                    {user && totalFavorites > 0 && (  
                        <div className="absolute -top-1 -right-2 w-5 h-5 bg-red-400 text-white text-xs flex items-center justify-center rounded-full">
                            {totalFavorites}
                        </div>
                    )}
                    </div>
                    
                    <Link to="/profile" aria-label="Переход в профиль">
                        <img loading="lazy" className="w-8 h-8 object-cover" src={profile}  alt="Профиль"/>        
                    </Link> 
                </div>
   
        </nav>
    )
}