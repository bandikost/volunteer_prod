import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store.js'

import Layout from './Layouts/Layout.jsx'
import CardAbout from './routes/CardAbout.jsx'
import App from './App.jsx'
import './index.css'
import Register from './routes/User/Register.jsx'
import Login from './routes/User/Login.jsx'
import User from './routes/User/User.jsx'
import Profile from './routes/User/Profile.jsx'
import Favorite from './routes/Favorite.jsx'


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
        <Routes>

            <Route path="/" element={<Layout />} >
              <Route path="/" element={<App />} />
              <Route path="/card/:id" element={<CardAbout />} />
               <Route path="/favorite" element={<Favorite />} />
               <Route path="/profile" element={<Profile/>} />
               <Route path="/user/:id" element={<User/>} />
            </Route>

            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
        
    </PersistGate>     
  </Provider> 
  </BrowserRouter>
)
