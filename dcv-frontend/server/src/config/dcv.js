"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// 환경 변수 로드
dotenv_1.default.config();
// DCV 설정
const dcvConfig = {
    // DCV API 엔드포인트
    apiEndpoint: process.env.DCV_API_ENDPOINT || 'ediworks-dcv-test-dev-gateway-607357a8c01317b7.elb.ap-northeast-2.amazonaws.com',
    // DCV 연결 게이트웨이
    connectionGateway: process.env.DCV_CONNECTION_GATEWAY || 'ediworks-dcv-test-dev-gateway-607357a8c01317b7.elb.ap-northeast-2.amazonaws.com',
    // DCV 세션 기본 설정
    sessionDefaults: {
        maxSessionDurationHours: 8,
        inactivityTimeoutMinutes: 30,
        defaultStorageGB: 10,
    },
    // 지원되는 인스턴스 타입 및 제한
    instanceTypes: {
        't3.medium': {
            vCPU: 2,
            memoryGB: 4,
            storageGB: 20,
            maxSessions: 10,
        },
        't3.large': {
            vCPU: 2,
            memoryGB: 8,
            storageGB: 40,
            maxSessions: 8,
        },
        't3.xlarge': {
            vCPU: 4,
            memoryGB: 16,
            storageGB: 80,
            maxSessions: 5,
        },
        'g4dn.xlarge': {
            vCPU: 4,
            memoryGB: 16,
            storageGB: 125,
            GPU: 'NVIDIA T4',
            maxSessions: 3,
        },
    },
};
exports.default = dcvConfig;
