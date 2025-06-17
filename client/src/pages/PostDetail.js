import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const currentUser = localStorage.getItem('username');  // ✅ 현재 로그인한 사용자 이름 불러오기

  useEffect(() => {
    axios.get(`http://localhost:5001/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5001/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        message.success('삭제 성공');
        navigate('/');
      })
      .catch(err => {
        message.error(err.response?.data?.message || '삭제 실패');
      });
  };

  if (!post) return <div>로딩중...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', marginTop: '50px' }}>
      <Card title={post.title} extra={`작성자: ${post.User.username}`}>
        <p>{post.content}</p>
      </Card>

      {/* 🔥 글쓴이일 때만 수정/삭제 버튼 노출 */}
      {currentUser === post.User.username && (
        <>
          <Button style={{ marginRight: '10px' }} onClick={() => navigate(`/edit/${id}`)}>
            수정
          </Button>
          <Button danger style={{ marginRight: '10px' }} onClick={handleDelete}>
            삭제
          </Button>
        </>
      )}

      <Button style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
        목록으로 돌아가기
      </Button>
    </div>
  );
}

export default PostDetail;
