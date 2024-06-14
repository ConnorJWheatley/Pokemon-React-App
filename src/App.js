import './App.css';
import Navbar from './components/Navbar';
import PokemonDataPage from './pages/PokemonDataPage';
import React from 'react';

function App() {
  return (
    <div>
      <Navbar />
      <PokemonDataPage />
    </div>
  );
}

export default App;
