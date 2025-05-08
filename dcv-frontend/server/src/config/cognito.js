"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// 환경 변수 로드
dotenv_1.default.config();
// Cognito 설정
const cognitoConfig = {
    region: process.env.AWS_REGION || 'ap-northeast-2',
    userPoolId: process.env.COGNITO_USER_POOL_ID || 'ap-northeast-2_U0a6n8eYE',
    appClientId: process.env.COGNITO_APP_CLIENT_ID || '7i11qlasgkrnnhm0q7c7u6d74p',
    identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID || 'ap-northeast-2:be53a762-d512-4d73-8d62-ad25a0e21cdc',
};
exports.default = cognitoConfig;
