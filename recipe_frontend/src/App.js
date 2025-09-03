import React from 'react';
import './styles/tokens.css';
import './App.css';
import { AppProvider } from './context/AppContext';
import AppRouter from './AppRouter';

/**
 * Root App which wires global providers and routes.
 */
function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
