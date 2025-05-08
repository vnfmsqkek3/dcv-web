import express from 'express';
import { verifyToken } from '../middleware/auth';
import * as dcvController from '../controllers/dcvController';

const router = express.Router();

// 모든 라우트에 인증 적용
router.use(verifyToken);

// 세션 목록 가져오기
router.get('/', dcvController.getAllSessions);

// 세션 통계 가져오기
router.get('/stats', dcvController.getSessionStats);

// 세션 상세 정보 가져오기
router.get('/:sessionId', dcvController.getSessionById);

// 새 세션 생성
router.post('/', dcvController.createSession);

// 세션 시작
router.post('/:sessionId/start', dcvController.startSession);

// 세션 중지
router.post('/:sessionId/stop', dcvController.stopSession);

// 세션 삭제
router.delete('/:sessionId', dcvController.deleteSession);

// 세션 연결 토큰 가져오기
router.get('/:sessionId/token', dcvController.getConnectionToken);

export default router; 