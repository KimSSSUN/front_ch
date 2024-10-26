<template>
  <div class="profile-page container">
    <!-- 뒤로가기 버튼 -->
    <div class="d-flex align-items-center mb-4 back-container">
      <i class="bi bi-arrow-left back-button" @click="goBack"></i>
      <span class="ml-2 back-text">뒤로</span>
    </div>

    <!-- 프로필 카드 -->
    <div v-if="user" class="card profile-card shadow-sm p-4 text-center mb-5">
      <h5 class="mb-1">{{ user.username }}</h5>
      <small class="text-muted">{{ user.phoneNumber }}</small>
    </div>
    <div v-else>
      <p>사용자 정보를 불러오는 중입니다...</p>
    </div>

    <!-- 대여 이력 섹션 -->
    <div class="card rental-history-card shadow-sm p-3">
      <h6 class="mb-3">대여 이력</h6>
      <ul class="list-group">
        <li class="list-group-item" v-for="(rental, index) in rentals" :key="index">
          {{ rental.rentalDate }} ~ {{ rental.returnDate }} ({{ rental.status }})
        </li>
      </ul>
      <div v-if="rentals.length === 0">
        <p>대여 기록이 없습니다.</p>
      </div>
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
  name: 'profilePage',
  data() {
    return {
      user: null, // 사용자 정보
      rentals: [], // 대여 기록
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
        const response = await axios.get('http://localhost:8080/user/current', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data; // 사용자 정보 저장
        this.rentals = response.data.rentals; // 대여 기록 저장
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
      }
    },
    goBack() {
      this.$router.push('/normal'); // 메인 페이지로 이동
    },
    editProfile() {
      alert('프로필 수정 기능은 아직 준비 중입니다!');
    },
    logout() {
      // 로그아웃 메시지를 표시하도록 설정
      this.showLogoutMessage = true;

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        this.showLogoutMessage = false;  // 메시지 숨김
        this.$router.push('/login');     // 로그인 페이지로 이동
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

.rental-history-card {
  border-radius: 15px;
}

.list-group-item {
  font-size: 0.95rem;
}

.text-success {
  color: green;
  font-weight: bold;
}
</style>
