import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Board.css';

function Board() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    // 초기 하드코딩된 게시물 3개
    const initialPosts = [
      { id: 1, boardTitle: '안녕하세요!', boardWriter: '이선희', boardCreatedTime: '2024-06-24', boardHits: 10, contents: '첫 번째 게시글의 내용입니다.', comments: [] },
      { id: 2, boardTitle: '혹시 이 문제 푸신 분 계신가요?', boardWriter: '홍길동', boardCreatedTime: '2024-06-23', boardHits: 20, contents: '두 번째 게시글의 내용입니다.', comments: [] },
      { id: 3, boardTitle: '공부 잘되어 가시나요??', boardWriter: '김철수', boardCreatedTime: '2024-06-22', boardHits: 30, contents: '세 번째 게시글의 내용입니다.', comments: [] }
    ];
    setPosts(initialPosts);

    // 실제 API에서 게시물 가져오기
    const fetchPosts = async () => { 
      try {
        const response = await axios.get('http://54.180.131.150:8080/board/');
        const data = Array.isArray(response.data) ? response.data : []; // 배열인지 확인
        setPosts(prevPosts => [...prevPosts, ...data]);
        console.log('데이터 백엔드에서 받아옴');
      } catch (error) {  
        setError('Error fetching posts');
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updateHits = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, boardHits: post.boardHits + 1 } : post));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  };

  return (
    <div className="board-container">
      <h1>게시판</h1>
      <Link to="/save">글 작성</Link>
      <table className="board-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Writer</th>
            <th>Date</th>
            <th>Hits</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td><Link to={`/post/${post.id}`}>{post.id}</Link></td>
              <td><Link to={`/post/${post.id}`}>{post.boardTitle}</Link></td>
              <td><Link to={`/post/${post.id}`}>{post.boardWriter}</Link></td>
              <td><Link to={`/post/${post.id}`}>{post.boardCreatedTime}</Link></td>
              <td><Link to={`/post/${post.id}`}>{post.boardHits}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Board;
