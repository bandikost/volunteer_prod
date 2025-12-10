import { useDispatch, useSelector } from "react-redux"
import { updateAnimal } from "../../../store/animalsSlice"
import { removeFromCart } from "../../../store/cartSlice"


export default function ButtonToRemoveCart({animal, 
  className="w-1 h-1 text-sm text-center flex items-center justify-center rounded"}) {
    const animals = useSelector(state => state.animals.animals)
    const current = animals.find(a => a.id === animal.id)
    const dispatch = useDispatch()

    const handleRemove = () => {
    if (!current) return

    // обновляем количество в базе
    dispatch(updateAnimal({ id: animal.id, lefts: current.lefts + 1 }))

    // удаляем из корзины по id
    dispatch(removeFromCart(animal.id))

  }

    return (
        <button className={className} onClick={handleRemove}> 
        -</button>
    )
}