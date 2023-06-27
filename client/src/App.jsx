
import './App.css'
import { Route,Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage';

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route exact path='/' element={<LoginPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
          <Route exact path='/home' element={<HomePage/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
