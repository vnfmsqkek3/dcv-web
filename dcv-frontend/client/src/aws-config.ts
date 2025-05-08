import { Auth } from 'aws-amplify';

const awsConfig = {
  region: 'ap-northeast-2',
  
  Auth: {
    region: 'ap-northeast-2',
    userPoolId: 'ap-northeast-2_U0a6n8eYE',
    userPoolWebClientId: '7i11qlasgkrnnhm0q7c7u6d74p',
    identityPoolId: 'ap-northeast-2:be53a762-d512-4d73-8d62-ad25a0e21cdc',
  },

  API: {
    endpoints: [
      {
        name: 'dcvApi',
        endpoint: 'https://api.ediworks-dcv-test-dev.com/prod',
        custom_header: async () => {
          try {
            // 세션이 유효한 경우 토큰 가져오기
            const token = (await Auth.currentSession()).getIdToken().getJwtToken();
            return { Authorization: `Bearer ${token}` };
          } catch (error) {
            // 세션이 없는 경우 빈 헤더 반환
            console.log('인증 토큰을 가져올 수 없습니다:', error);
            return { Authorization: '' };
          }
        }
      }
    ]
  }
};

export default awsConfig; 