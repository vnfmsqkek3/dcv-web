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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const aws_jwt_verify_1 = require("aws-jwt-verify");
const cognito_1 = __importDefault(require("../config/cognito"));
// Cognito JWT 검증기 설정
const jwtVerifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
    userPoolId: cognito_1.default.userPoolId,
    tokenUse: 'id',
    clientId: cognito_1.default.appClientId,
});
/**
 * JWT 토큰 검증 미들웨어
 */
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Authorization 헤더에서 토큰 추출
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: '인증 토큰이 제공되지 않았습니다.' });
        }
        const token = authHeader.split(' ')[1];
        // 토큰 검증
        const payload = yield jwtVerifier.verify(token);
        // 요청 객체에 사용자 정보 추가
        req.user = {
            sub: payload.sub,
            email: payload.email,
            username: payload.username || payload['cognito:username'],
            groups: payload['cognito:groups'],
        };
        next();
    }
    catch (error) {
        console.error('토큰 검증 오류:', error);
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
});
exports.verifyToken = verifyToken;
