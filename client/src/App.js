import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PostList from './pages/PostList';
import PostWrite from './pages/PostWrite';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';

const { Header, Content, Footer } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null);
    window.location.href = '/';
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setUsername(localStorage.getItem('username'));
  }, []);

  return (
    <BrowserRouter>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link to="/">게시판</Link></Menu.Item>

            {!isLoggedIn && <>
              <Menu.Item key="2"><Link to="/login">로그인</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/register">회원가입</Link></Menu.Item>
            </>}

            {isLoggedIn && <>
              <Menu.Item key="4"><Link to="/write">글쓰기</Link></Menu.Item>
              <Menu.Item key="5" disabled>{username}님</Menu.Item>
              <Menu.Item key="6" onClick={handleLogout}>로그아웃</Menu.Item>
            </>}
          </Menu>
        </Header>

        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUsername} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/write" element={<PostWrite />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/edit/:id" element={<PostEdit />} />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>게시판 ©jungle</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
