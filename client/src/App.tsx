import './App.css';
import AuthComponent from './components/AuthComponent';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <AuthComponent />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <AuthRoute>
              <AuthComponent />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
