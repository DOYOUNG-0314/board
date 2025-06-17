import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post('http://localhost:5001/login', values);
      message.success('로그인 성공!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', values.username);
      setUser(values.username);
      navigate('/');
    } catch (err) {
      const serverMessage = err?.response?.data?.message || '';

      switch (serverMessage) {
        case '유저가 존재하지 않습니다.':
          message.error('존재하지 않는 아이디입니다.');
          break;
        case '비밀번호가 틀렸습니다.':
          message.error('비밀번호가 틀렸습니다.');
          break;
        default:
          message.error('로그인 실패');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', marginTop: '100px' }}>
      <h2>로그인</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="아이디" name="username" rules={[{ required: true, message: '아이디를 입력하세요' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="비밀번호" name="password" rules={[{ required: true, message: '비밀번호를 입력하세요' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>로그인</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
