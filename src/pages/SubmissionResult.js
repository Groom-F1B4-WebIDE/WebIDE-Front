import React from 'react';
import './styles/submission.css';

function SubmissionResult({ results }) {
  return (
    <div className="submission-result">
      <h2>제출 결과</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className={`test-case ${result.status}`}>
            <h3>테스트 케이스 {index + 1}</h3>
            <div className="result-detail">
              <p><strong>입력:</strong> {result.input}</p>
              <p><strong>기대 출력:</strong> {result.expectedOutput}</p>
              <p><strong>사용자 출력:</strong> {result.userOutput}</p>
              <p><strong>결과:</strong> {result.status === 'correct' ? '통과' : '실패'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmissionResult;
