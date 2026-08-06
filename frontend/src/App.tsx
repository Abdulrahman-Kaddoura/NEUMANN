import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/auth/LoginPage';
import { Unknown } from './pages/Unknown';
import { SignUpPage } from './pages/auth/SignUpPage';
import { Terms } from './pages/Terms';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/terms" element={<Terms />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="*" element={<Unknown />}/>
    </Routes> 
  )
}

export default App
