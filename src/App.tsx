import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Home from './pages/Home';
import Login from './pages/Login';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
