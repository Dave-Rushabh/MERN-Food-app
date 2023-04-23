import './App.css';
import SignUp from './components/AuthComponent';
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
              <SignUp />
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
              <Homepage />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
