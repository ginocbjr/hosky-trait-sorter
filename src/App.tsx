import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import Hoskies from './hoskies/Hoskies';
import Listings from './jpg/Listings';
import PriceSweep from './jpg/Sweeper/PriceSweep';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:address" element={<Hoskies />} />
          <Route path="/listings/:size" element={<Listings />} />
          <Route path="/hosky-sweep" element={<PriceSweep />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
