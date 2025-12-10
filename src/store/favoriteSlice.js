import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorite",

    initialState: {
        items: []
    },

    reducers: {
        addToFavorite(state, action){
          const item = action.payload;
          const existing = state.items.find(i => i.id === item.id);

          if (existing) state.items = state.items.filter(i => i.id !== item.id);
            // Если нет → добавляем
          else state.items.push(item);
          
        }
      
    }
})

export const {addToFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer