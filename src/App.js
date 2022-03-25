import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useEffect, useState } from 'react';
import jwtdecode from 'jwt-decode';
import NotFound from './Components/NotFound/NotFound';

function App() {
  const [userData,setUserData]=useState('')
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      getUserData();
    }
  },[])

  function getUserData(){
    let deToken = jwtdecode(localStorage.getItem('userToken'));
    setUserData(deToken)
  }
  return (
    <>
      <Navbar />
<Routes>
  <Route element={<ProtectedRoute userData= {userData}/>}>
  <Route path='/' element={<Home/>}/>
  <Route path='/home' element={<Home userData= {userData}/>}/>
  </Route>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path='*' element={<NotFound/>}/>
</Routes>
    </>
  );
}

export default App;
