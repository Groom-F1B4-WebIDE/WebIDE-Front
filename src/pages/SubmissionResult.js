import React from 'react';
import './styles/submission.css';

function SubmissionResult({ results }) {
  return (
    <div className="submission-result">
      <h2>제출 결과</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className={`test-case ${result.status}`}>
            <p>테스트 케이스 {index + 1}</p>
            <p>입력: {result.input}</p>
            <p>기대 출력: {result.expectedOutput}</p>
            <p>사용자 출력: {result.userOutput}</p>
            <p>결과: {result.status === 'correct' ? '통과' : '실패'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmissionResult;
