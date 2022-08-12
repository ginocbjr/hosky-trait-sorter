import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import Hoskies from './hoskies/Hoskies';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:address" element={<Hoskies />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
