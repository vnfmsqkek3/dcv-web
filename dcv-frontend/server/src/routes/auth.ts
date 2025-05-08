import express from 'express';
import { verifyToken } from '../middleware/auth';
import * as authController from '../controllers/authController';

const router = express.Router();

// 사용자 로그인
router.post('/login', authController.login);

// 사용자 가입
router.post('/register', authController.register);

// 토큰 검증
router.post('/verify', authController.verifyAccessToken);

// 현재 사용자 정보 가져오기
router.get('/user', verifyToken, authController.getUserInfo);

export default router; 