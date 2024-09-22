import './App.css'
import { Route,Routes } from 'react-router-dom'
import {SignUp} from './components/pages/SignupPage/SignUp'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/pages/Login';

function App() {
  return (
  <>
      <Routes>
      <Route index element={<h1>Kaja Home</h1>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      </Routes>
      <ToastContainer/>
  </>
  )
}

export default App
