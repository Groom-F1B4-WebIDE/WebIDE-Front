import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Containers from './pages/Containers';
import FileCompiler from './pages/FileCompiler';
import Board from './pages/Board'; // 새로 만든 Board 컴포넌트 임포트
import Mission from './pages/Mission';
import MissionList from './pages/MissionList';
import CodeCompiler from './pages/CodeCompiler';
import ResultByMission from './pages/ResultByMission';
import ResultByUser from './pages/ResultByUser';
import Save from './pages/Save';
import PostDetail from './pages/PostDetail';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);  // posts 상태 정의

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  // 백엔드 서버 URL
   const BASE_URL = 'http://54.180.131.150:8000';


  // 로컬 백엔드 서버 URL
  // const BASE_URL = 'http://localhost:8080';

 

  // 새로운 게시글 저장하기
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
    ));
  };

  const updateHits = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, hits: post.hits + 1 } : post
    ));
  };
  
  return (
    <Router>
      {/* <div className={darkMode ? 'app dark-mode' : 'app'}> */}
        {/* app을 각자 사용하는 페이지로 보내서 div 씌우기  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/code" element={<CodeCompiler />} />
          <Route path="/board" element={<Board />} /> {/* 새 라우트 추가 */}
          <Route path="/files" element={<Containers />} />
          <Route path="/filecompiler" element={<FileCompiler />} />
          <Route path="/mission-list" element={<MissionList />} />
          <Route path="/mission/:id" element={<Mission />} />
          <Route path="/mission/:id/submissions" element={<ResultByMission />} />
          <Route path="/user/:memberEmail/submissions" element={<ResultByUser />} />
          <Route path="/save" element={<Save />} />
          <Route path="/board" element={<Board posts={posts} setPosts={setPosts} />} />
          <Route path="/post/:id" element={<PostDetail posts={posts} />} />
          <Route
            path="/main"
            exact
            element={<Main darkMode={darkMode} handleToggle={handleToggle} />}
          />
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
