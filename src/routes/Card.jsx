import { useAnimals } from "../hooks/useAnimals";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../components/ui/Account/auth";
import ButtonFilter from "../components/ui/Buttons/ButtonFilter";
import { useEffect, useLayoutEffect, useState } from "react";
import FinderAnimal from "../components/ui/Inpunts/FinderAnimal";
import ButtonToAddCart from "../components/ui/Buttons/ButtonToAddCart";
import CardSkeleton from "./components/Skeletons/CardSkeleton";

export default function Card() {
  const { animals: fetchedAnimals, loading, error } = useAnimals(true);
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customLoading, setCustomLoading] = useState(false)
  const user = getCurrentUser();

   useLayoutEffect(() => {
    document.title = `Главная | Animals`
   })

  useEffect(() => {
    setAnimals(fetchedAnimals);
  }, [fetchedAnimals]);

  if (loading) return <p className="w-full max-w-[990px] mx-auto px-4">Загрузка...</p>;
  if (error) return <p className="w-full max-w-[990px] mx-auto px-4">Ошибка: {error}</p>;

 
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

  const filtredAnimals = animals
    .filter(a => a.lefts > 0)
    .filter(a => a.name.toLowerCase().startsWith(searchTerm.toLowerCase()))

    return (

    <section className="flex flex-col mt-10 justify-center items-center">
      <div className="flex flex-col items-center mb-10">
        <ButtonFilter animals={animals} setAnimals={setAnimals} />
        <FinderAnimal setCustomLoading={setCustomLoading} setSearchTerm={setSearchTerm} />
      </div>

      {customLoading && <CardSkeleton />}

  {!customLoading && filtredAnimals.length > 0 && (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 justify-center">
      {filtredAnimals.map(a => (
        <div key={a.id} className="flex flex-col w-72 h-auto rounded-xl ">
          <Link className="w-full" to={`/card/${a.id}`} aria-label="Перейти к описанию товара">
            {a.image_url && <img className="w-full h-72 object-cover rounded-xl" src={a.image_url} alt={a.name} />}
          </Link>
          <div className="flex justify-between items-center mt-2 px-2">
            <h1 className="text-xl">{a.name}</h1> 
            <ButtonToAddCart animal={a} />   
          </div>
          <article className="h-full px-2 mt-2 opacity-80 font-normal text-sm">
            {a.descrip.length > 28 ? a.descrip.slice(0, 28) + "..." : a.descrip}
          </article>
        </div>
      ))}
    </div>
  )}


  {!customLoading && filtredAnimals.length === 0 && (
    <div className="flex flex-col items-center justify-center">
      Ничего не найдено по запросу: {searchTerm}
      <button className="!p-1 !px-3 mt-2" 
      onClick={() => setSearchTerm("")}>
        Вернуться к списку
      </button>
    </div>
  )}


</section>

    )
}