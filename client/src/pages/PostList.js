import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', marginTop: '50px' }}>
      <h2>게시판</h2>
      {posts.map(post => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <Card 
            title={post.title} 
            extra={`작성자: ${post.User.username}`}  // ✅ 작성자 표시
            style={{ marginBottom: '20px' }}
          >
            <p>{post.content.substring(0, 100)}...</p>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
