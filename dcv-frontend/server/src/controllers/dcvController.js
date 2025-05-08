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
exports.getConnectionToken = exports.deleteSession = exports.stopSession = exports.startSession = exports.createSession = exports.getSessionById = exports.getSessionStats = exports.getAllSessions = void 0;
const dcv_1 = __importDefault(require("../config/dcv"));
/**
 * 모든 DCV 세션 목록 가져오기
 */
const getAllSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 실제 구현에서는 DCV API 호출하여 세션 목록 가져오기
        // 임시 데이터 반환
        const sessions = [
            {
                id: 'sess-001',
                name: '개발 환경 1',
                status: 'RUNNING',
                instanceType: 't3.xlarge',
                createdAt: '2023-09-10T08:00:00Z',
                connectionType: 'linux'
            },
            {
                id: 'sess-002',
                name: '테스트 환경',
                status: 'STOPPED',
                instanceType: 't3.medium',
                createdAt: '2023-09-09T10:30:00Z',
                connectionType: 'windows'
            },
            {
                id: 'sess-003',
                name: '그래픽 작업용',
                status: 'RUNNING',
                instanceType: 'g4dn.xlarge',
                createdAt: '2023-09-08T14:15:00Z',
                connectionType: 'linux'
            }
        ];
        res.status(200).json(sessions);
    }
    catch (error) {
        console.error('세션 목록 조회 오류:', error);
        res.status(500).json({ message: '세션 목록을 조회하는 중 오류가 발생했습니다.' });
    }
});
exports.getAllSessions = getAllSessions;
/**
 * 세션 통계 정보 가져오기
 */
const getSessionStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 실제 구현에서는 DCV API 호출하여 세션 통계 가져오기
        // 임시 데이터 반환
        const stats = {
            active: 2,
            total: 3,
            resources: {
                cpu: {
                    total: 8,
                    used: 5
                },
                memory: {
                    total: 32,
                    used: 16
                }
            }
        };
        res.status(200).json(stats);
    }
    catch (error) {
        console.error('세션 통계 조회 오류:', error);
        res.status(500).json({ message: '세션 통계를 조회하는 중 오류가 발생했습니다.' });
    }
});
exports.getSessionStats = getSessionStats;
/**
 * 특정 세션 상세 정보 가져오기
 */
const getSessionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        // 실제 구현에서는 DCV API 호출하여 특정 세션 정보 가져오기
        // 임시 데이터 반환
        const session = {
            id: sessionId,
            name: '개발 환경 1',
            status: 'RUNNING',
            instanceType: 't3.xlarge',
            connectionType: 'linux',
            createdAt: '2023-09-10T08:00:00Z',
            ipAddress: '10.0.1.123',
            dnsName: 'dev-env-1.example.com',
            cpuUtilization: 35,
            memoryUtilization: 60,
            diskUtilization: 25
        };
        res.status(200).json(session);
    }
    catch (error) {
        console.error('세션 상세 정보 조회 오류:', error);
        res.status(500).json({ message: '세션 상세 정보를 조회하는 중 오류가 발생했습니다.' });
    }
});
exports.getSessionById = getSessionById;
/**
 * 새 세션 생성
 */
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, templateId } = req.body;
        if (!name || !templateId) {
            return res.status(400).json({ message: '세션 이름과 템플릿 ID가 필요합니다.' });
        }
        // 실제 구현에서는 DCV API 호출하여 새 세션 생성
        // 임시 데이터 반환
        const newSession = {
            id: `sess-${Date.now()}`,
            name,
            status: 'CREATING',
            instanceType: 't3.xlarge',
            connectionType: 'linux',
            createdAt: new Date().toISOString()
        };
        res.status(201).json(newSession);
    }
    catch (error) {
        console.error('세션 생성 오류:', error);
        res.status(500).json({ message: '세션 생성 중 오류가 발생했습니다.' });
    }
});
exports.createSession = createSession;
/**
 * 세션 시작
 */
const startSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        // 실제 구현에서는 DCV API 호출하여 세션 시작
        res.status(200).json({
            id: sessionId,
            status: 'RUNNING',
            message: '세션이 시작되었습니다.'
        });
    }
    catch (error) {
        console.error('세션 시작 오류:', error);
        res.status(500).json({ message: '세션 시작 중 오류가 발생했습니다.' });
    }
});
exports.startSession = startSession;
/**
 * 세션 중지
 */
const stopSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        // 실제 구현에서는 DCV API 호출하여 세션 중지
        res.status(200).json({
            id: sessionId,
            status: 'STOPPED',
            message: '세션이 중지되었습니다.'
        });
    }
    catch (error) {
        console.error('세션 중지 오류:', error);
        res.status(500).json({ message: '세션 중지 중 오류가 발생했습니다.' });
    }
});
exports.stopSession = stopSession;
/**
 * 세션 삭제
 */
const deleteSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        // 실제 구현에서는 DCV API 호출하여 세션 삭제
        res.status(200).json({
            message: '세션이 삭제되었습니다.'
        });
    }
    catch (error) {
        console.error('세션 삭제 오류:', error);
        res.status(500).json({ message: '세션 삭제 중 오류가 발생했습니다.' });
    }
});
exports.deleteSession = deleteSession;
/**
 * 세션 연결 토큰 가져오기
 */
const getConnectionToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId } = req.params;
        // 실제 구현에서는 DCV API 호출하여 연결 토큰 가져오기
        // 임시 데이터 반환
        const connectionInfo = {
            token: 'sample-dcv-token-123456',
            url: `${dcv_1.default.connectionGateway}/?sessionId=${sessionId}&token=sample-dcv-token-123456`,
            expiresIn: 3600
        };
        res.status(200).json(connectionInfo);
    }
    catch (error) {
        console.error('연결 토큰 가져오기 오류:', error);
        res.status(500).json({ message: '연결 토큰을 가져오는 중 오류가 발생했습니다.' });
    }
});
exports.getConnectionToken = getConnectionToken;
