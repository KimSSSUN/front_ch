<template>
  <div class="profile-page container">
    <!-- 뒤로가기 버튼 -->
    <div class="d-flex align-items-center mb-4 back-container">
      <i class="bi bi-arrow-left back-button" @click="goBack"></i>
      <span class="ml-2 back-text">뒤로</span>
    </div>

    <!-- 프로필 카드 -->
    <div class="card profile-card shadow-sm p-4 text-center mb-5">
      <img :src="userInfo.profileImage" alt="Profile Image" class="profile-img mb-3" />
      <h5 class="mb-1">{{ userInfo.name }}</h5>
      <small class="text-muted">{{ userInfo.location }}</small>
      <button class="btn btn-outline-dark btn-sm mt-3" @click="editProfile">정보 수정</button>
    </div>

    <!-- 대여 이력 섹션 -->
    <div class="card rental-history-card shadow-sm p-3">
      <h6 class="mb-3">대여 이력</h6>
      <ul class="list-group">
        <li class="list-group-item" v-for="(rental, index) in rentalHistory" :key="index">
          {{ rental.date }} 휠체어 대여 ({{ rental.type }})
        </li>
      </ul>
    </div>

    <!-- 로그아웃 버튼 -->
    <button class="btn btn-danger w-100 mt-4" @click="logout">로그아웃</button>

    <!-- 로그아웃 메시지 -->
    <p v-if="showLogoutMessage" class="text-success mt-3">{{ logoutMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '',
        location: '',
        profileImage: '', // 프로필 이미지 경로
      },
      rentalHistory: [
        { date: '2023-08-17', type: '성인용' },
        { date: '2023-07-20', type: '유아용' },
      ],
      logoutMessage: '로그아웃되었습니다!',
      showLogoutMessage: false, // 메시지 표시 여부
    };
  },
  methods: {
    goBack() {
      this.$router.push('/normal'); // 뒤로가기, 메인 페이지로 이동
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
  },
  mounted() {
    // localStorage에서 유저 정보 불러오기
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      this.userInfo = JSON.parse(userData);

      // 프로필 이미지가 없을 경우 기본 이미지 설정
      if (!this.userInfo.profileImage) {
        this.userInfo.profileImage = require('@/assets/profile.jpg'); // 기본 프로필 이미지
      }
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

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
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
