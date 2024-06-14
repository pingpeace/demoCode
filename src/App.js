import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import NextPage from './pages/NextPage/NextPage';

import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/next' element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;
