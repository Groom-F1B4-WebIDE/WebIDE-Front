import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Mission from './pages/Mission';
import MissionList from './pages/MissionList';
import CodeCompiler from './pages/CodeCompiler';
import ResultByMission from './pages/ResultByMission';
import ResultByUser from './pages/ResultByUser';

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
          <Route path="/mission-list" element={<MissionList />} />
          <Route path="/mission/:id" element={<Mission />} />
          <Route path="/mission/:id/submissions" element={<ResultByMission />} />
          <Route path="/user/:memberEmail/submissions" element={<ResultByUser />} />
          <Route
            path="/main"
            exact
            element={<Main darkMode={darkMode} handleToggle={handleToggle} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
