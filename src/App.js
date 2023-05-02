import React from 'react';
import ResidentsProvider from './context/residentsContext';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <ResidentsProvider>
      <Table />
    </ResidentsProvider>
  );
}

export default App;
