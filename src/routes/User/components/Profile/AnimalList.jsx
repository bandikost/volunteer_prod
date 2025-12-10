import { Link } from "react-router-dom";

export default function AnimalList({ animals, onEdit }) {
  if (!animals.length) return <p className="mt-4">У вас еще нет выставленных животных.</p>;

  return (
    <ul className="mt-4 grid gap-2 grid-cols-2 items-center text-center justify-center">
      {animals.map((animal) => (
        <li key={animal.id} className="border p-2 mb-2 rounded">
          <p>Имя: {animal.name}</p>
          <p>Тип животного: {animal.type}</p>
          <div className="grid gap-2 grid-cols-2">
            <Link to={`/card/${animal.id}`}>
              <button className="mt-4 w-full">Перейти</button>
            </Link>
            <button
              className="mt-4"
              onClick={() => onEdit(animal)}
            >
              Редактировать
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
