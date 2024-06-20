import React, { useState } from 'react';

function Board() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [id, setId] = useState(1); // 게시물 id 관리

  const handleInputChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newPostObject = {
      id: id,
      title: newPost,
      writer: 'Anonymous', // 예시로 고정된 작성자 이름
      date: new Date().toLocaleDateString(), // 현재 날짜로 설정
      hits: 0 // 조회수 초기값
    };
    setPosts([...posts, newPostObject]);
    setNewPost('');
    setId(id + 1); // 다음 게시물을 위해 id 증가
  };

  return (
    <div>
      <h1>게시판</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newPost}
          onChange={handleInputChange}
          placeholder="Write a new post"
        />
        <button type="submit">Post</button>
      </form>
      <table>
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
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.writer}</td>
              <td>{post.date}</td>
              <td>{post.hits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
