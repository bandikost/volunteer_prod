import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import animalsReducer from "./animalsSlice";


import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "root", // ключ в localStorage, под которым будет храниться state
    storage, // использование localStorage
    whitelist: ["favorite", "animals"] // какие редбюсеры сохраняются
}

const rootReducer = combineReducers({ // объединяем несколько редьюсеров в один
    favorite: favoriteReducer,
    animals: animalsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer) // оборачиваем их в новый редбюсер, чтобы он сохранялся

export const store = configureStore({ // Создаём Redux store с уже "persisted" редьюсером
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store) // Создаем persitor, чтобы обернуть его в main.jsx на весь проект