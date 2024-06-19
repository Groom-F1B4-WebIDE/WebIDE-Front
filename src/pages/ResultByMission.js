import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/Results.css';

function ResultByMission() {
  const { id } = useParams();
  const [missionResults, setMissionResults] = useState([]);

  useEffect(() => {
    fetchMissionResults();
  }, [id]);

  const fetchMissionResults = async () => {
    try {
      const response = await fetch(`http://localhost:8080/mission/${id}/submissions`);
      if (!response.ok) {
        throw new Error('제출 결과 가져오기 실패');
      }
      const data = await response.json();
      console.log('응답 데이터:', data);
      setMissionResults(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const parseResult = (result) => {
    try {
      // JSON 형식으로 변환
      const jsonString = result
        .replace(/([a-zA-Z0-9]+)=/g, '"$1":')
        .replace(/,}/g, '}')
        .replace(/,]/g, ']');
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('결과 파싱 에러:', e);
      return null;
    }
  };

  return (
    <div className="results-container">
      <h1>문제 제출 결과</h1>
      {missionResults.length === 0 ? (
        <p>제출 결과가 없습니다.</p>
      ) : (
        missionResults.map((result, index) => {
          const parsedResult = parseResult(result.result);
          return (
            <div key={index} className="submission-result">
              <h2>제출 {index + 1}</h2>
              <p>제출 시간: {new Date(result.resultTimeAt).toLocaleString()}</p>
              {parsedResult && parsedResult.results ? (
                <ul>
                  {parsedResult.results.map((testCase, idx) => (
                    <li key={idx} className={`test-case ${testCase.status}`}>
                      <p>테스트 케이스 {idx + 1}</p>
                      <p>입력: {testCase.input}</p>
                      <p>기대 출력: {testCase.expectedOutput}</p>
                      <p>사용자 출력: {testCase.userOutput}</p>
                      <p>결과: {testCase.status === 'correct' ? '통과' : '실패'}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>테스트 케이스 결과가 없습니다.</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default ResultByMission;
