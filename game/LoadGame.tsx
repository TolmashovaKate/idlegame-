import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './Gme';
import Home from './Home';
import Loading from './Loading';
import Creeper from './Creeper';

export default function LoadGame() {

  
    return (
      <Router>
        <Main />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/creeper" element={<Creeper />} />
        </Routes>
      </Router>      
    );
}