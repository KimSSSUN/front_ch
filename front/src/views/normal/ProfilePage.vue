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
import axios from 'axios'; // Axios 추가

export default {
  data() {
    return {
      userInfo: {
        name: '',
        location: '',
        profileImage: '', // 프로필 이미지 경로
      },
      rentalHistory: [],
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
      this.showLogoutMessage = true;

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        this.showLogoutMessage = false;
        this.$router.push('/login');
      }, 2000);
    },
    // 백엔드에서 사용자 정보 가져오기
    fetchUserInfo() {
      const token = localStorage.getItem('token'); // JWT 토큰 가져오기
      if (!token) {
        alert('로그인 후 접근해주세요.');
        this.$router.push('/login'); // 로그인 페이지로 이동
        return;
      }

      axios
        .get('http://localhost:8081/user/current', {
          headers: {
            Authorization: `Bearer ${token}` // JWT 토큰을 헤더에 포함
          }
        })
        .then((response) => {
          this.userInfo = response.data; // 서버로부터 받은 사용자 정보 저장
          if (response.data.rentalHistory) {
            this.rentalHistory = response.data.rentalHistory; // 대여 이력 저장
          }
        })
        .catch((error) => {
          console.error('사용자 정보를 가져오는 중 오류 발생', error);
          alert('사용자 정보를 가져오지 못했습니다.');
        });
    }
  },
  mounted() {
    this.fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보를 가져옴
  }
};
</script>

<style scoped>
/* 스타일 그대로 유지 */
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
