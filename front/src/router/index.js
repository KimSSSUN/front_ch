import { createRouter, createWebHistory } from 'vue-router';
import IntroPage from '@/views/normal/IntroPage.vue';

import MainPage from '@/views/normal/MainPage.vue';
import RentPage from '@/views/normal/RentPage.vue';
import ProfilePage from '@/views/normal/ProfilePage.vue';
import CommunityPage from '@/views/normal/CommunityPage.vue';
import BoardCreatePage from '@/views/normal/BoardCreatePage.vue';
import RentCheckPage from '@/views/normal/RentCheckPage.vue';
import NotFoundPage from '@/views/normal/NotFoundPage.vue';

// 새로운 보호자 모드, 관리자 모드 페이지 임포트
import GuardianMap from '@/views/guardian/GuardianMap.vue';
import GuardianProfilePage from '@/views/guardian/GuardianProfilePage.vue';
import AdminRentalPage from '@/views/admin/AdminRentalPage.vue';
import AdminWheelchairPage from '@/views/admin/AdminWheelchairPage.vue';


// 공통 로그인 회원가입
import LoginPage from '@/views/user/LoginPage.vue';
import SignupPage from '@/views/user/SignupPage.vue';

// 라우트 설정
const routes = [
  { path: '/', component: IntroPage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/normal', component: MainPage },
  { path: '/rent', component: RentPage },
  { path: '/rent/check', component: RentCheckPage },
  { path: '/profile', component: ProfilePage },
  { path: '/community', component: CommunityPage },
  { path: '/board/create', component: BoardCreatePage },

  // 보호자 모드 페이지 추가
  { path: '/guardian/map', component: GuardianMap },  // 보호자 지도 페이지
  { path: '/guardian/profile', component: GuardianProfilePage },  // 보호자 프로필 페이지

  // 관리자 모드 페이지 추가
  { path: '/admin/rental', component: AdminRentalPage },  // 대여 관리 페이지
  { path: '/admin/wheelchair', component: AdminWheelchairPage },  // 휠체어 현황 페이지

  // 404 Not Found 페이지 라우팅
  { path: '/:catchAll(.*)', component: NotFoundPage }  // 404 페이지 라우트 설정
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우트 보호 로직 추가
router.beforeEach((to, from, next) => {
  const storedRole = localStorage.getItem('role'); // 'role'에서 가져옵니다.

  // 로그인 및 회원가입 페이지가 아닌 경우에 로그인 페이지로 리다이렉트
  if (!storedRole && to.path !== '/login' && to.path !== '/signup') {
    return next('/login');
  }

  // 각 경로에 대한 역할 확인
  if (to.path.startsWith('/admin') && storedRole !== 'ADMIN') { // 'ADMIN'으로 비교
    return next('/login');
  }

  if (to.path.startsWith('/guardian') && storedRole !== 'GUARDIAN') { // 'GUARDIAN'으로 비교
    return next('/login');
  }

  if (to.path.startsWith('/normal') && storedRole !== 'NORMAL') { // 'NORMAL'로 비교
    return next('/login');
  }

  next(); // 조건을 통과하면 다음으로 진행
});

export default router;
