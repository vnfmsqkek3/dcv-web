# DCV 웹 포털

DCV 웹 포털은 NICE DCV를 이용한 원격 데스크톱 연결을 웹 기반 인터페이스로 제공하는 애플리케이션입니다. AWS Cognito를 통한 사용자 인증과 API Gateway, Lambda를 이용한 서버리스 아키텍처를 기반으로 합니다.

## 주요 기능

- AWS Cognito를 이용한 사용자 인증
- DCV 세션 생성, 시작, 중지, 삭제 관리
- 다양한 인스턴스 타입 및 OS 템플릿 지원
- 세션 상태 및 리소스 모니터링
- 웹 브라우저를 통한 원격 데스크톱 연결

## 기술 스택

- **프론트엔드**: React, TypeScript, AWS Amplify
- **백엔드**: Node.js, Express, AWS SDK
- **인증**: AWS Cognito
- **인프라**: AWS API Gateway, AWS Lambda, DCV Connection Gateway

## 프로젝트 구조

```
dcv-web/
├── dcv-frontend/            # 프론트엔드 애플리케이션
│   ├── client/              # React 클라이언트
│   │   ├── src/
│   │   │   ├── components/  # 재사용 가능한 컴포넌트
│   │   │   ├── pages/       # 페이지 컴포넌트
│   │   │   ├── services/    # API 서비스
│   │   │   ├── styles/      # CSS 스타일
│   │   │   └── utils/       # 유틸리티 함수
│   │   └── package.json
│   ├── server/              # Express 서버
│   │   ├── src/
│   │   │   ├── config/      # 설정 파일
│   │   │   ├── controllers/ # 컨트롤러
│   │   │   ├── middleware/  # 미들웨어
│   │   │   └── routes/      # API 라우트
│   │   └── package.json
│   └── package.json
└── dcv-backend/             # 백엔드 서비스
    ├── src/
    │   ├── config/          # 설정 파일
    │   ├── controllers/     # 컨트롤러
    │   ├── middleware/      # 미들웨어
    │   ├── routes/          # API 라우트
    │   ├── services/        # 서비스 로직
    │   └── utils/           # 유틸리티 함수
    └── package.json
```

## 시작하기

### 사전 요구사항

- Node.js 16.x 이상
- npm 8.x 이상
- AWS 계정 및 테라폼 인프라 배포 완료

### 설치

```bash
# 프로젝트 클론
git clone <repository-url>
cd dcv-web

# 프론트엔드 종속성 설치
cd dcv-frontend
npm run install:all

# 백엔드 종속성 설치
cd ../dcv-backend
npm install
```

### 환경 변수 설정

1. 프론트엔드 서버 환경 변수 (.env)
```
PORT=4000
NODE_ENV=development

# AWS Cognito 설정
AWS_REGION=ap-northeast-2
COGNITO_USER_POOL_ID=ap-northeast-2_U0a6n8eYE
COGNITO_APP_CLIENT_ID=7i11qlasgkrnnhm0q7c7u6d74p
COGNITO_IDENTITY_POOL_ID=ap-northeast-2:be53a762-d512-4d73-8d62-ad25a0e21cdc

# DCV 관련 설정
DCV_API_ENDPOINT=your-dcv-api-endpoint
DCV_CONNECTION_GATEWAY=your-dcv-connection-gateway-url
```

### 개발 모드 실행

```bash
# 프론트엔드 실행
cd dcv-frontend
npm start

# 백엔드 실행
cd ../dcv-backend
npm run dev
```

## 배포

EC2 인스턴스에 배포하는 방법:

1. 프로젝트 빌드
```bash
# 프론트엔드 빌드
cd dcv-frontend
npm run build

# 백엔드 빌드
cd ../dcv-backend
npm run build
```

2. 빌드된 파일을 EC2 인스턴스로 전송
3. EC2 인스턴스에서 서버 실행

## 라이선스

MIT

## 연락처

문의사항이 있으시면 [이메일 주소](mailto:your-email@example.com)로 연락주세요. 