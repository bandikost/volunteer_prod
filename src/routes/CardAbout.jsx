import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAnimals } from "../store/animalsSlice";
import ButtonToAddCart from "../components/ui/ButtonToAddCart";
import { Link } from "react-router-dom";


export default function CardAbout() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { animals, loading, error } = useSelector(state => state.animals);


  useEffect(() => {
    if (animals.length === 0) { // Если массив пустой, то запрашиваем данные. Если в массиве нет данных, то длина будет равна 0
      dispatch(fetchAnimals());
    }
  }, [dispatch, animals.length]);

  // пока идёт загрузка
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const findAnimal = animals.find(a => a.id === Number(id)); // поиск не по item, а по number из-за params

  if (!findAnimal) return <p>Животное не найдено</p>; // Не забывать писать условие не выполнения, иначе ничего не будет отображаться

  return (
    <section className="p-6">
        <div className="grid grid-cols-2  gap-2 w-full">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-2">{findAnimal.name}</h1>
                <p>{findAnimal.descrip}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="mb-2">Осталось: {findAnimal.lefts}</p>
                <div className="flex items-center">
                    <ButtonToAddCart animal={findAnimal} >
                        Добавить
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
                  className="mt-2 text-sm text-blue-500"
                >
                  Владелец: {findAnimal.owner_name}
                </Link>

                      )}
            </div>    
        </div>   
    </section>
  );
}
