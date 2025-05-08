import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// 라우터
import authRouter from './routes/auth';
import dcvRouter from './routes/dcv';

// 환경 변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 라우트
app.use('/api/auth', authRouter);
app.use('/api/sessions', dcvRouter);

// 프로덕션 환경에서는 정적 파일 제공
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
}); 