import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnimals } from "../store/animalsSlice";
import ButtonToAddCart from "../components/ui/ButtonToAddCart";
import { Link } from "react-router-dom";
import defaultImg from "../../public/Images/Animals/default.webp";

export default function CardAbout() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animals, loading, error } = useSelector(state => state.animals);
  const findAnimal = animals.find(a => a.id === Number(id));

 useLayoutEffect(() => {
  document.title = `Про животного ${findAnimal.name} | Animals`
 })

  useEffect(() => {
    if (animals.length === 0) { // Если массив пустой, то запрашиваем данные. Если в массиве нет данных, то длина будет равна 0
      dispatch(fetchAnimals());
    }
  }, [dispatch, animals.length]);

  // пока идёт загрузка
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  // Добавить прикольный отказ страницы

  if (!findAnimal) return <p>Такого животного не получилось найти. Возможно объявление уже не актуально или его никогда не было.</p>

  return (
    <section className="p-6 mb-10">
        <div className="grid grid-cols-2 gap-2 w-full ">
            <div className="flex flex-col justify-between">

                <div className="grid gap-2 grid-cols-2 items-center">
                  <h1 className="text-2xl font-bold mb-2">{findAnimal.name}</h1>
                  <p className="mb-2 text-lg">Осталось: <span className="text-blue-500 underline">{findAnimal.lefts}</span></p>
                </div>

                <img src={defaultImg} loading="lazy" alt={`Фотография животного ${findAnimal.name}`} />

                <div className="mt-6">
                  <p className="text-2xl">Характеристики: </p>
                  <p className="mt-4">Нужны ли они вообще?</p>
                </div>

                <div className="mt-10">
                  <p className="text-2xl">Описание: </p>
                  <p className="mt-4">{findAnimal.descrip}</p>
                </div>
                asd
            </div>

            <div className="flex flex-col items-end">
                
                <div className="flex items-center">
                    <ButtonToAddCart animal={findAnimal} >
                        Откликнуться
                     </ButtonToAddCart>
                </div>
                {findAnimal.owner_name && (
                <Link
                  to={`/user/${findAnimal.owner_id}`}
                  state={{ owner: { 
                      first_name: findAnimal.owner_name, 
                      rights: findAnimal.owner_rights || 0,
                      id: findAnimal.owner_id
                  } }}
                  className="mt-2 text-base underline text-blue-500"
                >
                  Владелец: {findAnimal.owner_name}
                </Link>

                      )}
            </div>    
        </div>   
    </section>
  );
}
