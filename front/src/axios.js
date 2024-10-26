import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',  // 백엔드 서버 URL
  withCredentials: true,  // 쿠키와 인증 정보 전달 설정
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance;
