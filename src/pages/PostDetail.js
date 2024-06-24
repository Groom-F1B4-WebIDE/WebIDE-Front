import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/PostDetail.css';

function PostDetail({ posts = [], updateHits, addComment }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === parseInt(id));
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [hitUpdated, setHitUpdated] = useState(false);

  useEffect(() => {
    if (post && !hitUpdated) {
      updateHits(post.id);
      setHitUpdated(true);  // 조회수를 증가시킨 후 플래그를 true로 설정
    }
  }, [post, hitUpdated, updateHits]);

  useEffect(() => {
    if (post) {
      setComments(post.comments || []); // post.comments가 undefined일 경우 빈 배열로 초기화
    }
  }, [post]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: comments.length + 1,
      text: newComment,
      writer: 'Anonymous', // 예시로 고정된 작성자 이름
      date: new Date().toLocaleString()
    };
    addComment(post.id, comment);
    setComments([...comments, comment]);
    setNewComment('');
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-detail-container">
      <h1>게시물 상세</h1>
      <p><strong>ID:</strong> {post.id}</p>
      <p><strong>Title:</strong> {post.boardTitle}</p>
      <p><strong>Writer:</strong> {post.boardWriter}</p>
      <p><strong>Date:</strong> {post.boardCreatedTime}</p>
      <p><strong>Hits:</strong> {post.boardHits}</p>
      <p><strong>Contents:</strong> {post.contents}</p>
      {post.file && <p><strong>File:</strong> {post.file.name}</p>}
      <button onClick={() => navigate('/board')}>목록</button>
      <div className="comments-section">
        <h2>댓글</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.writer}</strong> ({comment.date})</p>
            <p>{comment.text}</p>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요"
          />
          <button type="submit">댓글 작성</button>
        </form>
      </div>
    </div>
  );
}

export default PostDetail;
