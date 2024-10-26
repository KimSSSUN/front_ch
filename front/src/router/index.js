import { createRouter, createWebHashHistory } from 'vue-router';
import IntroPage from '@/views/normal/IntroPage.vue';

import MainPage from '@/views/normal/MainPage.vue';
import RentPage from '@/views/normal/RentPage.vue';
import ProfilePage from '@/views/normal/ProfilePage.vue';
import CommunityPage from '@/views/normal/CommunityPage.vue';
import RentCheckPage from '@/views/normal/RentCheckPage.vue';
import NotFoundPage from '@/views/normal/NotFoundPage.vue';
import PostDetail from '@/views/normal/PostDetailPage.vue';

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
  { path: '/community/:postId', name: 'PostDetail', component: PostDetail },

  // 보호자 모드 페이지 추가
  { path: '/guardian/map', component: GuardianMap },
  { path: '/guardian/profile', component: GuardianProfilePage },

  // 관리자 모드 페이지 추가
  { path: '/admin/rental', component: AdminRentalPage },
  { path: '/admin/wheelchair', component: AdminWheelchairPage },

  // 404 Not Found 페이지 라우팅
  { path: '/:catchAll(.*)', component: NotFoundPage }
];

const router = createRouter({
  history: createWebHashHistory(), // 'createWebHashHistory'로 변경하여 해시 모드로 설정
  routes,
});

// 라우트 보호 로직 추가
router.beforeEach((to, from, next) => {
  const storedRole = localStorage.getItem('role');

  // 로그인 및 회원가입 페이지가 아닌 경우에 로그인 페이지로 리다이렉트
  if (!storedRole && to.path !== '/login' && to.path !== '/signup') {
    return next('/login');
  }

  // 각 경로에 대한 역할 확인
  if (to.path.startsWith('/admin') && storedRole !== 'ADMIN') {
    return next('/login');
  }

  if (to.path.startsWith('/guardian') && storedRole !== 'GUARDIAN') {
    return next('/login');
  }

  if (to.path.startsWith('/normal') && storedRole !== 'NORMAL') {
    return next('/login');
  }

  next(); // 조건을 통과하면 다음으로 진행
});

export default router;
