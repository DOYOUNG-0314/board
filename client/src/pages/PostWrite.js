import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostWrite() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/posts', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('작성 성공!');
      navigate('/');
    } catch (err) {
      message.error('작성 실패');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', marginTop: '50px' }}>
      <h2>게시글 작성</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력하세요' }]}>
          <Input.TextArea rows={10} />
        </Form.Item>
        <Form.Item>
        <Button 
          type="primary" 
          shape="round" 
          size="large" 
          htmlType="submit" 
          block 
          style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
        >작성하기</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostWrite;
