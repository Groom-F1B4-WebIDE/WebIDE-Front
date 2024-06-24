import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Containers from './pages/Containers';
import FileCompiler from './pages/FileCompiler';
import Mission from './pages/Mission';
import MissionList from './pages/MissionList';
import CodeCompiler from './pages/CodeCompiler';
import ResultByMission from './pages/ResultByMission';
import ResultByUser from './pages/ResultByUser';
import Board from './pages/Board';
import Save from './pages/Save';
import PostDetail from './pages/PostDetail';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);  // posts 상태 정의

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

   // 백엔드 서버 URL
   //const BASE_URL = 'http://43.203.243.249:8000';


  // 로컬 백엔드 서버 URL
  const BASE_URL = 'http://localhost:8080';

 

  // 새로운 게시글 저장하기
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

   // 게시글 목록 가져오기
  //  useEffect(() => {
  //   axios.get(`${BASE_URL}/board`)
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the posts!', error);
  //     });
  // }, []);

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
          <Route path="/files" element={<Containers />} />
          <Route path="/filecompiler" element={<FileCompiler />} />
          <Route path="/mission-list" element={<MissionList />} />
          <Route path="/mission/:id" element={<Mission />} />
          <Route path="/mission/:id/submissions" element={<ResultByMission />} />
          <Route path="/user/:memberEmail/submissions" element={<ResultByUser />} />
          <Route path="/board" element={<Board />} />
          <Route path="/save" element={<Save />} />
          <Route path="/board" element={<Board posts={posts} setPosts={setPosts} />} />
          <Route path="/post/:id" element={<Save posts={posts} />} />
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
