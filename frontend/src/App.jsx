import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from './pages/HomePage';
import { useEffect, useState } from 'react';
import api from './api/axios';
import AuthPage from './pages/AuthPage';

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const getCurrentUser = async () => {
      try {
        const res = await api.get("/users/me");
        setCurrentUser(res.data)
      } catch (error) {
        setCurrentUser(null);
      } finally{
        setLoading(false);
      }
    };
    getCurrentUser();
  }, [])

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (

    <div className='h-mh-100 w-mh-100'>
      <Routes>
        <Route path='/' element={currentUser ? <Navigate to={"/feed"}/> : <AuthPage setCurrentUser={setCurrentUser}/>} />
        <Route path='/feed' element={currentUser ? <HomePage currentUser={currentUser} setCurrentUser={setCurrentUser}/> : <Navigate to={'/'}/>} />
      </Routes>
    </div>
  )
}

export default App
