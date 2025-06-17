import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📌 게시판</h2>

      <Row gutter={[24, 24]}>
        {posts.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8}>
            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
              <Card
                title={post.title}
                bordered={false}
                hoverable
                style={{
                  height: '250px',
                  backgroundColor: '#fefefe',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  borderRadius: '15px',
                  transition: '0.3s',
                  overflow: 'hidden'
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <p style={{ color: '#333', fontSize: '14px', marginBottom: '20px' }}>
                  {post.content.substring(0, 80)}...
                </p>
                <p style={{ fontSize: '12px', color: '#888' }}>작성자: {post.User?.username}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PostList;
