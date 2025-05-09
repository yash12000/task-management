import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import TaskList from "./components/TaskList";
import Login from "./components/Login";

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
