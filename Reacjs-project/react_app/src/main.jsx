import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from '../src/redux/store/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Login from './page/Login/Login.jsx';
import Nav from './page/User/Navigation.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <Router>
    <Routes>
      <Route path='' element={<Login/>}/>
      <Route path='/home' element={<Nav/>}/>
    </Routes>
    <ToastContainer />
  </Router>
</Provider>
)
