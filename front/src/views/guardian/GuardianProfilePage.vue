<template>
  <div class="profile-page container">
    <!-- 뒤로가기 버튼 -->
    <div class="d-flex align-items-center mb-4 back-container">
      <i class="bi bi-arrow-left back-button" @click="goBack"></i>
      <span class="ml-2 back-text">뒤로</span>
    </div>

    <!-- 보호자 프로필 제목 -->
    <h4 class="text-center mb-4">보호자 프로필</h4>

    <!-- 프로필 카드 -->
    <div v-if="user" class="card profile-card shadow-sm p-4 text-center mb-5">
      <h5 class="mb-1">{{ user.username }}</h5>
      <small class="text-muted">{{ user.phoneNumber }}</small>

      <!-- 자식 사용자 정보 추가 -->
      <hr />
      <h6 class="mt-3">자식 사용자 정보</h6>
      <p><strong>이름:</strong> {{ user.childUsername }}</p>
      <p><strong>전화번호:</strong> {{ user.childPhoneNumber }}</p>
      <p><strong>대여 날짜:</strong> {{ user.rentalDate }}</p>
      <p><strong>반납 날짜:</strong> {{ user.returnDate }}</p>
    </div>
    <div v-else>
      <p>사용자 정보를 불러오는 중입니다...</p>
    </div>

    <!-- 로그아웃 버튼 -->
    <button class="btn btn-danger w-100 mt-4" @click="logout">로그아웃</button>

    <!-- 로그아웃 메시지 -->
    <p v-if="showLogoutMessage" class="text-success mt-3">{{ logoutMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'guardianProfilePage',
  data() {
    return {
      user: null, // 사용자 정보
      logoutMessage: '로그아웃되었습니다!',
      showLogoutMessage: false,
    };
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    async fetchCurrentUser() {
      try {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰 가져오기
        const response = await axios.get('http://localhost:8080/user/guardian/current', { // API 경로 수정
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data; // 사용자 정보 저장
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
      }
    },
    goBack() {
      this.$router.push('/guardian/map'); // 보호자 모드 메인 페이지로 이동
    },
    logout() {
      // 로그아웃 메시지를 표시하도록 설정
      this.showLogoutMessage = true;

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        this.showLogoutMessage = false; // 메시지 숨김
        this.$router.push('/login'); // 로그인 페이지로 이동
      }, 2000);
    }
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.back-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #007bff;
  font-size: 1rem;
}

.back-button {
  font-size: 1.5rem;
}

.back-text {
  margin-left: 10px;
}

.profile-card {
  background-color: #f8f9fa;
  border-radius: 15px;
}

.text-success {
  color: green;
  font-weight: bold;
}
</style>
