import React, { useEffect, useState } from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PostList from './pages/PostList';
import PostWrite from './pages/PostWrite';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import bamboo from './assets/bamboo.png';

const { Header, Content, Footer } = Layout;

// 내부 라우터 관리 분리
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null);
    navigate('/');
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setUsername(localStorage.getItem('username'));
  }, []);

  const getSelectedKey = () => {
    if (location.pathname === '/') return '1';
    if (location.pathname.startsWith('/login')) return '2';
    if (location.pathname.startsWith('/register')) return '3';
    if (location.pathname.startsWith('/write')) return '4';
    return '';
  };

  return (
    <Layout className="layout" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Header style={{ backgroundColor: '#4CAF50' }}>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          selectedKeys={[getSelectedKey()]}
          style={{ backgroundColor: '#4CAF50' }}
        >
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

      <Content style={{ padding: '50px', maxWidth: '1000px', margin: '0 auto' }}>
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
  );
}

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#4CAF50' } }}>
      <div style={{ position: 'relative' }}>
      <img 
  src={bamboo}
  alt="bamboo"
  style={{
    position: 'fixed',
    top: 65,
    left: 950,
    width:  '70vh',
    height: '93vh',
    zIndex: 10,
    opacity: 0.8
  }}
/>

       

      
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </ConfigProvider>
  );
}

export default App;
