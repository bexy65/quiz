import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomeComponent';
import Quiz from './components/QuizComponent';
import Results from './components/Results';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/*" element={<Quiz />} />
        <Route path="/results" element={<Results/>}/>
      </Routes>
    </Router>
  );
}

export default App;
