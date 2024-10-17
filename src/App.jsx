
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authSlice, { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import {Container, Footer, Header} from './components'
function App() {
  const [loading,setLoading]=useState(true);
  const dispatch= useDispatch();

  useEffect(()=>{
    authService.getCurrentUser().
    then((userData)=>{
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
    <>
      <Header/>
      <Container>
        {loading ? (
          <div className='text-center'>Loading...</div>
        ):(
          <div className='text-center'>Welcome to Haven</div>
        )}
      </Container>
      <Footer/>
    </>
  )
}

export default App
