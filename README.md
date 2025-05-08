# DCV 웹 포털

DCV 웹 포털은 NICE DCV를 이용한 원격 데스크톱 연결을 웹 기반 인터페이스로 제공하는 애플리케이션입니다. AWS Cognito를 통한 사용자 인증과 API Gateway, Lambda, DynamoDB를 이용한 서버리스 아키텍처를 기반으로 합니다.

## 주요 기능

- AWS Cognito를 이용한 사용자 인증
- DCV 세션 생성, 시작, 중지, 삭제 관리
- 다양한 인스턴스 타입 및 OS 템플릿 지원
- 세션 상태 및 리소스 모니터링
- 웹 브라우저를 통한 원격 데스크톱 연결
- Step Functions를 통한 세션 생성 워크플로우 자동화

## 아키텍처

![DCV Web Portal Architecture](https://github.com/vnfmsqkek3/dcv-web/raw/main/architecture.png)

- **프론트엔드**: React SPA + Express 서버
- **백엔드**: API Gateway, Lambda, DynamoDB, Step Functions
- **인프라**: Terraform으로 관리되는 AWS 리소스
- **DCV 세션**: EC2 인스턴스 기반 DCV 세션

## 기술 스택

- **프론트엔드**: React, TypeScript, AWS Amplify
- **백엔드**: Node.js, Express, AWS SDK
- **인증**: AWS Cognito
- **인프라**: AWS API Gateway, Lambda, DynamoDB, Step Functions, DCV Connection Gateway

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

- Node.js 18.x 이상
- npm 9.x 이상
- AWS 계정 및 테라폼 인프라 배포 완료

### 설치

```bash
# 프로젝트 클론
git clone https://github.com/vnfmsqkek3/dcv-web.git
cd dcv-web

# 백엔드 종속성 설치
cd dcv-backend
npm install

# 프론트엔드 종속성 설치
cd ../dcv-frontend/server
npm install
cd ../client
npm install
```

### 환경 변수 설정

1. 백엔드 환경 변수 설정 (dcv-backend/.env)
```
PORT=4000
AWS_REGION=ap-northeast-2
PROJECT=ediworks-dcv
ENVIRONMENT=dev
```

2. 프론트엔드 서버 환경 변수 설정 (dcv-frontend/server/.env)
```
PORT=3001
AWS_REGION=ap-northeast-2
COGNITO_USER_POOL_ID=ap-northeast-2_U0a6n8eYE
COGNITO_APP_CLIENT_ID=7i11qlasgkrnnhm0q7c7u6d74p
```

3. 프론트엔드 클라이언트 환경 변수 설정 (dcv-frontend/client/.env)
```
REACT_APP_API_ENDPOINT=/api
REACT_APP_REGION=ap-northeast-2
REACT_APP_PROJECT=ediworks-dcv
REACT_APP_ENVIRONMENT=dev
```

### 개발 모드 실행

```bash
# 백엔드 실행
cd dcv-backend
npm run dev

# 프론트엔드 Express 서버 실행
cd ../dcv-frontend/server
npm run dev

# 프론트엔드 클라이언트 실행
cd ../client
npm start
```

## 배포

### EC2 인스턴스에 자동 배포

테라폼 모듈에 포함된 `user_data.sh.tpl` 스크립트는 EC2 인스턴스 시작 시 자동으로 다음 작업을 수행합니다:

1. 필요한 패키지(Node.js, git, httpd 등) 설치
2. 웹 서버(Apache) 설정
3. GitHub 저장소에서 코드 클론
4. 백엔드 및 프론트엔드 빌드 및 시작
5. PM2를 통한 프로세스 관리
6. 자동 배포 스크립트 설정

### 수동 배포 방법

```bash
# 프로젝트 빌드
cd dcv-backend
npm run build

cd ../dcv-frontend/server
npm run build

cd ../client
npm run build

# PM2로 서비스 실행
pm2 start dcv-backend/dist/index.js --name dcv-backend
pm2 start dcv-frontend/server/dist/index.js --name dcv-frontend-server
```

## 라이선스

MIT

## 연락처

문의사항이 있으시면 project@example.com으로 연락주세요. 