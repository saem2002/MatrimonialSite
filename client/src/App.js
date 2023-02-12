import React, { createContext, useContext, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login'

import ScrollToTop from './components/ScrollToTop'


import AccountProvider from './context/AccountProvider';

import { toast, ToastContainer } from 'react-toastify';
import Home from './components/Home/Home';
import UserDashboard from './components/userDashboard/UserDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Block from './components/Block';

function App() {
  const notify = (res) => toast(res, {
    position: toast.POSITION.TOP_CENTER
  });
  return (
    <>

      <Router>
        <div>
          <ToastContainer />
        </div>
        <AccountProvider >
          <ScrollToTop />
          
          <Routes >
            <Route path="/" element={<Home notify={notify}/>} />
            <Route path="/userDashboard" element={<UserDashboard notify={notify}/>} />
            <Route path="/login" element={<Login notify={notify} />} />
            <Route path="/AdminDashboard" element={<AdminDashboard notify={notify} />} />
            <Route path="/block" element={<Block notify={notify}/>} />
           
          </Routes>

        </AccountProvider>
      </Router>

    </>
  );
}

export default App;
