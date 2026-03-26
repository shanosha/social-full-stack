import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Navbar from './components/Navbar'
import { useUser } from './context/UserContext'
// import axios from 'axios'

function App() {

  // bring in the user info
  const { user } = useUser()

  return (
    <>
      <Navbar />

      {user ?
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
        :
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      }
    </>
  )
}

export default App
