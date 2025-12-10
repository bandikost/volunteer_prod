import { useState } from "react";

export default function FinderAnimal({ setSearchTerm, setCustomLoading}) {
    const [inputValue, setInputValue] = useState(""); // временное состояние для инпута

    const handleSubmit = (e) => {
    e.preventDefault();

    setCustomLoading(true);
    setTimeout(() => {
        setSearchTerm(inputValue); // обновляем searchTerm только при сабмите
        setCustomLoading(false)
    }, 1500);
  };

   const handleClear = (e) => {
    e.preventDefault();
    setInputValue(""); 
    setSearchTerm(""); 
  };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <div className="relative z-0">
                <input 
                maxLength={40} 
                minLength={1} 
                className="border rounded-md p-1 pr-6" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите имя животного"/>
                {inputValue.length > 0 && (
                    <button onClick={handleClear} className="absolute text-zinc-400 !bg-transparent !p-0 !m-0 top-1 right-1">✕</button>
                )}  
            </div>
            
            
            <button type="submit" className="!py-1 !px-4 ml-2">Найти</button>
        </form>

    )
}