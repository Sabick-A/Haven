
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import  { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import {Container, Footer, Header} from './components'
import { Outlet } from 'react-router-dom';
function App() {
  const [loading,setLoading]=useState(true);
  const dispatch= useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    }
  ).catch((err)=>console.log(err))
  .finally(()=>{
    setLoading(false);
  });
    
  },[]);

  return (
    <Container>
      <Header/>
      <>
        {loading ? (
          <div className='text-center'>Loading...</div>
        ):(
          <div className='flex-grow'><Outlet/></div>
        )}
      </>
      <Footer/>
    </Container>
  )
}

export default App
