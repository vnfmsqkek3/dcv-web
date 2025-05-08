"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.verifyAccessToken = exports.register = exports.login = void 0;
/**
 * 사용자 로그인 처리
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 이 예제에서는 Cognito 인증이 클라이언트 측에서 처리됩니다.
        // 실제 구현에서 필요한 경우 서버 측 로직을 추가할 수 있습니다.
        res.status(200).json({ message: '로그인 성공' });
    }
    catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ message: '로그인 중 오류가 발생했습니다.' });
    }
});
exports.login = login;
/**
 * 사용자 가입 처리
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 클라이언트 측에서 Cognito 회원가입을 처리하고 있습니다.
        res.status(200).json({ message: '사용자 등록 성공' });
    }
    catch (error) {
        console.error('사용자 등록 오류:', error);
        res.status(500).json({ message: '사용자 등록 중 오류가 발생했습니다.' });
    }
});
exports.register = register;
/**
 * 액세스 토큰 검증
 */
const verifyAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: '토큰이 제공되지 않았습니다.' });
        }
        // 실제 구현에서는 토큰 검증 로직이 들어갑니다.
        res.status(200).json({ valid: true });
    }
    catch (error) {
        console.error('토큰 검증 오류:', error);
        res.status(401).json({
            valid: false,
            message: '유효하지 않은 토큰입니다.'
        });
    }
});
exports.verifyAccessToken = verifyAccessToken;
/**
 * 현재 사용자 정보 가져오기
 */
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 인증 미들웨어에서 추가한 사용자 정보
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
        }
        res.status(200).json({
            id: user.sub,
            username: user.username,
            email: user.email,
            // 추가 사용자 속성이 있으면 여기에 포함
        });
    }
    catch (error) {
        console.error('사용자 정보 조회 오류:', error);
        res.status(500).json({ message: '사용자 정보를 조회하는 중 오류가 발생했습니다.' });
    }
});
exports.getUserInfo = getUserInfo;
