import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get(`http://localhost:5001/posts/${id}`)
      .then(res => form.setFieldsValue(res.data))
      .catch(err => console.error(err));
  }, [id, form]);

  const onFinish = (values) => {
    axios.put(`http://localhost:5001/posts/${id}`, values, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  
      }
    })
    .then(() => {
      message.success('수정 성공');
      navigate(`/posts/${id}`);
    })
    .catch(() => {
      message.error('수정 실패');
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', marginTop: '50px' }}>
      <h2>게시글 수정</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력하세요' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력하세요' }]}>
          <Input.TextArea rows={15} style={{ width: '50vw' }} />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            shape="round" 
            size="large" 
            htmlType="submit" 
            block 
            style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
          >
            수정하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostEdit;
