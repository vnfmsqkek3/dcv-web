import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsConfig from './aws-config';

// 컴포넌트 가져오기
import Dashboard from './components/Dashboard';
import SessionList from './components/SessionList';
import CreateSession from './components/CreateSession';

// Amplify 설정
Amplify.configure(awsConfig);

// 404 페이지 컴포넌트
const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <h2>페이지를 찾을 수 없습니다</h2>
    <p>요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
    <button onClick={() => window.location.href = '/'}>홈으로 돌아가기</button>
  </div>
);

// 레이아웃 컴포넌트
const Layout = () => {
  const { signOut } = useAuthenticator();
  
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">
          <h1>DCV 웹 포털</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/dashboard">대시보드</a></li>
            <li><a href="/sessions">세션 목록</a></li>
            <li><a href="/sessions/create">새 세션</a></li>
          </ul>
        </nav>
        <div className="user-info">
          <button onClick={signOut}>로그아웃</button>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2024 DCV 웹 포털. All rights reserved.</p>
      </footer>
    </div>
  );
};

// 인증이 필요한 라우트를 위한 컴포넌트
const RequireAuth = () => {
  const { authStatus } = useAuthenticator(context => [{
    authStatus: context.authStatus
  }]);

  if (authStatus !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// 로그인 페이지
const Login = () => {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator(context => [{
    authStatus: context.authStatus
  }]);
  
  useEffect(() => {
    // 이미 인증된 상태라면 대시보드로 리다이렉트
    if (authStatus === 'authenticated') {
      navigate('/dashboard', { replace: true });
    }
  }, [authStatus, navigate]);
  
  // 로딩 중이거나 이미 인증된 상태라면 로딩 인디케이터를 표시
  if (authStatus === 'configuring' || authStatus === 'authenticated') {
    return <div className="loading">로딩 중...</div>;
  }
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>DCV 웹 포털</h1>
        <p>계속하려면 로그인하세요</p>
        <Authenticator hideSignUp={true} />
      </div>
    </div>
  );
};

// 앱 컴포넌트
function App() {
  return (
    <Authenticator.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sessions" element={<SessionList />} />
              <Route path="/sessions/create" element={<CreateSession />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Authenticator.Provider>
  );
}

export default App; 