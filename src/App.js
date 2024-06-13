import React, { useState } from 'react';
import './App.css';
import Main from './pages/Main';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'app dark-mode' : 'app'}>
      <Main darkMode={darkMode} handleToggle={handleToggle} />
    </div>
  );
}

export default App;