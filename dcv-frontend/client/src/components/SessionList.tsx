import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DcvApiService, DcvSession } from '../services/api';
import { DcvSessionService, DcvSessionStatus } from '../services/dcvSession';

const SessionList: React.FC = () => {
  const [sessions, setSessions] = useState<DcvSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 세션 목록 가져오기
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await DcvApiService.getSessions();
      setSessions(data);
      setError(null);
    } catch (err) {
      console.error('세션 목록을 가져오는 중 오류 발생:', err);
      setError('세션 목록을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // 세션 연결 처리
  const handleConnect = async (sessionId: string) => {
    try {
      // 연결 토큰 받아오기
      const connectionInfo = await DcvApiService.getConnectionInfo(sessionId);
      
      // DCV 세션 URL 생성 및 연결
      const connectionUrl = DcvSessionService.generateDcvConnectionUrl(
        sessionId, 
        connectionInfo.token
      );
      
      // 새 창에서 DCV 세션 열기
      window.open(connectionUrl, '_blank');
    } catch (err) {
      console.error('세션 연결 중 오류 발생:', err);
      setError('세션 연결 중 오류가 발생했습니다.');
    }
  };

  // 세션 시작 처리
  const handleStart = async (sessionId: string) => {
    try {
      await DcvApiService.startSession(sessionId);
      // 목록 갱신
      fetchSessions();
    } catch (err) {
      console.error('세션 시작 중 오류 발생:', err);
      setError('세션 시작 중 오류가 발생했습니다.');
    }
  };

  // 세션 중지 처리
  const handleStop = async (sessionId: string) => {
    try {
      await DcvApiService.stopSession(sessionId);
      // 목록 갱신
      fetchSessions();
    } catch (err) {
      console.error('세션 중지 중 오류 발생:', err);
      setError('세션 중지 중 오류가 발생했습니다.');
    }
  };

  // 세션 삭제 처리
  const handleDelete = async (sessionId: string) => {
    try {
      if (window.confirm('정말로 이 세션을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        await DcvApiService.deleteSession(sessionId);
        // 목록 갱신
        fetchSessions();
      }
    } catch (err) {
      console.error('세션 삭제 중 오류 발생:', err);
      setError('세션 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="session-list">
      <h2>세션 목록</h2>
      <button className="create-button" onClick={() => navigate('/sessions/create')}>
        새 세션 생성
      </button>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">세션 목록을 불러오는 중...</div>
      ) : sessions.length === 0 ? (
        <div className="no-sessions">
          <p>등록된 세션이 없습니다.</p>
          <p>새 세션을 생성하려면 위의 버튼을 클릭하세요.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>상태</th>
              <th>인스턴스 타입</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.sessionId}>
                <td>{session.sessionId}</td>
                <td>{DcvSessionService.getStatusText(session.status)}</td>
                <td>{session.launchTemplateName}</td>
                <td>
                  {DcvSessionService.canConnect(session.status) && (
                    <button onClick={() => handleConnect(session.sessionId)}>연결</button>
                  )}
                  {DcvSessionService.canStart(session.status) && (
                    <button onClick={() => handleStart(session.sessionId)}>시작</button>
                  )}
                  {DcvSessionService.canStop(session.status) && (
                    <button onClick={() => handleStop(session.sessionId)}>중지</button>
                  )}
                  {DcvSessionService.canDelete(session.status) && (
                    <button onClick={() => handleDelete(session.sessionId)}>삭제</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SessionList; 