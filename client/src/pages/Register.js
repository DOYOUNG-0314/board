import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5001/register', values);
      message.success('회원가입 성공!');
      navigate('/');  // 회원가입 성공시 게시판 메인으로 이동
    } catch (err) {
      message.error(err.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', marginTop: '100px' }}>
      <h2>회원가입</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="아이디" name="username" rules={[{ required: true, message: '아이디를 입력하세요' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력하세요' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>회원가입</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
