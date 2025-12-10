import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import axios from "axios";

import ProfileHeader from "./components/Profile/ProfileHeader";
import UserResponses from "./components/Profile/UserResponses";
import AnimalList from "./components/Profile/AnimalList";
import AnimalForm from "./components/Profile/AnimalForm";

import { getCurrentUser } from "../../components/ui/Account/auth";

export default function Profile() {
  const user = useMemo(() => getCurrentUser(), []);
  const [animals, setAnimals] = useState([]);
  const [editAnimal, setEditAnimal] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState();
  const [newAnimal, setNewAnimal] = useState({ type: "", name: "", descrip: "" });

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/animals/user/${user.id}`)
      .then(res => setAnimals(res.data))
      .catch(console.error);
  }, [user]);


  useLayoutEffect(() => {
      document.title = `Профиль | Animals`
     })

  if (!user) {
    return (
      <div>
        <p>Вы не авторизированы</p>
        <div className="grid gap-4 grid-cols-2 mt-10">
          <Link to={"/login"}><button className="w-full">Авторизация</button></Link>
          <Link to={"/register"}><button className="w-full">Регистрация</button></Link>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full">
      <ProfileHeader user={user} />
      <UserResponses volunteer={user.volunteer} />
      {user.volunteer >= 1 && (
        <>
          <h2 className="mt-4">Список ваших животных:</h2>
          <AnimalList animals={animals} onEdit={(animal) => {
          setEditAnimal(animal);
          setNewAnimal({ ...animal, id: Number(animal.id) }); 
          setShowForm(true);
        }} />

            <div className="flex flex-col justify-center items-center mt-4">
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded"
    onClick={() => setShowForm(!showForm)}
    disabled={animals.length >= 10}
  >
    Добавить животного
  </button>

  {showForm && (
    <>
      <AnimalForm
        newAnimal={newAnimal}
        setNewAnimal={setNewAnimal}
        image={image}
        setImage={setImage}
        user={user}
        animals={animals}
        setAnimals={setAnimals}
        setShowForm={setShowForm}
        editAnimal={editAnimal}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        onClick={() => setShowForm(false)}
      >
        Отмена
      </button>
    </>
  )}
</div>

        </>
      )}
    </section>
  );
}
