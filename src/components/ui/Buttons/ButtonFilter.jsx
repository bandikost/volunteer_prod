import { useState } from "react";


export default function ButtonFilter({animals, setAnimals }){
    const [activeSort, setActiveSort] = useState(null);

    const handleSort = (type) => {
    let sorted = [...animals];

    switch (type) {
      case "new":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setActiveSort(type);
    setAnimals(sorted); // обновляем массив в родителе
  };

  const btnStyle = (type) =>
    `px-4 py-2 rounded border ${
      activeSort === type ? "!bg-green-600 text-white" : ""
    }`;

     return (
    <div className="flex gap-4 mb-6 justify-center">
      <button onClick={() => handleSort("new")} className={btnStyle("new")}>
        По новизне
      </button>
      <button onClick={() => handleSort("name")} className={btnStyle("name")}>
        По имени
      </button>
    </div>
  );
}