"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// 라우터
const auth_1 = __importDefault(require("./routes/auth"));
const dcv_1 = __importDefault(require("./routes/dcv"));
// 환경 변수 로드
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// 미들웨어
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API 라우트
app.use('/api/auth', auth_1.default);
app.use('/api/sessions', dcv_1.default);
// 프로덕션 환경에서는 정적 파일 제공
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
    });
}
// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
