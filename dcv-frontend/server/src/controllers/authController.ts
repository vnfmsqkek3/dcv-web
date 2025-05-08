import { Request, Response } from 'express';
import cognitoConfig from '../config/cognito';

/**
 * 사용자 로그인 처리
 */
export const login = async (req: Request, res: Response) => {
  try {
    // 이 예제에서는 Cognito 인증이 클라이언트 측에서 처리됩니다.
    // 실제 구현에서 필요한 경우 서버 측 로직을 추가할 수 있습니다.
    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
  }
};

/**
 * 사용자 가입 처리
 */
export const register = async (req: Request, res: Response) => {
  try {
    // 클라이언트 측에서 Cognito 회원가입을 처리하고 있습니다.
    res.status(200).json({ message: '사용자 등록 성공' });
  } catch (error) {
    console.error('사용자 등록 오류:', error);
    res.status(500).json({ message: '사용자 등록 중 오류가 발생했습니다.' });
  }
};

/**
 * 액세스 토큰 검증
 */
export const verifyAccessToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: '토큰이 제공되지 않았습니다.' });
    }
    
    // 실제 구현에서는 토큰 검증 로직이 들어갑니다.
    
    res.status(200).json({ valid: true });
  } catch (error) {
    console.error('토큰 검증 오류:', error);
    res.status(401).json({ 
      valid: false, 
      message: '유효하지 않은 토큰입니다.' 
    });
  }
};

/**
 * 현재 사용자 정보 가져오기
 */
export const getUserInfo = async (req: Request, res: Response) => {
  try {
    // 인증 미들웨어에서 추가한 사용자 정보
    const user = (req as any).user;
    
    if (!user) {
      return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
    }
    
    res.status(200).json({
      id: user.sub,
      username: user.username,
      email: user.email,
      // 추가 사용자 속성이 있으면 여기에 포함
    });
  } catch (error) {
    console.error('사용자 정보 조회 오류:', error);
    res.status(500).json({ message: '사용자 정보를 조회하는 중 오류가 발생했습니다.' });
  }
}; 