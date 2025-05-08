import { Request, Response, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import cognitoConfig from '../config/cognito';

// 인증 정보가 포함된 Request 인터페이스 확장
interface AuthRequest extends Request {
  user?: {
    sub: string;
    email: string;
    username: string;
    groups?: string[];
  };
}

// Cognito JWT 검증기 설정
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: cognitoConfig.userPoolId,
  tokenUse: 'id',
  clientId: cognitoConfig.appClientId,
});

/**
 * JWT 토큰 검증 미들웨어
 */
export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '인증 토큰이 제공되지 않았습니다.' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // 토큰 검증
    const payload = await jwtVerifier.verify(token);
    
    // 요청 객체에 사용자 정보 추가
    req.user = {
      sub: payload.sub,
      email: payload.email,
      username: payload.username || payload['cognito:username'],
      groups: payload['cognito:groups'],
    };
    
    next();
  } catch (error) {
    console.error('토큰 검증 오류:', error);
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
}; 