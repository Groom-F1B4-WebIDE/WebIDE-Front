import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">Logo</div>
      </header>
      <main className="home-main">
        <h1>Build Software Faster</h1>
        <p>
          개발자와 학생, 그리고 교육자들을 위한 웹 기반 통합 개발 환경(IDE)입니다. 브라우저에서 직접 코드 작성, 실행, 디버깅이 가능하며, 언제 어디서나 접근할 수 있는 서비스를 제공합니다.
        </p>
        <div className="home-buttons">
          <Link to="/signup" className="home-button">회원가입</Link>
          <Link to="/login" className="home-button">로그인</Link>
        </div>
      </main>
    </div>
  );
}

export default Home;