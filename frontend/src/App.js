import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import TaskList from './pages/TaskList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
