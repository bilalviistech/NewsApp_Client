import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import Addmusic from './Components/AddNewsCat';
import AddNewsCat from './Components/AddNewsCat'
import AddEvents from './Components/AddEvents';
import css from './css/sb-admin-2.css';
import fontawesome from './vendor/fontawesome-free/css/all.min.css';
import LoginPage from './Components/Login';
import Addusers from './Components/Addusers';
import Home from './Pages/Home';
import store from './store';

const App = () => {
  const token = useSelector(state => state.user.token);
   console.log(token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path='/dashboard' element={token ? <Home /> : <Navigate to="/" />} />
        {/* <Route path='/addmusic' element={token ? <Addmusic /> : <Navigate to="/" />} /> */}
        <Route path='/addusers' element={token ? <Addusers /> : <Navigate to="/" />} />
        <Route path='/news-category' element={token ? <AddNewsCat /> : <Navigate to="/" />} />
        <Route path='/add-events' element={token ? <AddEvents /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
