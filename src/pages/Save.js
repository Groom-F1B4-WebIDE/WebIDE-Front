import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Save.css';

function Save() {
  const [writer, setWriter] = useState('');
  const [pass, setPass] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('boardWriter', writer);
    formData.append('boardPass', pass);
    formData.append('boardTitle', title);
    formData.append('boardContents', contents);
    //formData.append('boardFile', file);

    try {
      const response = await axios.post('http://localhost:8080/board/', formData);
      console.log('Response:', response);
      navigate('/board');
    } catch (error) {
      console.error('There was an error saving the post!', error);
      console.error('Error response:', error.response);
    }
  };

  return (
    <div className="post-form-container">
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Writer:</label>
          <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Contents:</label>
          <textarea value={contents} onChange={(e) => setContents(e.target.value)} />
        </div>
        <div>
          <label>File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">글작성</button>
      </form>
    </div>
  );
}

export default Save;
