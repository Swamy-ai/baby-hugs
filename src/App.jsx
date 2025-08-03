import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;
