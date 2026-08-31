import { Routes, Route } from 'react-router';
import { LoginPage } from './pages/auth/LoginPage';
import { Unknown } from './pages/Unknown';
import { SignUpPage } from './pages/auth/SignUpPage';
import { Terms } from './pages/Terms';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      < Route path="/login" element={< LoginPage />} />
      < Route path="/signup" element={< SignUpPage />} />
      < Route path="/terms" element={< Terms />} />
      < Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      < Route path="*" element={< Unknown />} />
    </Routes >
  )
}

export default App
