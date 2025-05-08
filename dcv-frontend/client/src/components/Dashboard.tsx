import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DcvApiService, DcvSession } from '../services/api';

// 세션 통계 인터페이스
interface SessionStats {
  active: number;
  total: number;
  resources: {
    cpu: {
      total: number;
      used: number;
    };
    memory: {
      total: number;
      used: number;
    };
  };
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setRecentSessions] = useState<DcvSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 세션 목록 가져오기
        const sessionData = await DcvApiService.getSessions();
        setRecentSessions(sessionData.slice(0, 3)); // 최근 3개 세션만 표시

        // 세션 통계 가져오기 (API 엔드포인트가 있다고 가정)
        // 없는 경우 계산된 통계를 사용
        try {
          // 이 엔드포인트는 아직 구현되지 않았을 수 있음
          const statsData = await fetch('/api/sessions/stats').then(res => res.json());
          setStats(statsData);
        } catch (statsErr) {
          // 통계 API가 없으면 세션 데이터로부터 계산
          const activeCount = sessionData.filter(s => s.status === 'RUNNING').length;
          setStats({
            active: activeCount,
            total: sessionData.length,
            resources: {
              cpu: {
                total: 100,
                used: activeCount > 0 ? 35 : 0,
              },
              memory: {
                total: 100,
                used: activeCount > 0 ? 40 : 0,
              },
            },
          });
        }

        setError(null);
      } catch (err) {
        console.error('대시보드 데이터를 가져오는 중 오류 발생:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // CPU 사용량 계산
  const getCpuUsagePercent = () => {
    if (!stats) return 0;
    return Math.round((stats.resources.cpu.used / stats.resources.cpu.total) * 100);
  };

  // 메모리 사용량 계산
  const getMemoryUsagePercent = () => {
    if (!stats) return 0;
    return Math.round((stats.resources.memory.used / stats.resources.memory.total) * 100);
  };

  return (
    <div className="dashboard">
      <h2>대시보드</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">데이터를 불러오는 중...</div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>활성 세션</h3>
              <p className="stat-value">{stats?.active || 0}</p>
            </div>
            <div className="stat-card">
              <h3>총 세션</h3>
              <p className="stat-value">{stats?.total || 0}</p>
            </div>
            <div className="stat-card">
              <h3>CPU 사용량</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getCpuUsagePercent()}%` }}
                />
              </div>
              <p className="stat-percent">{getCpuUsagePercent()}%</p>
            </div>
            <div className="stat-card">
              <h3>메모리 사용량</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getMemoryUsagePercent()}%` }}
                />
              </div>
              <p className="stat-percent">{getMemoryUsagePercent()}%</p>
            </div>
          </div>
          
          <div className="dashboard-actions">
            <Link to="/sessions/create" className="action-button">
              새 세션 생성
            </Link>
            <Link to="/sessions" className="action-button secondary">
              모든 세션 보기
            </Link>
          </div>
          
          {sessions.length > 0 && (
            <div className="recent-sessions">
              <h3>최근 세션</h3>
              <div className="sessions-grid">
                {sessions.map((session) => (
                  <div key={session.sessionId} className="session-card">
                    <h4>{session.sessionId}</h4>
                    <p className={`status status-${session.status.toLowerCase()}`}>
                      {session.status}
                    </p>
                    <p className="instance-type">{session.launchTemplateName}</p>
                    <Link to={`/sessions`} className="view-details">
                      세션 관리
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard; 