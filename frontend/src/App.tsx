import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { Unknown } from './pages/Unknown';
import { SignUpPage } from './pages/SignUpPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="*" element={<Unknown />}/>
    </Routes> 
  )
}

export default App
