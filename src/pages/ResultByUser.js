import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/Results.css';

function ResultByUser() {
  const { memberEmail } = useParams();
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    fetchUserResults();
  }, [memberEmail]);

  const fetchUserResults = async () => {
    try {
      const response = await fetch(`http://54.180.131.150:8080/mission/user/${memberEmail}/submissions`);
      if (!response.ok) {
        throw new Error('제출 결과 가져오기 실패');
      }
      const data = await response.json();
      setUserResults(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="results-container">
      <h1>사용자 제출 결과</h1>
      <ul>
        {userResults.map(result => (
          <li key={result.id} className="result-item">
            <p>문제 ID: {result.problemId}</p>
            <p>결과: {result.result}</p>
            <p>제출 시간: {new Date(result.resultTimeAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultByUser;
