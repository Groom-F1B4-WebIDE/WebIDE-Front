import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import CodeCompiler from './pages/CodeCompiler';
import Containers from './pages/Containers';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'app dark-mode' : 'app'}>
        <Routes>
          <Route path="/code" element={<CodeCompiler />} />
          <Route path="/files" element={<Containers />} />
          <Route
            path="/"
            exact
            element={<Main darkMode={darkMode} handleToggle={handleToggle} />}
          />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
