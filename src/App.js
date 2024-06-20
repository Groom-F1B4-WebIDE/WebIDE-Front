import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import CodeCompiler from './pages/CodeCompiler';
import Board from './pages/Board'; // 새로 만든 Board 컴포넌트 임포트
import { Component } from 'react';

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
          <Route path="/board" element={<Board />} /> {/* 새 라우트 추가 */}
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
