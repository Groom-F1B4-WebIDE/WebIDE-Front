import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MissionList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('http://localhost:8080/mission');
      if (!response.ok) {
        throw new Error('문제 목록 가져오기 실패');
      }
      const problemData = await response.json();
    //   console.log('문제 목록:', problemData);
      setProblems(problemData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="problem-list-container">
      <h1>문제 목록</h1>
      <ul>
        {problems.map(problem => (
          <li key={problem.id}>
            <Link to={`/mission/${problem.id}`}>{problem.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MissionList;
