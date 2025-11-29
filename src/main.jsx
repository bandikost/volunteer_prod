import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout.jsx'
import { store, persistor } from './store/store.js'
import CardAbout from './routes/CardAbout.jsx'
import Cart from './routes/Cart.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './components/User/Login.jsx'
import Register from './components/User/Register.jsx'
import Profile from './components/User/Profile.jsx'
import User from './components/User/User.jsx'


createRoot(document.getElementById('root')).render(
 <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
        <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="/" element={<App />} />
              <Route path="/card/:id" element={<CardAbout />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/profile" element={<Profile/>} />
               <Route path="/user/:id" element={<User/>} />
            </Route>
        </Routes>
    </PersistGate>     
  </Provider>
   <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
   </Routes>
  </BrowserRouter>
)
