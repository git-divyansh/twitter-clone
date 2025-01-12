import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom"
import HomePage from './Components/HomePage/HomePage'
import Authentication from './Components/Authentication/Authentication'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';
import { RootState, useAppDispatch } from './Store/store';
import SpinLoader from './Components/Loaders/SpinLoader';

function App() {
  const {auth} = useSelector((state : RootState) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(jwt){
      dispatch(getUserProfile(jwt));
      navigate("/");
    }

  }, [auth.jwt]);
  
  return (
    <div className=''>
      <Routes>  
        <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />}></Route>
      </Routes>
      <SpinLoader open = {auth.loading}/>
    </div>
  )
}

export default App
