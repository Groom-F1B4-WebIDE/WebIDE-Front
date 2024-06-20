import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/MissionList.css';

function MissionList() {
  const [problems, setProblems] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [missionResults, setMissionResults] = useState([]);
  const problemsPerWeek = 7;

  useEffect(() => {
    fetchProblems();
    fetchMissionResults();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('http://43.203.243.249:8080/mission');
      if (!response.ok) {
        throw new Error('문제 목록 가져오기 실패');
      }
      const problemData = await response.json();
      setProblems(problemData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchMissionResults = async () => {
    try {
      const response = await fetch('http://43.203.243.249:8080/mission-results');
      if (!response.ok) {
        throw new Error('결과 목록 가져오기 실패');
      }
      const resultsData = await response.json();
      setMissionResults(resultsData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleNextWeek = () => {
    if ((currentWeek * problemsPerWeek) < problems.length) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const currentProblems = problems.slice((currentWeek - 1) * problemsPerWeek, currentWeek * problemsPerWeek);

  const isProblemSolved = (problemId) => {
    return missionResults.some(result => result.problemId === problemId && result.correct);
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <h1>4주 데일리미션</h1>
        <div className="mission-intro">
          <h2>미션 개요</h2>
          <p>4주 동안 매일 문제를 해결해 보세요.</p>
        </div>
        <h2>{currentWeek}주차</h2>
        <div className="problem-list">
            {currentProblems.map((problem, index) => (
                <div key={problem.id} className="card">
                    <div className="card-details">
                        <p className="text-title">{index + 1} 일 문제 {problem.title} {isProblemSolved(problem.id) && <span className="check-mark">✔</span>}</p>
                        <p className="text-body">{problem.description}</p>
                    </div>
                    <Link to={`/mission/${problem.id}`} className="problem-link">
                        <button className="card-button">문제 풀기</button>
                    </Link>
                </div>
            ))}
        </div>
        <div className="pagination">
          <button onClick={handlePreviousWeek} disabled={currentWeek === 1} className="custom-button">
            <span>Back</span>
           </button>
           <button onClick={handleNextWeek} disabled={(currentWeek * problemsPerWeek) >= problems.length} className="custom-button">
            <span>Next</span>
           </button>

        </div>
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <img src="https://via.placeholder.com/100" alt="프로필" className="profile-image"/>
          <h3>이름</h3>
          <div className="activity-progress">
            <h4>활동율 예시</h4>
            <p>1주 차: 75%</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '75%' }}></div>
            </div>
            <p>2주 차: 50%</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionList;
