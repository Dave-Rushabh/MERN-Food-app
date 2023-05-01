import './App.css';
import AuthComponent from './components/AuthComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        {/* auth route */}
        <Route path="/auth" element={<AuthComponent />} />

        {/* any random route which does not exist */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* protected routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
