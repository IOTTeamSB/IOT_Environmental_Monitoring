// React App
// Ana React bileşeni
import React from 'react';
import Dashboard from './components/Dashboard';
import Filter from './components/Filter';
import './index.css';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">IoT Çevresel İzleme Sistemi</h1>
      <Filter />
      <Dashboard />
    </div>
  );
}

export default App;