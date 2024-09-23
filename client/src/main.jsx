import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Budget from './components/Budget'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import History from './components/History'
import MainPage from './components/MainPage'
import ProtectedRoute from './components/ProtectedRoute'
import Goals from './components/Goals'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/budget' element={
        <ProtectedRoute>
          <Budget />
        </ProtectedRoute>} />
      <Route path='/profile' element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path='/history' element={
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      } />
      <Route path='/goals' element={
        <ProtectedRoute>
          <Goals />
        </ProtectedRoute>
      } />
    </Routes>
  </BrowserRouter>
)
