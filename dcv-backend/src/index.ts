import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 테스트용 세션 데이터
const testSessions = [
  {
    sessionId: 'dev-session-1',
    userId: 'admin',
    instanceId: 'i-12345678901234567',
    status: 'RUNNING',
    launchTemplateVersion: '1',
    launchTemplateName: 't3.xlarge',
    ami: 'ami-123456789'
  },
  {
    sessionId: 'test-session-2',
    userId: 'admin',
    instanceId: 'i-98765432109876543',
    status: 'STOPPED',
    launchTemplateVersion: '1',
    launchTemplateName: 't3.medium',
    ami: 'ami-987654321'
  },
  {
    sessionId: 'graphics-session',
    userId: 'admin',
    instanceId: 'i-45678901234567890',
    status: 'RUNNING',
    launchTemplateVersion: '2',
    launchTemplateName: 'g4dn.xlarge',
    ami: 'ami-456789012'
  }
];

// 테스트용 템플릿 데이터
const testTemplates = [
  {
    name: 'Linux Basic',
    version: '1',
    description: '일반적인 개발 작업에 적합한 Linux 기본 환경',
    os: 'Linux',
    instanceType: 't3.medium'
  },
  {
    name: 'Windows Basic',
    version: '1',
    description: '일반적인 작업에 적합한 Windows 기본 환경',
    os: 'Windows',
    instanceType: 't3.large'
  },
  {
    name: 'Graphics Workstation',
    version: '2',
    description: '그래픽 집약적인 작업을 위한 GPU 지원 환경',
    os: 'Linux',
    instanceType: 'g4dn.xlarge'
  }
];

// API 라우트
// 세션 목록 가져오기
app.get('/api/sessions', (req, res) => {
  res.json({ sessions: testSessions });
});

// 세션 통계 가져오기
app.get('/api/sessions/stats', (req, res) => {
  const activeCount = testSessions.filter(s => s.status === 'RUNNING').length;
  
  res.json({
    active: activeCount,
    total: testSessions.length,
    resources: {
      cpu: {
        total: 100,
        used: 35
      },
      memory: {
        total: 100,
        used: 40
      }
    }
  });
});

// 세션 생성하기
app.put('/api/sessions', (req, res) => {
  const { launchTemplateName, launchTemplateVersion } = req.body;
  
  const newSession = {
    sessionId: `new-session-${Date.now()}`,
    userId: 'admin',
    instanceId: `i-${Math.random().toString(36).substring(2, 15)}`,
    status: 'CREATING',
    launchTemplateName,
    launchTemplateVersion,
    ami: 'ami-default'
  };
  
  testSessions.push(newSession);
  
  setTimeout(() => {
    const index = testSessions.findIndex(s => s.sessionId === newSession.sessionId);
    if (index !== -1) {
      testSessions[index].status = 'RUNNING';
    }
  }, 5000);
  
  res.status(201).json(newSession);
});

// 세션 삭제하기
app.delete('/api/sessions', (req, res) => {
  const { id } = req.query;
  
  const index = testSessions.findIndex(s => s.sessionId === id);
  
  if (index !== -1) {
    testSessions.splice(index, 1);
    res.json({ message: '세션이 삭제되었습니다.' });
  } else {
    res.status(404).json({ message: '세션을 찾을 수 없습니다.' });
  }
});

// 세션 시작하기
app.post('/api/sessions/:sessionId/start', (req, res) => {
  const { sessionId } = req.params;
  
  const index = testSessions.findIndex(s => s.sessionId === sessionId);
  
  if (index !== -1) {
    testSessions[index].status = 'RUNNING';
    res.json({ message: '세션이 시작되었습니다.' });
  } else {
    res.status(404).json({ message: '세션을 찾을 수 없습니다.' });
  }
});

// 세션 중지하기
app.post('/api/sessions/:sessionId/stop', (req, res) => {
  const { sessionId } = req.params;
  
  const index = testSessions.findIndex(s => s.sessionId === sessionId);
  
  if (index !== -1) {
    testSessions[index].status = 'STOPPED';
    res.json({ message: '세션이 중지되었습니다.' });
  } else {
    res.status(404).json({ message: '세션을 찾을 수 없습니다.' });
  }
});

// 연결 정보 가져오기
app.get('/api/sessions/:sessionId/connection', (req, res) => {
  const { sessionId } = req.params;
  
  const session = testSessions.find(s => s.sessionId === sessionId);
  
  if (session) {
    res.json({ 
      token: `mock-token-${Math.random().toString(36).substring(2, 15)}`,
      url: `https://example.com/dcv?sessionId=${sessionId}`,
      expiresIn: 3600
    });
  } else {
    res.status(404).json({ message: '세션을 찾을 수 없습니다.' });
  }
});

// 템플릿 목록 가져오기
app.get('/api/templates', (req, res) => {
  res.json({ templates: testTemplates });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`백엔드 서버가 http://localhost:${PORT}에서 실행 중입니다.`);
}); 