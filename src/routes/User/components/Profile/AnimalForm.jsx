import axios from "axios";

export default function AnimalForm({ newAnimal, setNewAnimal, image, setImage, user, animals, setAnimals, setShowForm, editAnimal }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const resUpload = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = resUpload.data.url;
      }

      if (editAnimal) {
        await axios.put(`http://localhost:5000/animals/${editAnimal.id}`, {
          ...newAnimal,
          image_url: imageUrl
        });
        setAnimals(animals.map(a => a.id === editAnimal.id ? { ...a, ...newAnimal, image_url: imageUrl } : a));
      } else {
        const res = await axios.post("http://localhost:5000/animals/add", {
          ...newAnimal,
          owner_name: user.first_name,
          owner_rights: user.rights,
          owner_descrip: user.descrip || "",
          owner_id: user.id,
          image_url: imageUrl
        });
        setAnimals([...animals, { id: res.data.id, ...newAnimal, image_url: imageUrl }]);
      }
      setNewAnimal({ type: "", name: "", breed: "", descrip: "", lefts: 0 });
      setImage(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="mt-4 flex flex-col gap-2 w-80" onSubmit={handleSubmit}>
      <input type="text" placeholder="Тип животного" value={newAnimal.type} onChange={e => setNewAnimal({ ...newAnimal, type: e.target.value })} required />
      <input type="text" placeholder="Порода" value={newAnimal.breed || ""} onChange={e => setNewAnimal({ ...newAnimal, breed: e.target.value })} />
      <input type="text" placeholder="Имя животного" value={newAnimal.name} onChange={e => setNewAnimal({ ...newAnimal, name: e.target.value })} required />
      <textarea placeholder="Описание" value={newAnimal.descrip} onChange={e => setNewAnimal({ ...newAnimal, descrip: e.target.value })} />
      <input type="text" placeholder="Остаток" value={newAnimal.lefts || ""} onChange={e => setNewAnimal({ ...newAnimal, lefts: e.target.value })} />
      
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />

      <button type="submit" className="bg-green-500 text-white py-2 rounded mt-2">
        {editAnimal ? "Изменить" : "Добавить"}
      </button>
    </form>
  );
}
