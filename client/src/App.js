import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PostWrite from './pages/PostWrite';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';

const { Header, Content, Footer } = Layout;

function App() {
  const [user, setUser] = useState(null);

  // 로그인 상태 확인 (토큰 읽어오기)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/">게시판</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/write">글쓰기</Link></Menu.Item>
            {!user && (
              <>
                <Menu.Item key="3"><Link to="/login">로그인</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/register">회원가입</Link></Menu.Item>
              </>
            )}
            {user && (
              <>
                <Menu.Item key="5">{user}님</Menu.Item>
                <Menu.Item key="6"><Button type="link" onClick={handleLogout} style={{ color: 'white' }}>로그아웃</Button></Menu.Item>
              </>
            )}
          </Menu>
        </Header>

        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/write" element={<PostWrite />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/edit/:id" element={<PostEdit />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>게시판 ©2025</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
