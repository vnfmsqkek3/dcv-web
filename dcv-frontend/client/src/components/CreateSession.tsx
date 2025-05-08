import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DcvApiService, DcvTemplate, CreateSessionRequest } from '../services/api';

const CreateSession: React.FC = () => {
  const [templates, setTemplates] = useState<DcvTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // 템플릿 목록 가져오기
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await DcvApiService.getTemplates();
        setTemplates(data);
        setError(null);
      } catch (err) {
        console.error('템플릿 목록을 가져오는 중 오류 발생:', err);
        setError('템플릿 목록을 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // 템플릿 선택 처리
  const handleTemplateSelect = (name: string, version: string) => {
    setSelectedTemplate(name);
    setSelectedVersion(version);
  };

  // 세션 생성 요청 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTemplate || !selectedVersion) {
      setError('템플릿을 선택해주세요.');
      return;
    }

    try {
      setIsCreating(true);
      
      const request: CreateSessionRequest = {
        launchTemplateName: selectedTemplate,
        launchTemplateVersion: selectedVersion
      };

      await DcvApiService.createSession(request);
      
      // 세션 목록 페이지로 이동
      navigate('/sessions');
    } catch (err) {
      console.error('세션 생성 중 오류 발생:', err);
      setError('세션 생성 중 오류가 발생했습니다.');
      setIsCreating(false);
    }
  };

  return (
    <div className="create-session">
      <h2>새 세션 생성</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">템플릿 목록을 불러오는 중...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>세션 이름</label>
            <input 
              type="text" 
              placeholder="세션 이름을 입력하세요" 
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>템플릿 선택</label>
            {templates.length === 0 ? (
              <p>사용 가능한 템플릿이 없습니다.</p>
            ) : (
              <div className="template-grid">
                {templates.map((template) => (
                  <div 
                    key={`${template.name}-${template.version}`}
                    className={`template-card ${
                      selectedTemplate === template.name && selectedVersion === template.version 
                        ? 'selected' 
                        : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.name, template.version)}
                  >
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>
                    <span>{template.instanceType}</span>
                    <div className="template-os">{template.os}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/sessions')}
              disabled={isCreating}
            >
              취소
            </button>
            <button 
              type="submit" 
              disabled={isCreating || !selectedTemplate}
            >
              {isCreating ? '생성 중...' : '세션 생성'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateSession; 