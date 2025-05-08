import { API } from 'aws-amplify';

// API 엔드포인트 이름 (aws-config.ts에 정의됨)
const API_NAME = 'dcvApi';

// 세션 유형 정의
export interface DcvSession {
  sessionId: string;
  userId: string;
  instanceId: string;
  status: string;
  launchTemplateVersion: string;
  launchTemplateName: string;
  ami: string;
}

// 템플릿 유형 정의
export interface DcvTemplate {
  name: string;
  version: string;
  description: string;
  os: string;
  instanceType: string;
}

// 세션 생성 요청 유형
export interface CreateSessionRequest {
  launchTemplateName: string;
  launchTemplateVersion: string;
}

// 연결 정보 유형
export interface ConnectionInfo {
  connectionUrl: string;
  authToken: string;
}

// API 서비스 클래스
export class DcvApiService {
  // 모든 세션 가져오기
  static async getSessions(): Promise<DcvSession[]> {
    try {
      const response = await API.get(API_NAME, '/sessions', {});
      return response.sessions || [];
    } catch (error) {
      console.error('세션 목록 가져오기 오류:', error);
      throw error;
    }
  }

  // 세션 생성하기
  static async createSession(request: CreateSessionRequest): Promise<any> {
    try {
      const response = await API.put(API_NAME, '/sessions', {
        body: request
      });
      return response;
    } catch (error) {
      console.error('세션 생성 오류:', error);
      throw error;
    }
  }

  // 세션 삭제하기
  static async deleteSession(sessionId: string): Promise<any> {
    try {
      const response = await API.del(API_NAME, `/sessions?id=${sessionId}`, {});
      return response;
    } catch (error) {
      console.error('세션 삭제 오류:', error);
      throw error;
    }
  }

  // 템플릿 목록 가져오기
  static async getTemplates(): Promise<DcvTemplate[]> {
    try {
      const response = await API.get(API_NAME, '/templates', {});
      return response.templates || [];
    } catch (error) {
      console.error('템플릿 목록 가져오기 오류:', error);
      throw error;
    }
  }

  // DCV 연결 정보 가져오기
  static async getConnectionInfo(sessionId: string): Promise<ConnectionInfo> {
    try {
      const response = await API.get(API_NAME, `/sessions/${sessionId}/connection`, {});
      return response;
    } catch (error) {
      console.error('연결 정보 가져오기 오류:', error);
      throw error;
    }
  }

  // 세션 시작하기 (필요한 경우)
  static async startSession(sessionId: string): Promise<any> {
    try {
      const response = await API.post(API_NAME, `/sessions/${sessionId}/start`, {});
      return response;
    } catch (error) {
      console.error('세션 시작 오류:', error);
      throw error;
    }
  }

  // 세션 중지하기 (필요한 경우)
  static async stopSession(sessionId: string): Promise<any> {
    try {
      const response = await API.post(API_NAME, `/sessions/${sessionId}/stop`, {});
      return response;
    } catch (error) {
      console.error('세션 중지 오류:', error);
      throw error;
    }
  }
} 