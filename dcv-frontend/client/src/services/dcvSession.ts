// DCV 세션 연결 및 관리를 위한 서비스

// DCV 클라이언트 설정 관련 상수
const DCV_GATEWAY_HOST = 'ediworks-dcv-test-dev-gateway-607357a8c01317b7.elb.ap-northeast-2.amazonaws.com';
const DCV_GATEWAY_PORT = 8443;

// DCV 세션 상태 상수
export enum DcvSessionStatus {
  CREATING = 'CREATING',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  TERMINATING = 'TERMINATING',
  TERMINATED = 'TERMINATED',
  FAILED = 'FAILED'
}

// DCV 연결 URL 생성
export class DcvSessionService {
  // 브라우저에서 직접 DCV 세션에 연결하기 위한 URL 생성
  static generateDcvConnectionUrl(sessionId: string, token: string): string {
    return `https://${DCV_GATEWAY_HOST}:${DCV_GATEWAY_PORT}/?sessionId=${sessionId}&authToken=${token}`;
  }

  // API에서 받은 연결 URL 사용
  static useConnectionUrl(connectionUrl: string): string {
    return connectionUrl;
  }

  // DCV 세션 상태 한글화
  static getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      [DcvSessionStatus.CREATING]: '생성 중',
      [DcvSessionStatus.RUNNING]: '실행 중',
      [DcvSessionStatus.STOPPED]: '중지됨',
      [DcvSessionStatus.TERMINATING]: '종료 중',
      [DcvSessionStatus.TERMINATED]: '종료됨',
      [DcvSessionStatus.FAILED]: '오류'
    };
    
    return statusMap[status] || '알 수 없음';
  }

  // 세션 상태에 따라 가능한 작업 확인
  static canConnect(status: string): boolean {
    return status === DcvSessionStatus.RUNNING;
  }

  static canStart(status: string): boolean {
    return status === DcvSessionStatus.STOPPED;
  }

  static canStop(status: string): boolean {
    return status === DcvSessionStatus.RUNNING;
  }

  static canDelete(status: string): boolean {
    return status === DcvSessionStatus.STOPPED || 
           status === DcvSessionStatus.TERMINATED || 
           status === DcvSessionStatus.FAILED;
  }
} 